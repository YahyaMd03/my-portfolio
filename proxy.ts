import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Define protected routes
const isProtectedRoute = createRouteMatcher(["/universe(.*)"]);

export default clerkMiddleware(async (auth, req: NextRequest) => {
  // Protect the /universe route
  if (isProtectedRoute(req)) {
    await auth.protect();
  }

  // Create response and set Content Security Policy headers for Clerk and Cal.com
  const response = NextResponse.next();

  // Set Content Security Policy headers
  // Note: CSP doesn't support wildcards in the middle (*.domain.com)
  // For Clerk subdomains, we need a workaround. In development, we'll be more permissive.
  // In production, you should list specific Clerk subdomains.
  const isDevelopment = process.env.NODE_ENV === 'development';
  
  // For development, allow all HTTPS sources for Clerk to handle dynamic subdomains
  // For production, you should specify exact Clerk subdomains
  const clerkScriptSrc = isDevelopment
    ? "https://clerk.accounts.dev https://clerk.com https://clerk.dev https:"
    : "https://clerk.accounts.dev https://clerk.com https://clerk.dev";
  
  const clerkConnectSrc = isDevelopment
    ? "https://clerk.accounts.dev https://clerk.com https://clerk.dev wss://clerk.accounts.dev https: wss:"
    : "https://clerk.accounts.dev https://clerk.com https://clerk.dev wss://clerk.accounts.dev";
  
  const cspHeader = [
    "default-src 'self'",
    `script-src 'self' 'unsafe-eval' 'unsafe-inline' ${clerkScriptSrc} https://app.cal.com https://cal.com`,
    `style-src 'self' 'unsafe-inline' https://clerk.accounts.dev https://clerk.com https://app.cal.com https://cal.com`,
    "img-src 'self' data: https: blob:",
    "font-src 'self' data:",
    `connect-src 'self' ${clerkConnectSrc} https://app.cal.com https://cal.com`,
    "frame-src 'self' https://clerk.accounts.dev https://clerk.com https://app.cal.com https://cal.com",
    "worker-src 'self' blob:",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
  ].join("; ");

  response.headers.set("Content-Security-Policy", cspHeader);

  return response;
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};

