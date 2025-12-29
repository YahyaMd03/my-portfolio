// Simple in-memory rate limiter
// For production, consider using Redis or a database
const submissions = new Map<string, number[]>();

interface RateLimitOptions {
  maxRequests?: number;
  windowMs?: number;
}

export function checkRateLimit(
  identifier: string,
  options: RateLimitOptions = {}
): boolean {
  const { maxRequests = 5, windowMs = 60000 } = options; // Default: 5 requests per minute
  const now = Date.now();
  const windowStart = now - windowMs;

  const userSubmissions = submissions.get(identifier) || [];
  const recentSubmissions = userSubmissions.filter((time) => time > windowStart);

  if (recentSubmissions.length >= maxRequests) {
    return false; // Rate limit exceeded
  }

  recentSubmissions.push(now);
  submissions.set(identifier, recentSubmissions);

  // Clean up old entries periodically (every 100 requests)
  if (submissions.size > 1000) {
    const cutoff = now - windowMs * 2;
    for (const [key, times] of submissions.entries()) {
      const filtered = times.filter((time) => time > cutoff);
      if (filtered.length === 0) {
        submissions.delete(key);
      } else {
        submissions.set(key, filtered);
      }
    }
  }

  return true; // Allowed
}

