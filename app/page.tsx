import FeatureSection from "@/components/feature-section";
import { siteSections } from "@/lib/data";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-amber-50 text-amber-900">
      <main className="flex-1 flex flex-col items-center">
        <section className="w-full py-8 sm:py-12 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 md:px-5 xl:px-8">
            <div className="flex flex-col items-center space-y-4 text-center">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tighter text-amber-800">
                Free Chess Training Tools
              </h1>
            </div>
          </div>
        </section>

        <section
          id="features"
          className="w-full py-8 sm:py-12 md:py-24 lg:py-32 xl:py-36 bg-amber-50"
        >
          <div className="container mx-auto px-4 sm:px-6 md:px-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-6 sm:gap-8">
              {siteSections
                .filter((section) => section.displayOnHomePage)
                .map((section) => (
                  <FeatureSection key={section.title} {...section} />
                ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}