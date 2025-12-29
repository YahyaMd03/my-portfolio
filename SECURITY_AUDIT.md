# Security Audit Report

## Critical Vulnerabilities

### 1. **Weak XSS Protection** (High Priority)

**Location:** `app/actions/submitContact.ts:61-66`

**Issue:** The XSS pattern matching is too simplistic and can be easily bypassed:

```typescript
const dangerousPatterns =
  /<script|javascript:|onerror=|onload=|onclick=|onmouseover=/i;
```

**Problems:**

- Can be bypassed with encoding: `%3Cscript`, `&#60;script`, `\x3Cscript`
- Doesn't catch event handlers like `onerror`, `onload` when separated by whitespace
- Missing many other XSS vectors (data URIs, vbscript:, etc.)
- The sanitization only removes `<` and `>`, which is insufficient

**Recommendation:** Use a proper HTML sanitization library like `DOMPurify` or `sanitize-html`, or at minimum properly escape HTML entities.

---

### 2. **Insufficient Input Sanitization** (High Priority)

**Location:** `app/actions/submitContact.ts:72-78`

**Issue:** The `sanitizeString` function only removes angle brackets:

```typescript
function sanitizeString(input: string): string {
  if (!input) return "";
  return input
    .trim()
    .replace(/[<>]/g, "") // Remove angle brackets
    .slice(0, 10000); // Hard limit
}
```

**Problems:**

- Doesn't escape HTML entities (`&`, `"`, `'`)
- Doesn't handle JavaScript event handlers
- Doesn't prevent other injection vectors
- Data is sent to Google Apps Script which may render it unsafely

**Recommendation:** Implement proper HTML entity escaping or use a sanitization library.

---

### 3. **IP Spoofing Vulnerability** (Medium Priority)

**Location:** `app/actions/submitContact.ts:84-89`

**Issue:** Trusting `x-forwarded-for` header without validation:

```typescript
const forwardedFor = headersList.get("x-forwarded-for");
const realIp = headersList.get("x-real-ip");
const identifier =
  forwardedFor?.split(",")[0] || realIp || userAgent.slice(0, 50);
```

**Problems:**

- `x-forwarded-for` can be easily spoofed by attackers
- No validation of IP format
- Rate limiting can be bypassed by changing headers
- User-agent fallback is weak (many users share same user-agent)

**Recommendation:**

- Validate IP addresses
- Use a combination of IP + user-agent + session token
- Consider using Next.js middleware to extract real IP
- For production, use Redis-based rate limiting with proper IP extraction

---

### 4. **In-Memory Rate Limiting** (Medium Priority)

**Location:** `lib/rateLimit.ts`

**Issue:** Rate limiting is stored in memory:

```typescript
const submissions = new Map<string, number[]>();
```

**Problems:**

- Lost on server restart
- Doesn't work across multiple server instances (horizontal scaling)
- Memory can grow unbounded (though cleanup exists)
- Can be bypassed by restarting server

**Recommendation:** Use Redis or a database-backed rate limiter for production.

---

### 5. **CSP with unsafe-inline and unsafe-eval** (Medium Priority)

**Location:** `proxy.ts:23`

**Issue:** Content Security Policy allows unsafe-inline and unsafe-eval:

```typescript
"script-src 'self' 'unsafe-eval' 'unsafe-inline' ...";
```

**Problems:**

- Significantly reduces XSS protection effectiveness
- Allows inline scripts which can be exploited
- `unsafe-eval` allows `eval()` and similar functions

**Recommendation:**

- Use nonces or hashes for inline scripts
- Remove `unsafe-eval` if not needed
- Consider if Clerk/Cal.com truly require these (they might have alternatives)

---

### 6. **Missing Environment Variable Validation** (Low Priority)

**Location:** `app/layout.tsx:96`

**Issue:** Clerk publishable key might be undefined:

```typescript
<ClerkProvider
  publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
>
```

**Problems:**

- If undefined, Clerk might fail silently or cause runtime errors
- No validation at startup

**Recommendation:** Add validation and fail fast if required env vars are missing.

---

### 7. **Email Exposed in Client-Side Code** (Low Priority)

**Location:** `app/components/Contact.tsx:39`

**Issue:** Email address is hardcoded in client-side component:

```typescript
value: "yahyamd97@gmail.com",
```

**Problems:**

- Can be scraped by bots
- May receive spam
- No protection against email harvesting

**Recommendation:** Consider using a contact form only or obfuscating the email (though this is minor).

---

## Positive Security Practices Found

✅ **Server Actions** - Using Next.js server actions provides built-in CSRF protection
✅ **Rate Limiting** - Basic rate limiting is implemented
✅ **Input Validation** - Length and format validation exists
✅ **Honeypot Field** - Bot protection with honeypot field
✅ **Timeout Protection** - Fetch requests have timeout protection
✅ **Error Handling** - Errors are handled without exposing sensitive info
✅ **Environment Variables** - Sensitive URLs stored in env vars
✅ **CSP Headers** - Content Security Policy is configured
✅ **Route Protection** - Clerk middleware protects `/universe` route

---

## Recommendations Summary

### Immediate Actions (High Priority)

1. Replace weak XSS pattern matching with proper HTML sanitization library
2. Implement proper HTML entity escaping in sanitization function
3. Validate and sanitize IP addresses from headers

### Short-term (Medium Priority)

4. Migrate rate limiting to Redis or database
5. Tighten CSP by removing unsafe-inline/unsafe-eval if possible
6. Add environment variable validation at startup

### Long-term (Low Priority)

7. Consider email obfuscation or contact form only
8. Implement request signing for additional security
9. Add security headers (X-Frame-Options, X-Content-Type-Options, etc.)
10. Consider implementing reCAPTCHA for additional bot protection

---

## Additional Security Headers to Consider

Add these headers in `proxy.ts`:

- `X-Frame-Options: DENY` (already covered by CSP frame-ancestors)
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: geolocation=(), microphone=(), camera=()`
