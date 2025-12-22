/**
 * Rate limiter entry
 */
interface RateLimitEntry {
  count: number;
  resetTime: number;
}

/**
 * In-memory rate limiter
 * Limits requests per IP address
 */
class RateLimiter {
  private requests: Map<string, RateLimitEntry>;
  private readonly maxRequests: number;
  private readonly windowMs: number;

  constructor(maxRequests: number = 100, windowMs: number = 60000) {
    this.requests = new Map();
    this.maxRequests = maxRequests;
    this.windowMs = windowMs;

    // Clean up old entries every 5 minutes
    setInterval(() => this.cleanup(), 5 * 60 * 1000);
  }

  /**
   * Check if IP is rate limited
   * @param ip IP address to check
   * @returns true if allowed, false if rate limited
   */
  check(ip: string): boolean {
    const now = Date.now();
    const entry = this.requests.get(ip);

    if (!entry) {
      // First request from this IP
      this.requests.set(ip, {
        count: 1,
        resetTime: now + this.windowMs,
      });
      return true;
    }

    // Check if window has expired
    if (now > entry.resetTime) {
      // Reset the window
      this.requests.set(ip, {
        count: 1,
        resetTime: now + this.windowMs,
      });
      return true;
    }

    // Check if limit exceeded
    if (entry.count >= this.maxRequests) {
      return false;
    }

    // Increment count
    entry.count++;
    return true;
  }

  /**
   * Clean up expired entries
   */
  private cleanup(): void {
    const now = Date.now();
    for (const [ip, entry] of this.requests.entries()) {
      if (now > entry.resetTime) {
        this.requests.delete(ip);
      }
    }
  }

  /**
   * Get remaining requests for an IP
   */
  getRemaining(ip: string): number {
    const entry = this.requests.get(ip);
    if (!entry) return this.maxRequests;

    const now = Date.now();
    if (now > entry.resetTime) return this.maxRequests;

    return Math.max(0, this.maxRequests - entry.count);
  }

  /**
   * Get time until reset in milliseconds
   */
  getResetTime(ip: string): number {
    const entry = this.requests.get(ip);
    if (!entry) return 0;

    const now = Date.now();
    return Math.max(0, entry.resetTime - now);
  }
}

// Singleton instance
const rateLimiter = new RateLimiter(100, 60000);

export default rateLimiter;
