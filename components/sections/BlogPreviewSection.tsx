"use client";

import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";

interface BlogPostPreview {
    title: string;
    excerpt: string;
    tag: string;
}

const images = [
    "https://lh3.googleusercontent.com/aida-public/AB6AXuA963nRtp0Zd48lmqSFJaH5APkZESSB1113DrHQrtbySX8ezed_N6XhZOyLejAKxRF8MEMkzwXeayhrBgffLUCwnZ60iE5YbeY-k1uxHxPXN3HmopmNYV9eMkNllrjDYEWcWGNeK0KI6CuI5luRnrT2rbrROKIXn8-voimTQ3LxUrQwLkXGtne0NfPrucTH3GSoJAZXwxlACwswKC0HZznTseur_tUmFWeMUYa9xgPbyYjjZdO6u0V1biG6WrY22bYwdFv3F9B2NYw",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDxjt6ykmBCFrb8Q-TlAubPvT3WVXg_9ioaNQ2qqN3JxGhWsoK4e9G5jaJQ3-iFxfy_GF7rOZCUALQveNcjeIN8OGXGAqzcD8-3jRIg0pp2VsoEB2kBM_J1gnil4vmlALOwWLAeREig1KaFt4SzlwA4n1iNU712rsYSKFDU1NJhjcw9w04eAxPCit1EvUt2zESTqWYxlJ3Z0N9RzHU_jxAK61FUlBQiY8Tg8osg28bLqiyGy3TT1-ve5nrEv46A8qAYC-Fwr-gJslw",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBR9VzvX6d8YLSoT8EB2rDu7nPEMh_QqEcD8-8paztw87FeipIIOMAEUkp2-Lcv2E1I1wRqJa42nmNzvzCuGXI-3vfRxwgLZPOOsVObLcZnbPbyfKYfk8zCJii0GinA4Vi7YMdwUYIjja3J2ga-3dqQcppjob5HNL-p7rQZxHD6GYkZmVdsURPKSqupUqjwHSmg3qkXE56LZbiROv2gmdxjFBg3gglnT4SIgcRo4XVZsqiq9pc5SAyM-KTpI-KQK_H4KOAL_d9lfH8"
];

export function BlogPreviewSection() {
    const t = useTranslations("blog");
    const locale = useLocale();
    const posts = t.raw("posts") as BlogPostPreview[];

    return (
        <section id="blog" className="py-32 border-t border-white/5 bg-background-dark">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex justify-between items-end mb-16">
                    <h2 className="text-4xl font-bold text-white">
                        {t("title")}
                        <span className="text-[10px] font-mono text-slate-600 ml-2 uppercase">{"//"} {locale === "vi" ? "VN" : locale.toUpperCase()}</span>
                    </h2>
                    <Link href={`/${locale}/blog`} className="text-primary text-sm font-bold tracking-widest uppercase hover:underline">
                        {t("view_all")}
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {posts.map((post, idx) => (
                        <Link
                            key={idx}
                            href={`/${locale}/blog/post-${idx + 1}`}
                            className="group cursor-pointer block"
                        >
                            <div className="aspect-video rounded-xl overflow-hidden mb-6 bg-neutral-dark border border-white/5">
                                <img
                                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500 opacity-60 group-hover:opacity-100"
                                    alt={post.title}
                                    src={images[idx]}
                                />
                            </div>
                            <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors mb-3 leading-tight">
                                {post.title}
                            </h3>
                            <p className="text-slate-400 text-sm leading-relaxed">{post.excerpt}</p>
                            <div className="mt-4 flex items-center gap-2 text-primary text-xs font-bold tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity">
                                Read Post <span className="material-symbols-outlined text-sm">arrow_forward</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
