import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "./app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export async function proxy(request: NextRequest) {
  const session = await getServerSession(authOptions);
  const token = session?.githubAccessToken;

  if (request.nextUrl.pathname.startsWith("/api/auth")) {
    return NextResponse.next();
  }

  const isProtectedRoute =
    request.nextUrl.pathname.startsWith("/dashboard") ||
    request.nextUrl.pathname.startsWith("/api");

  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL("/api/auth/signin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/api/:path*"],
};
