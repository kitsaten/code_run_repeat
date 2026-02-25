"use client";

import { useTranslations, useLocale } from "next-intl";

interface Trait {
    icon: string;
    label: string;
}

export function AboutSection() {
    const t = useTranslations("about");
    const locale = useLocale();
    const traits = t.raw("traits") as Trait[];

    return (
        <section id="about" className="py-32 border-t border-white/5">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                <div className="relative group">
                    <div className="absolute -inset-2 bg-primary/20 rounded-xl blur-2xl group-hover:bg-primary/30 transition-all"></div>
                    <div className="relative bg-neutral-dark rounded-xl overflow-hidden aspect-[4/5] border border-white/10">
                        <img
                            className="w-full h-full object-cover grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-700"
                            alt="Moody professional portrait of a software engineer runner"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBM-z9tFPjdX9K6Ox_Qqbmjgbf6GnnJYmIifC_V1Rfo5_gCWiyT7a0C6QPlBz-1PagEwpXpclTBNOZ-zDKkzHcJeKstByzfz3BjU5GnOnzfxjwW_E55sYHhhItLQMg5tH_Q9hzP9_tzIhB6NDvQEkFovWRHyGvCj-w2bxhqOaTochLYeZRl8mlBiIWOnBOFiWznFMIWalUF66dqXbgZbhpunGXondt7WUl_8beJR6KscpobkVcUMPsK7H1KrUsZDWMU_4LfDcHVcog"
                        />
                    </div>
                </div>

                <div className="space-y-8">
                    <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
                        {t.rich("headline", {
                            span: (chunks) => <span className="text-primary">{chunks}</span>
                        })}
                        <span className="text-[10px] font-mono text-slate-600 ml-2 uppercase">{"//"} {locale === "vi" ? "VN" : locale.toUpperCase()}</span>
                    </h2>

                    <p className="text-lg text-slate-400 leading-relaxed">
                        {t("body")}
                    </p>

                    <ul className="space-y-4">
                        {traits.map((trait, idx) => (
                            <li key={idx} className="flex items-center gap-4 group">
                                <span className="material-symbols-outlined text-primary group-hover:scale-110 transition-transform">
                                    {trait.icon}
                                </span>
                                <span className="text-slate-200 font-medium">{trait.label}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
}
