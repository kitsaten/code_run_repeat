import { getRequestConfig } from "next-intl/server";

export const locales = ["en", "vi", "ja"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export default getRequestConfig(async ({ locale }) => {
    console.log("i18n configuration loading for locale:", locale);

    // Use default locale if undefined to avoid unwanted 404s during pre-rendering/middleware checks
    const targetLocale = (locales.includes(locale as Locale) ? locale : defaultLocale) as string;

    return {
        locale: targetLocale,
        messages: (await import(`../messages/${targetLocale}.json`)).default,
    };
});
