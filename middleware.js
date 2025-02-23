import { NextResponse } from "next/server";
import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";

export function middleware(request) {
  // const url = request.nextUrl;

  // // Define valid paths (add more as needed)
  // const validPaths = ['/', '/dashboard', '/auth/login'];

  // // Check if the requested path matches any valid path
  // const isPathValid = validPaths.some(path => url.pathname === path);

  // // Redirect to the home route if the path is not valid
  // if (!isPathValid) {
  //   return NextResponse.redirect(new URL('/', request.url));
  // }

  // // No locale redirection, simply proceed with the request
  // return NextResponse.next();

  const url = request.nextUrl;
  // Check if the URL should be handled by middleware or not
  if (url.pathname.startsWith('/_next') || url.pathname.startsWith('/api')) {
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    // Skip all internal paths (_next, assets, api)
    //"/((?!api|assets|.*\\..*|_next).*)",
    "/((?!api|assets|docs|.*\\..*|_next).*)",
    // Optional: only run on root (/) URL
  ],
};
