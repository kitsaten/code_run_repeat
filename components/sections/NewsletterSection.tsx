"use client";

import { useTranslations, useLocale } from "next-intl";
import { useState } from "react";

export function NewsletterSection() {
    const t = useTranslations("newsletter");
    const locale = useLocale();
    const [email, setEmail] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setIsSubmitting(true);
        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSuccess(true);
            setEmail("");
            // Reset success message after 5 seconds
            setTimeout(() => setIsSuccess(false), 5000);
        }, 1500);
    };

    return (
        <section id="newsletter" className="py-32 px-6">
            <div className="max-w-4xl mx-auto border border-white/10 bg-white/5 backdrop-blur-sm rounded-2xl p-12 md:p-20 text-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 hero-lines"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-primary/10 blur-[100px] rounded-full pointer-events-none"></div>
                <div className="relative z-10">
                    <h2 className="text-white text-4xl md:text-5xl font-black mb-6 leading-tight uppercase">
                        {t("title")}
                        <span className="text-[10px] font-mono text-white/40 ml-2 uppercase">{"//"} {locale === "vi" ? "VN" : locale.toUpperCase()}</span>
                    </h2>
                    <p className="text-slate-400 text-lg mb-12 max-w-lg mx-auto font-medium">
                        {t("subtitle")}
                    </p>

                    {isSuccess ? (
                        <div className="bg-primary/10 border border-primary/20 text-primary px-8 py-4 rounded-lg font-black text-lg animate-in fade-in zoom-in duration-300">
                            ✓ PROTOCOL JOINED. WELCOME TO THE COMMUNITY.
                        </div>
                    ) : (
                        <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto" onSubmit={handleSubmit}>
                            <input
                                className="flex-1 bg-black/40 border border-white/10 text-white placeholder:text-slate-500 rounded-lg py-4 px-6 focus:ring-1 focus:ring-primary focus:border-primary outline-none disabled:opacity-50 transition-all"
                                placeholder={t("placeholder")}
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                disabled={isSubmitting}
                            />
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="bg-primary text-background-dark font-black px-8 py-4 rounded-lg hover:scale-105 transition-transform uppercase disabled:opacity-50 flex items-center justify-center gap-2"
                            >
                                {isSubmitting ? (
                                    <>
                                        <span className="material-symbols-outlined animate-spin text-xl">sync</span>
                                        PROCESSING
                                    </>
                                ) : t("cta")}
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </section>
    );
}
