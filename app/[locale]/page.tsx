import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { StatsSection } from "@/components/sections/StatsSection";
import { TechSection } from "@/components/sections/TechSection";
import { TrainingLogSection } from "@/components/sections/TrainingLogSection";
import { BlogPreviewSection } from "@/components/sections/BlogPreviewSection";
import { NewsletterSection } from "@/components/sections/NewsletterSection";
import { getAthleteStats, getRecentActivities } from "@/lib/strava";


export default async function HomePage() {
    const statsCode = getAthleteStats();
    const activitiesCode = getRecentActivities(30, 1);

    const [stats, activities] = await Promise.all([statsCode, activitiesCode]);
    const lastRun = activities.length > 0 ? activities[0] : null;

    console.log("STRAVA DATA CHECK:", {
        statsFound: !!stats,
        activitiesFound: activities.length,
        lastRunName: lastRun?.name
    });
    return (
        <>
            <Navbar />
            <main>
                <HeroSection />
                <AboutSection />
                <StatsSection stats={stats} lastRun={lastRun} />
                <TechSection />
                <TrainingLogSection activities={activities} />
                <BlogPreviewSection />
                <NewsletterSection />
            </main>
            <Footer />
        </>
    );
}
