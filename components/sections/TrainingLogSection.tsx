"use client";

import { useTranslations, useLocale } from "next-intl";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function TrainingLogSection() {
    const t = useTranslations("training_log");
    const locale = useLocale();
    const [activeFilter, setActiveFilter] = useState("all");
    const [isLoading, setIsLoading] = useState(false);

    const activities = [
        { date: "OCT 24", name: "Tempo Intervals: 5x1km", dist: "12.50 km", time: "55:20", pace: "4:25 /km", elev: "120m", zone: "Z4", zoneColor: "border-orange-500/30 text-orange-500", status: "BEST EFFORT", type: "workouts" },
        { date: "OCT 22", name: "Z2 Base Building", dist: "8.20 km", time: "45:10", pace: "5:30 /km", elev: "45m", zone: "Z2", zoneColor: "border-blue-500/30 text-blue-500", status: "RECOVERY", type: "all" },
        { date: "OCT 20", name: "Sunday Long Run", dist: "28.00 km", time: "2:25:12", pace: "5:11 /km", elev: "410m", zone: "Z3", zoneColor: "border-green-500/30 text-green-500", status: "COMPLETED", type: "long_runs" },
        { date: "OCT 18", name: "Hill Sprints 10x200m", dist: "10.00 km", time: "52:45", pace: "5:16 /km", elev: "245m", zone: "Z5", zoneColor: "border-red-500/30 text-red-500", status: "STRENGTH", type: "workouts" },
    ];

    const filteredActivities = activeFilter === "all"
        ? activities
        : activities.filter(a => a.type === activeFilter);

    const handleLoadMore = () => {
        setIsLoading(true);
        setTimeout(() => setIsLoading(false), 1500);
    };

    return (
        <section className="py-32 border-t border-white/5 bg-background-dark/50">
            <div className="max-w-7xl mx-auto px-6">
                <div className="mb-12">
                    <h2 className="text-4xl font-bold text-white mb-8">
                        {t("title")}
                        <span className="text-[10px] font-mono text-slate-600 ml-2 uppercase">// {locale === "vi" ? "VN" : locale.toUpperCase()}</span>
                        <span className="text-[10px] font-mono text-slate-600 ml-2 uppercase">// {locale === "vi" ? "VN" : locale.toUpperCase()}</span>
                    </h2>

                    <div className="flex flex-wrap items-center gap-6 border-b border-white/5 pb-6 mb-8 text-xs font-bold tracking-widest uppercase">
                        <button
                            onClick={() => setActiveFilter("all")}
                            className={cn("transition-colors pb-2 border-b-2", activeFilter === "all" ? "text-primary border-primary" : "text-slate-500 border-transparent hover:text-white")}
                        >
                            {t("filters.all")}
                        </button>
                        <button
                            onClick={() => setActiveFilter("workouts")}
                            className={cn("transition-colors pb-2 border-b-2", activeFilter === "workouts" ? "text-primary border-primary" : "text-slate-500 border-transparent hover:text-white")}
                        >
                            {t("filters.workouts")}
                        </button>
                        <button
                            onClick={() => setActiveFilter("long_runs")}
                            className={cn("transition-colors pb-2 border-b-2", activeFilter === "long_runs" ? "text-primary border-primary" : "text-slate-500 border-transparent hover:text-white")}
                        >
                            {t("filters.long_runs")}
                        </button>
                        <button
                            onClick={() => setActiveFilter("races")}
                            className={cn("transition-colors pb-2 border-b-2", activeFilter === "races" ? "text-primary border-primary" : "text-slate-500 border-transparent hover:text-white")}
                        >
                            {t("filters.races")}
                        </button>
                        <div className="ml-auto flex items-center gap-2 text-slate-500 cursor-help" title="Mock filter">
                            <span className="material-symbols-outlined text-sm">filter_list</span>
                            {t("filters.filter_month")}
                        </div>
                    </div>
                </div>

                <div className="glass-card rounded-xl overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="text-slate-500 text-[10px] uppercase tracking-widest border-b border-white/5">
                                <th className="px-6 py-4 font-bold">{t("table.date")}</th>
                                <th className="px-6 py-4 font-bold">{t("table.activity")}</th>
                                <th className="px-6 py-4 font-bold">{t("table.distance")}</th>
                                <th className="px-6 py-4 font-bold">{t("table.time")}</th>
                                <th className="px-6 py-4 font-bold">{t("table.pace")}</th>
                                <th className="px-6 py-4 font-bold">{t("table.elevation")}</th>
                                <th className="px-6 py-4 font-bold">{t("table.effort")}</th>
                                <th className="px-6 py-4 font-bold">{t("table.status")}</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm font-mono transition-opacity duration-300">
                            {filteredActivities.length > 0 ? filteredActivities.map((act, i) => (
                                <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-colors group">
                                    <td className="px-6 py-5 text-slate-400">{act.date}</td>
                                    <td className="px-6 py-5 text-white font-medium">{act.name}</td>
                                    <td className="px-6 py-5 text-white">{act.dist}</td>
                                    <td className="px-6 py-5 text-white">{act.time}</td>
                                    <td className="px-6 py-5 text-primary font-bold">{act.pace}</td>
                                    <td className="px-6 py-5 text-slate-400">{act.elev}</td>
                                    <td className="px-6 py-5">
                                        <span className={`px-2 py-0.5 rounded border ${act.zoneColor} text-[10px]`}>{act.zone}</span>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-2 text-[10px] text-primary font-bold">
                                            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></div> {act.status}
                                        </div>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan={8} className="px-6 py-20 text-center text-slate-500 font-sans italic">
                                        No recent activities found for this category.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="mt-8 text-center">
                    <button
                        onClick={handleLoadMore}
                        disabled={isLoading}
                        className="text-xs font-bold tracking-widest uppercase text-slate-500 hover:text-primary transition-colors flex items-center justify-center gap-2 mx-auto disabled:opacity-50"
                    >
                        {isLoading ? "SYNCING..." : t("load_more")}
                        <span className={cn("material-symbols-outlined text-sm", isLoading && "animate-spin")}>
                            {isLoading ? "sync" : "expand_more"}
                        </span>
                    </button>
                </div>
            </div>
        </section>
    );
}
