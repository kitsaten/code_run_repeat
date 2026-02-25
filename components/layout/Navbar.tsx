"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";

export function Navbar() {
    const t = useTranslations("nav");
    const locale = useLocale();

    const navLinks = [
        { key: "journey", href: `/${locale}#about` },
        { key: "logs", href: `/${locale}#blog` },
        { key: "stats", href: `/${locale}#stats` },
        { key: "community", href: `/${locale}#newsletter` },
    ] as const;

    return (
        <header className="fixed top-0 w-full z-50 border-b border-white/5 bg-background/80 backdrop-blur-md">
            <nav className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between" aria-label="Main navigation">
                {/* Logo */}
                <Link
                    href={`/${locale}`}
                    className="flex items-center gap-2"
                    aria-label="Code Run Repeat home"
                >
                    <span className="text-primary font-black text-xl tracking-tighter uppercase">
                        CODE. RUN. REPEAT.
                    </span>
                </Link>

                {/* Nav Links */}
                <ul className="hidden md:flex items-center gap-10" role="list">
                    {navLinks.map(({ key, href }) => (
                        <li key={key}>
                            <Link
                                href={href}
                                className="text-sm font-medium tracking-wide uppercase text-slate-400 hover:text-primary transition-colors"
                            >
                                {t(key)}
                            </Link>
                        </li>
                    ))}
                </ul>

                {/* Right Actions */}
                <div className="flex items-center">
                    <LanguageSwitcher />
                    <Link
                        href={`/${locale}#newsletter`}
                        className="hidden sm:block ml-6 bg-primary text-background px-5 py-2 rounded-lg font-bold text-sm hover:opacity-90 transition-opacity uppercase"
                    >
                        {t("connect")}
                    </Link>
                </div>
            </nav>
        </header>
    );
}
