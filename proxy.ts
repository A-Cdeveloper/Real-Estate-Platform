import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Route protection middleware
 *
 * How it works:
 * 1. Middleware executes BEFORE the request is processed
 * 2. Checks session from cookie
 * 3. If route is in (backend) group - requires authentication
 * 4. If route is /login - checks if user is already logged in
 */

export function proxy(request: NextRequest) {
  // 1. Get request pathname (e.g., "/dashboard", "/login", "/contact")
  const pathname = request.nextUrl.pathname;

  // 2. Check if session cookie exists
  const sessionCookie = request.cookies.get("session");

  // 3. Try to parse session (if exists)
  let session = null;
  if (sessionCookie?.value) {
    try {
      session = JSON.parse(sessionCookie.value);
    } catch {
      // If cookie is invalid, ignore it
      session = null;
    }
  }

  // 4. Check if route is in (backend) group
  // Route groups don't appear in URL, so we check the pathname
  const protectedBackendRoutes = [
    "/dashboard",
    "/settings",
    "/users",
    "/proprietes-area",
  ];
  const isBackendRoute = protectedBackendRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  // 5. Check if route is in (auth) group
  const isAuthRoute =
    pathname === "/login" ||
    pathname === "/forgot-password" ||
    pathname.startsWith("/reset-password");

  // 6. If backend route and no session → redirect to /login
  if (isBackendRoute && !session) {
    const loginUrl = new URL("/login", request.url);
    // Add returnTo parameter to know where to redirect user after login
    loginUrl.searchParams.set("returnTo", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // 7. If auth route and has session → redirect to /dashboard
  // (User is already logged in, no need to access auth pages)
  if (isAuthRoute && session) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // 8. If all checks pass → allow access
  return NextResponse.next();
}

/**
 * Matcher configuration
 *
 * Middleware will execute ONLY for routes that match this pattern
 *
 * Pattern explanation:
 * - `/dashboard/:path*` - all routes starting with /dashboard
 * - `/login` - exactly /login route
 * - `/forgot-password` - exactly /forgot-password route
 * - `/reset-password/:path*` - all routes starting with /reset-password
 *
 * This means middleware will NOT run for:
 * - / (home page)
 * - /contact
 * - /about
 * - etc. (all (frontend) routes)
 */
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/settings/:path*",
    "/users/:path*",
    "/proprietes-area/:path*",
    "/login",
    "/forgot-password",
    "/reset-password/:path*",
  ],
};
