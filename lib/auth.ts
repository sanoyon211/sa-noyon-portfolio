import { cookies } from 'next/headers';

/**
 * Validates whether the incoming request is authenticated as admin.
 * Supports both Authorization Header (Bearer token) and HTTP-Only Cookie (admin_session).
 */
export async function isAuthenticatedAdmin(req?: Request): Promise<boolean> {
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) {
    return false;
  }

  // 1. Check Authorization Bearer header
  if (req) {
    const authHeader = req.headers.get('authorization');
    if (authHeader && authHeader === `Bearer ${adminPassword}`) {
      return true;
    }
  }

  // 2. Check HTTP-Only Cookie
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('admin_session');
    if (sessionCookie && sessionCookie.value === adminPassword) {
      return true;
    }
  } catch {
    // In contexts where cookies() is unavailable, fallback to header checking
  }

  return false;
}
