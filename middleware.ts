import createMiddleware from "next-intl/middleware";
import { locales, defaultLocale } from "./i18n/request";
import { NextRequest } from "next/server";

const intlMiddleware = createMiddleware({
    locales,
    defaultLocale,
    localePrefix: "always",
});

export default function middleware(request: NextRequest) {
    // console.log("Middleware hitting path:", request.nextUrl.pathname);
    return intlMiddleware(request);
}

export const config = {
    // Match only internationalized pathnames
    matcher: ["/", "/(vi|en|ja)/:path*", "/((?!api|_next|_vercel|.*\\..*).*)"],
};
