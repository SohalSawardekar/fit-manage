import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const protectedPaths = ["/user", "/admin"];

export async function middleware(req) {
  const url = req.nextUrl.clone();
  const token = await getToken({ req, secret: process.env.SECRET });

  const isProtected = protectedPaths.some((path) =>
    url.pathname.startsWith(path)
  );

  // If the user is logged in
  if (token) {
    // Prevent access to "/", "/login", and "/register" for logged-in users
    if (["/", "/login", "/register"].includes(url.pathname)) {
      url.pathname = token.role === "admin" ? "/admin" : "/user/dashboard";
      return NextResponse.redirect(url);
    }

    // Prevent user access to '/admin'
    if (url.pathname.startsWith("/admin") && token.role !== "admin") {
      url.pathname = "/user/dashboard"; // Redirect to user page
      return NextResponse.redirect(url);
    }

    // Prevent admin access to '/user'
    if (url.pathname.startsWith("/user") && token.role !== "user") {
      url.pathname = "/admin"; // Redirect to admin page
      return NextResponse.redirect(url);
    }
  } else if (isProtected) {
    // If not logged in and trying to access a protected route
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  return NextResponse.next(); // Allow access if no conditions are met
}

export const config = {
  matcher: ["/", "/login", "/register", "/user/:path*", "/admin/:path*"], // Match root, login, register, user, and admin paths
};
