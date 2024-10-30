import FeatureSection from "@/components/feature-section";
import { HeartHandshake } from "lucide-react";
import { siteSections } from "@/lib/data";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-amber-50 to-amber-100 text-amber-900">
      <main className="flex-1 flex flex-col items-center">
        <HeroSection />
        <FeaturesSection />
      </main>
    </div>
  );
}

function HeroSection() {
  return (
    <section className="w-full py-12">
      <div className="container mx-auto px-6 sm:px-8 md:px-10 xl:px-12">
        <div className="flex flex-col items-center space-y-6 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight text-amber-800 flex items-center justify-center">
            Free Chess Training Tools
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-amber-700 flex items-center justify-center">
            Let's become better chess players together
          </p>
        </div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  return (
    <section
      id="features"
      className="w-full py-10 bg-amber-50"
    >
      <div className="container mx-auto px-6 sm:px-8 md:px-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-10">
          {siteSections
            .filter((section) => section.displayOnHomePage)
            .map((section) => (
              <FeatureSection key={section.title} {...section} />
            ))}
        </div>
      </div>
    </section>
  );
}