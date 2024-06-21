import { NextResponse } from "next/server";
import { auth } from "./auth";
import { PROTECTED_SUB_ROUTES, PUBLIC_ROUTES } from "./utils/routes";

export async function middleware(request) {
    console.log("current path is:", request.nextUrl.pathname);
    const session = await auth();

    const isAuthenticated = !!session?.user;
    const isPublicRoute = (PUBLIC_ROUTES.find((route) => request.nextUrl.pathname.startsWith(route)) && !PROTECTED_SUB_ROUTES.find(route => request.nextUrl.pathname.includes(route)))
    console.log("isAuthenticated: ", isAuthenticated, "isPublicRoute: ", isPublicRoute);
    if (!isPublicRoute && !isAuthenticated) {
        return NextResponse.redirect(new URL('/auth/signin', request.nextUrl))
    }
}

export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"]
}