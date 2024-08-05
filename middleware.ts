import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const url = request.nextUrl.pathname;
  const userCookies = request.cookies.get("user")?.value;

  if (!userCookies?.includes("admin") && url.includes("/admin")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (!userCookies && url.includes("/survey")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}
