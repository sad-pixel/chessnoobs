import FeatureCard from "@/components/feature-card";

export default function FeatureSection({ title, features }: { title: string; features: { title: string; icon: JSX.Element; description: string; link: string; comingSoon: boolean; }[] }) {
    return (
      <div className="text-center mx-3">
        <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl mb-8 text-amber-900">
          {title}
        </h2>
        <div className="space-y-4">
          {features.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </div>
    );
}