import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import type { Metadata } from "next";
import { locales, type Locale } from "@/i18n/request";

interface LocaleLayoutProps {
    children: React.ReactNode;
    params: { locale: string };
}

export async function generateStaticParams() {
    return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
    params: { locale },
}: LocaleLayoutProps): Promise<Metadata> {
    if (!locales.includes(locale as Locale)) notFound();
    const messages = await getMessages({ locale });
    const meta = messages.meta as { title: string; description: string };

    return {
        title: {
            default: meta.title,
            template: `%s | Code. Run. Repeat.`,
        },
        description: meta.description,
        openGraph: {
            title: meta.title,
            description: meta.description,
            locale:
                locale === "vi" ? "vi_VN" : locale === "ja" ? "ja_JP" : "en_US",
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            title: meta.title,
            description: meta.description,
        },
    };
}

export default async function LocaleLayout({
    children,
    params: { locale },
}: LocaleLayoutProps) {
    if (!locales.includes(locale as Locale)) notFound();
    const messages = await getMessages({ locale });

    // No <html>/<body> here — root layout owns those.
    return (
        <NextIntlClientProvider locale={locale} messages={messages}>
            <div className="relative flex min-h-screen flex-col">
                {children}
            </div>
        </NextIntlClientProvider>
    );
}
