"use server";

import { headers } from "next/headers";
import { checkRateLimit } from "@/lib/rateLimit";

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  website?: string; // Honeypot field
}

// Validation function
function validateContactForm(
  data: ContactFormData
): { valid: boolean; error?: string } {
  // Check honeypot field (if filled, it's likely a bot)
  if (data.website && data.website.trim().length > 0) {
    // Return fake success to avoid bot detection
    return { valid: false, error: "" };
  }

  // Length limits
  if (!data.name || data.name.length < 2 || data.name.length > 100) {
    return {
      valid: false,
      error: "Name must be between 2 and 100 characters",
    };
  }

  if (!data.subject || data.subject.length < 3 || data.subject.length > 200) {
    return {
      valid: false,
      error: "Subject must be between 3 and 200 characters",
    };
  }

  if (
    !data.message ||
    data.message.length < 10 ||
    data.message.length > 5000
  ) {
    return {
      valid: false,
      error: "Message must be between 10 and 5000 characters",
    };
  }

  // Email validation (server-side)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (
    !data.email ||
    !emailRegex.test(data.email) ||
    data.email.length > 254
  ) {
    return { valid: false, error: "Invalid email address" };
  }

  // Basic XSS prevention - check for dangerous patterns
  const dangerousPatterns =
    /<script|javascript:|onerror=|onload=|onclick=|onmouseover=/i;
  const allFields = `${data.name}${data.subject}${data.message}`;
  if (dangerousPatterns.test(allFields)) {
    return { valid: false, error: "Invalid characters detected" };
  }

  return { valid: true };
}

// Sanitization function
function sanitizeString(input: string): string {
  if (!input) return "";
  return input
    .trim()
    .replace(/[<>]/g, "") // Remove angle brackets
    .slice(0, 10000); // Hard limit
}

export async function submitContactForm(formData: ContactFormData) {
  try {
    // Rate limiting
    const headersList = await headers();
    const forwardedFor = headersList.get("x-forwarded-for");
    const realIp = headersList.get("x-real-ip");
    const userAgent = headersList.get("user-agent") || "";
    
    // Create identifier from IP or use user-agent as fallback
    const identifier = forwardedFor?.split(",")[0] || realIp || userAgent.slice(0, 50);

    if (!checkRateLimit(identifier, { maxRequests: 5, windowMs: 60000 })) {
      return {
        success: false,
        error: "Too many requests. Please try again later.",
      };
    }

    // Validate input
    const validation = validateContactForm(formData);
    if (!validation.valid) {
      // If honeypot was triggered, return fake success
      if (!validation.error) {
        return {
          success: true,
          message: "Thank you! Your message has been sent successfully.",
        };
      }
      return {
        success: false,
        error: validation.error || "Invalid form data",
      };
    }

    // Sanitize inputs
    const sanitizedData = {
      name: sanitizeString(formData.name),
      email: sanitizeString(formData.email).toLowerCase().trim(),
      subject: sanitizeString(formData.subject),
      message: sanitizeString(formData.message),
    };

    // Get Google Apps Script web app URL from environment variables
    const webAppUrl = process.env.GOOGLE_APPS_SCRIPT_WEB_APP_URL;

    if (!webAppUrl) {
      console.error("Missing Google Apps Script web app URL");
      return {
        success: false,
        error: "Server configuration error. Please contact support.",
      };
    }

    // Add timeout to fetch (10 seconds)
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    try {
      // Send data to Google Apps Script web app
      const response = await fetch(webAppUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: sanitizedData.name,
          email: sanitizedData.email,
          subject: sanitizedData.subject,
          message: sanitizedData.message,
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (result.success) {
        return {
          success: true,
          message: "Thank you! Your message has been sent successfully.",
        };
      } else {
        throw new Error(result.error || "Unknown error");
      }
    } catch (fetchError: unknown) {
      clearTimeout(timeoutId);
      
      // Handle timeout specifically
      if (
        fetchError instanceof Error &&
        fetchError.name === "AbortError"
      ) {
        return {
          success: false,
          error: "Request timed out. Please try again.",
        };
      }
      throw fetchError;
    }
  } catch (error) {
    // Don't log full error details - could contain sensitive info
    console.error("Form submission error");
    
    return {
      success: false,
      error: "Failed to send message. Please try again later.",
    };
  }
}

