import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const authCookie = req.cookies.get("firebaseAuthToken");

  // Se tentar acessar /home sem estar logado → volta para /
  if (req.nextUrl.pathname.startsWith("/home") && !authCookie) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/home/:path*"],
};
