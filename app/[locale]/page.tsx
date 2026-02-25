import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { StatsSection } from "@/components/sections/StatsSection";
import { TechSection } from "@/components/sections/TechSection";
import { TrainingLogSection } from "@/components/sections/TrainingLogSection";
import { BlogPreviewSection } from "@/components/sections/BlogPreviewSection";
import { NewsletterSection } from "@/components/sections/NewsletterSection";

interface HomePageProps {
    params: { locale: string };
}

export default function HomePage({ params: { locale } }: HomePageProps) {
    // We use locale for SEO or other logic if needed, but sections use i18n hooks
    console.log("Rendering HomePage for locale:", locale);
    return (
        <>
            <Navbar />
            <main>
                <HeroSection />
                <AboutSection />
                <StatsSection />
                <TechSection />
                <TrainingLogSection />
                <BlogPreviewSection />
                <NewsletterSection />
            </main>
            <Footer />
        </>
    );
}
