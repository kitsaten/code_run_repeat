"use client";

import { useTranslations, useLocale } from "next-intl";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { StravaActivity } from "@/types/strava";

interface TrainingLogSectionProps {
    activities: StravaActivity[];
}

export function TrainingLogSection({ activities }: TrainingLogSectionProps) {
    const t = useTranslations("training_log");
    const locale = useLocale();
    const [activeFilter, setActiveFilter] = useState("all");
    const [isLoading, setIsLoading] = useState(false);

    // Format pace
    const formatPace = (speedMs: number) => {
        if (!speedMs) return "-:--";
        const minsPerKm = 1000 / speedMs / 60;
        const mins = Math.floor(minsPerKm);
        const secs = Math.floor((minsPerKm - mins) * 60).toString().padStart(2, '0');
        return `${mins}:${secs}`;
    };

    // Format time
    const formatTime = (seconds: number) => {
        const hrs = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        if (hrs > 0) {
            return `${hrs}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
        }
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    // Format date
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString(locale === "vi" ? "vi-VN" : "en-US", { month: "short", day: "numeric" }).toUpperCase();
    };

    // Map Strava activity to table format
    const formattedActivities = activities.map(act => {
        // Derive some faux stats based on heart rate or type for visual flair
        let zone = "Z2";
        let zoneColor = "border-blue-500/30 text-blue-500";
        let status = "BASE";
        let type = "all";

        if (act.average_heartrate) {
            if (act.average_heartrate > 165) { zone = "Z5"; zoneColor = "border-red-500/30 text-red-500"; status = "MAX EFFORT"; type = "workouts"; }
            else if (act.average_heartrate > 150) { zone = "Z4"; zoneColor = "border-orange-500/30 text-orange-500"; status = "THRESHOLD"; type = "workouts"; }
            else if (act.average_heartrate > 135) { zone = "Z3"; zoneColor = "border-green-500/30 text-green-500"; status = "TEMPO"; type = "long_runs"; }
        }

        if (act.distance > 20000) { type = "long_runs"; } // 20km+ is a long run
        if (act.name.toLowerCase().includes("race")) { type = "races"; status = "RACE"; zoneColor = "border-purple-500/30 text-purple-500"; }
        if (act.name.toLowerCase().includes("workout") || act.name.toLowerCase().includes("interval")) { type = "workouts"; }

        return {
            date: formatDate(act.start_date),
            name: act.name,
            dist: `${(act.distance / 1000).toFixed(2)} km`,
            time: formatTime(act.moving_time),
            pace: `${formatPace(act.average_speed)} /km`,
            elev: `${Math.round(act.total_elevation_gain)}m`,
            zone,
            zoneColor,
            status,
            type,
            raw: act,
        };
    });

    const filteredActivities = activeFilter === "all"
        ? formattedActivities
        : formattedActivities.filter(a => a.type === activeFilter);

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
                        <span className="text-[10px] font-mono text-slate-600 ml-2 uppercase">{"//"} {locale === "vi" ? "VN" : locale.toUpperCase()}</span>
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
                                        <span className={`px-2 py-0.5 rounded border ${act.zoneColor} text-[10px]`}>{act.zone}{act.raw.average_heartrate ? ` (${Math.round(act.raw.average_heartrate)}bpm)` : ''}</span>
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
