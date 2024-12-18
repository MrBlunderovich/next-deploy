// import type { NextRequest } from "next/server";

// export function middleware(request: NextRequest) {
//   console.log(request.nextUrl.href, ">>>>>>>>>>>>>>>>>>>>>>>request href");
// }

import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { userRole } from "./drizzle/schema";

// export { auth as middleware } from "@/nextauth";

const PUBLIC_ROUTES = ["/auth", "/about"];

export async function middleware(request: NextRequest) {
  const url = request.nextUrl.clone(); // Clone the current URL for redirection logic

  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
    cookieName:
      process.env.NODE_ENV === "development"
        ? "authjs.session-token"
        : "__Secure-authjs.session-token",
  });

  // i18n example: Redirect root to the default locale (e.g., /en)
  /* if (url.pathname === "/") {
    url.pathname = "/en";
    return NextResponse.redirect(url);
  } */

  // Public routes: Always allow access
  if (PUBLIC_ROUTES.some((path) => url.pathname.startsWith(path))) {
    return NextResponse.next();
  }

  // Protected routes: Require authentication
  console.log(token, "--------------------token");
  if (!token) {
    url.searchParams.set("callbackUrl", url.pathname);
    url.pathname = `/auth/login`; // Redirect to login if unauthenticated
    // url.pathname = `/auth/login?callbackUrl=${url.pathname}`; // Redirect to login if unauthenticated
    return NextResponse.redirect(url);
  }

  // Example: Check for user roles or other custom logic
  if (token.role !== userRole.ADMIN && url.pathname.includes("/admin")) {
    url.pathname = "/auth/unauthorized"; // Redirect unauthorized users
    return NextResponse.redirect(url);
  }

  // Other functionality can go here...

  // Default: Allow the request
  return NextResponse.next();
  // return auth(request,ctx);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
