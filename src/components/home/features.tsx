import { Search, Zap, Star } from "lucide-react";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => (
  <div className="p-8 rounded-2xl border border-border bg-card hover:border-primary/50 transition-colors">
    <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center mb-6">
      {icon}
    </div>
    <h3 className="text-xl font-bold mb-3">{title}</h3>
    <p className="text-muted-foreground leading-relaxed">{description}</p>
  </div>
);

export const Features = () => {
  return (
    <section className="py-20 bg-muted/30 border-y border-border">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Search className="text-primary" />}
            title="Smart Filtering"
            description="Filter by language, labels, and activity. Find issues that are unassigned and ready for work."
          />
          <FeatureCard
            icon={<Zap className="text-blue-500" />}
            title="Personalized Feed"
            description="We analyze your GitHub profile to recommend issues in the languages you already use."
          />
          <FeatureCard
            icon={<Star className="text-yellow-500" />}
            title="Bookmark & Track"
            description="Save issues for later. Build a list of potential contributions without losing track."
          />
        </div>
      </div>
    </section>
  );
};
