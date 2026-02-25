"use client";

import { useTranslations } from "next-intl";

export function Footer() {
    const t = useTranslations("footer");

    return (
        <footer className="py-20 border-t border-white/5 bg-background">
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-10">
                <div className="flex flex-col items-center md:items-start gap-4">
                    <span className="text-primary font-black text-lg tracking-tighter uppercase font-sans">
                        CODE. RUN. REPEAT.
                    </span>
                    <p className="text-slate-500 text-[10px] tracking-widest uppercase">
                        {t("copyright")}
                    </p>
                </div>

                <div className="flex gap-8">
                    <a className="text-slate-400 hover:text-primary flex items-center gap-2 text-sm font-bold tracking-widest uppercase transition-colors" href="#">
                        <span className="material-symbols-outlined text-lg">code</span> {t("github")}
                    </a>
                    <a className="text-slate-400 hover:text-primary flex items-center gap-2 text-sm font-bold tracking-widest uppercase transition-colors" href="#">
                        <span className="material-symbols-outlined text-lg">timeline</span> {t("strava")}
                    </a>
                    <a className="text-slate-400 hover:text-primary flex items-center gap-2 text-sm font-bold tracking-widest uppercase transition-colors" href="#">
                        <span className="material-symbols-outlined text-lg">link</span> {t("linkedin")}
                    </a>
                </div>
            </div>
        </footer>
    );
}
