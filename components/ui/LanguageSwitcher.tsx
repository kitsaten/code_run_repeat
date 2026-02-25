"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { locales, Locale } from "@/i18n/request";
import { cn } from "@/lib/utils";
import { useState } from "react";

const localeLabels: Record<Locale, string> = {
    en: "EN",
    vi: "VN",
    ja: "JP",
};

export function LanguageSwitcher() {
    const locale = useLocale() as Locale;
    const router = useRouter();
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    const handleChange = (newLocale: Locale) => {
        const segments = pathname.split("/");
        segments[1] = newLocale;
        router.push(segments.join("/") || "/");
        setIsOpen(false);
    };

    return (
        <div className="relative group sm:inline-flex items-center" onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>
            <button className="flex items-center gap-2 text-slate-400 hover:text-primary transition-colors text-xs font-bold tracking-widest uppercase">
                <span className="material-symbols-outlined text-lg">language</span>
                <span>{localeLabels[locale]}</span>
                <span className={cn("material-symbols-outlined text-xs transition-transform", isOpen && "rotate-180")}>expand_more</span>
            </button>

            <div className={cn(
                "absolute right-0 mt-2 w-24 bg-neutral-dark border border-white/10 rounded-lg shadow-2xl transition-all z-50 overflow-hidden",
                isOpen ? "opacity-100 visible top-full" : "opacity-0 invisible top-[110%]"
            )}>
                {locales.map((loc) => (
                    <button
                        key={loc}
                        onClick={() => handleChange(loc)}
                        className={cn(
                            "w-full text-left block px-4 py-3 text-[10px] font-bold tracking-widest transition-colors",
                            locale === loc
                                ? "text-primary bg-white/5 border-l-2 border-primary"
                                : "text-slate-400 hover:text-white hover:bg-white/5"
                        )}
                    >
                        {localeLabels[loc]}
                    </button>
                ))}
            </div>
        </div>
    );
}
