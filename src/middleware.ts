// middleware.ts — Edge-runtime auth guard for /admin routes
//
// WHY middleware.ts (not proxy.ts):
//   Next.js 16 renamed "middleware" → "proxy" for the Node.js runtime.
//   BUT proxy.ts does NOT support the Edge runtime.
//   Clerk's clerkMiddleware() runs on the Edge runtime, so we MUST keep
//   the filename as middleware.ts here. middleware.ts still works in Next.js 16
//   for Edge-compatible code — it is "deprecated" but fully functional.
//
// WHAT this does:
//   - Protects ALL routes under /admin (unauthenticated → redirect to /admin/login)
//   - Leaves every other route (/, /menu, /ambiance, etc.) completely public
//
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Match only the /admin area (including /admin/login itself — Clerk handles
// the sign-in redirect internally via NEXT_PUBLIC_CLERK_SIGN_IN_URL)
const isAdminRoute = createRouteMatcher(["/admin(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  if (isAdminRoute(req)) {
    // If the user is not signed in, redirect them to /admin/login
    const { userId } = await auth();
    if (!userId) {
      const loginUrl = new URL("/admin/login", req.url);
      return NextResponse.redirect(loginUrl);
    }
  }
  // All public routes — do nothing, pass through
});

export const config = {
  matcher: [
    // Run on /admin routes
    "/admin(.*)",
    // Required boilerplate: skip Next.js internals and static files
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
