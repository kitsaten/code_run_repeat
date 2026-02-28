"use client";

import { useTranslations, useLocale } from "next-intl";
import { StravaStats, StravaActivity } from "@/types/strava";

interface StatsSectionProps {
    stats: StravaStats | null;
    lastRun: StravaActivity | null;
}

export function StatsSection({ stats, lastRun }: StatsSectionProps) {
    const t = useTranslations("stats");
    const locale = useLocale();

    // Helper to format distance nicely
    const formatDistance = (meters: number) => {
        return (meters / 1000).toLocaleString(locale, { maximumFractionDigits: 1 });
    };

    // Parse pace from speed (m/s to min/km)
    const formatPace = (speedMs: number) => {
        if (!speedMs) return "0:00";
        const minsPerKm = 1000 / speedMs / 60;
        const mins = Math.floor(minsPerKm);
        const secs = Math.floor((minsPerKm - mins) * 60).toString().padStart(2, '0');
        return `${mins}:${secs}`;
    };

    const totalDistance = stats ? formatDistance(stats.all_run_totals.distance) : "0";
    const recentDistance = stats ? formatDistance(stats.recent_run_totals.distance) : "0";
    const totalElevation = stats ? stats.all_run_totals.elevation_gain.toLocaleString(locale) : "0";

    // Derived metrics (can adjust calculation as needed)
    const currentPace = lastRun ? formatPace(lastRun.average_speed) : "-:--";
    const lastRunDistance = lastRun ? formatDistance(lastRun.distance) : "0";
    const lastRunTimeCalc = lastRun ? (() => {
        const diff = new Date().getTime() - new Date(lastRun.start_date).getTime();
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const days = Math.floor(hours / 24);
        if (days > 0) return `${days} days ago`;
        return `${hours} hours ago`;
    })() : "-";


    return (
        <section id="stats" className="py-24 bg-neutral-dark/30">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex items-end justify-between mb-12">
                    <div>
                        <h3 className="text-sm font-bold text-primary tracking-widest uppercase mb-2">{t("badge")}</h3>
                        <h2 className="text-3xl font-bold text-white">
                            {t("title")}
                            <span className="text-[10px] font-mono text-slate-600 ml-2 uppercase">{"//"} {locale === "vi" ? "VN" : locale.toUpperCase()}</span>
                        </h2>
                    </div>
                    <div className="text-slate-500 text-sm font-mono tracking-tighter">{t("last_updated")}</div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Stat Card 1 */}
                    <div className="glass-card p-8 rounded-xl">
                        <p className="text-slate-400 text-sm font-medium mb-1">{t("total_distance")}</p>
                        <p className="text-4xl font-black text-white mb-4">{totalDistance} <span className="text-lg font-normal text-slate-500">{t("unit_km")}</span></p>
                        <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                            <div className="h-full bg-primary w-[85%]"></div>
                        </div>
                    </div>

                    {/* Stat Card 2 */}
                    <div className="glass-card p-8 rounded-xl">
                        <p className="text-slate-400 text-sm font-medium mb-1">{t("weekly_mileage")}</p>
                        <p className="text-4xl font-black text-white mb-2">{recentDistance} <span className="text-lg font-normal text-slate-500">{t("unit_km")}</span></p>
                        <div className="h-12 w-full flex items-end gap-1">
                            {/* Visual decorative bars */}
                            <div className="w-full bg-primary/20 h-1/2 rounded-t-sm"></div>
                            <div className="w-full bg-primary/40 h-2/3 rounded-t-sm"></div>
                            <div className="w-full bg-primary/30 h-1/3 rounded-t-sm"></div>
                            <div className="w-full bg-primary/60 h-3/4 rounded-t-sm"></div>
                            <div className="w-full bg-primary h-full rounded-t-sm"></div>
                            <div className="w-full bg-primary/50 h-2/3 rounded-t-sm"></div>
                            <div className="w-full bg-primary/20 h-1/4 rounded-t-sm"></div>
                        </div>
                    </div>

                    {/* Stat Card 3 */}
                    <div className="glass-card p-8 rounded-xl">
                        <p className="text-slate-400 text-sm font-medium mb-1">{t("current_pace")}</p>
                        <p className="text-4xl font-black text-white mb-4">{currentPace} <span className="text-lg font-normal text-slate-500">{t("unit_pace")}</span></p>
                        <div className="flex items-center gap-2 text-primary text-xs font-bold">
                            <span className="material-symbols-outlined text-sm">trending_up</span>
                            {t("status_steady")}
                        </div>
                    </div>

                    {/* Stat Card 4 */}
                    <div className="glass-card p-8 rounded-xl">
                        <p className="text-slate-400 text-sm font-medium mb-1">{t("marathon_pr")}</p>
                        <p className="text-4xl font-black text-white mb-4">3:26:15</p>
                        <div className="flex items-center gap-2 text-slate-500 text-xs font-bold">
                            <span className="material-symbols-outlined text-sm">military_tech</span>
                            {t("status_boston")}
                        </div>
                    </div>

                    {/* Stat Card 5 */}
                    <div className="glass-card p-8 rounded-xl">
                        <p className="text-slate-400 text-sm font-medium mb-1">{t("total_elevation")}</p>
                        <p className="text-4xl font-black text-white mb-4">{totalElevation} <span className="text-lg font-normal text-slate-500">{t("unit_m")}</span></p>
                        <div className="flex items-center gap-2 text-primary text-xs font-bold">
                            <span className="material-symbols-outlined text-sm">north_east</span>
                            {t("status_climbing")}
                        </div>
                    </div>

                    {/* Stat Card 6 */}
                    <div className="glass-card p-8 rounded-xl">
                        <p className="text-slate-400 text-sm font-medium mb-1">{t("active_streak")}</p>
                        <p className="text-4xl font-black text-white mb-4">1 <span className="text-lg font-normal text-slate-500">{t("unit_days")}</span></p>
                        <div className="flex items-center gap-2 text-orange-500 text-xs font-bold">
                            <span className="material-symbols-outlined text-sm">local_fire_department</span>
                            {t("status_heat")}
                        </div>
                    </div>

                    {/* Stat Card 7 */}
                    <div className="glass-card p-8 rounded-xl">
                        <p className="text-slate-400 text-sm font-medium mb-1">{t("last_run")}</p>
                        <p className="text-xl font-bold text-white mb-1">{lastRunDistance} km | {currentPace}/km</p>
                        <p className="text-slate-500 text-xs font-mono uppercase">{lastRunTimeCalc}</p>
                    </div>

                    {/* Stat Card 8 */}
                    <div className="glass-card p-8 rounded-xl">
                        <p className="text-slate-400 text-sm font-medium mb-1">{t("shoes")}</p>
                        <p className="text-xl font-bold text-white mb-4">Alphafly 3 <span className="text-primary">- 340km</span></p>
                        <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                            <div className="h-full bg-primary/40 w-[42%]"></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
