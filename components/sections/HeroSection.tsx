"use client";

import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";

export function HeroSection() {
    const t = useTranslations("hero");
    const locale = useLocale();

    return (
        <section
            id="hero"
            className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden motion-bg hero-lines"
            aria-labelledby="hero-title"
        >
            <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
                <h1
                    id="hero-title"
                    className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tight mb-6 text-white leading-none uppercase"
                >
                    CODE. RUN.<br />
                    <span className="text-primary italic">REPEAT.</span>
                    <span className="text-[20px] align-top text-white/20 font-mono font-normal ml-2 uppercase">
                        [{locale === "vi" ? "VN" : locale.toUpperCase()}]
                    </span>
                </h1>

                <p className="text-xl md:text-2xl text-slate-400 font-light mb-12 max-w-2xl mx-auto">
                    {t("subtitle")}
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link
                        href={`/${locale}#stats`}
                        className="w-full sm:w-auto px-8 py-4 bg-primary text-background font-black rounded-lg text-lg hover:scale-[1.02] transition-transform uppercase inline-block text-center"
                    >
                        {t("cta_primary")}
                    </Link>
                    <Link
                        href={`/${locale}#blog`}
                        className="w-full sm:w-auto px-8 py-4 border border-white/20 text-white font-bold rounded-lg text-lg hover:bg-white/5 transition-colors uppercase inline-block text-center"
                    >
                        {t("cta_secondary")}
                    </Link>
                </div>
            </div>
        </section>
    );
}
