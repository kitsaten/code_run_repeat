"use client";

import { useTranslations, useLocale } from "next-intl";

interface TechCard {
    title: string;
    body: string;
}

const icons = ["database", "rebase_edit", "analytics"];

export function TechSection() {
    const t = useTranslations("tech");
    const locale = useLocale();
    const cards = t.raw("cards") as TechCard[];

    return (
        <section id="tech" className="py-32">
            <div className="max-w-7xl mx-auto px-6">
                <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-20 tracking-tight">
                    {t.rich("title", {
                        span: (chunks) => <span className="text-primary">{chunks}</span>
                    })}
                    <span className="text-[10px] font-mono text-slate-600 ml-2 uppercase">{"//"} {locale === "vi" ? "VN" : locale.toUpperCase()}</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {cards.map((card, idx) => (
                        <div key={idx} className="bg-neutral-dark border border-white/5 p-10 rounded-xl hover:border-primary/30 transition-all group">
                            <span className="material-symbols-outlined text-primary text-4xl mb-6 block">
                                {icons[idx]}
                            </span>
                            <h3 className="text-xl font-bold text-white mb-4">{card.title}</h3>
                            <p className="text-slate-400 leading-relaxed">{card.body}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
