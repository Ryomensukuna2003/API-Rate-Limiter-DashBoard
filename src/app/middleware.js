import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // If no token, redirect to login page
  if (!token) {
    const loginUrl = new URL("/login", req.url);
    return NextResponse.redirect(loginUrl);
  }

  // Allow request if token exists
  return NextResponse.next();
}

// Protect all routes except the API routes and public pages
export const config = {
  matcher: ["/((?!api|_next|login|public).*)"],
};
