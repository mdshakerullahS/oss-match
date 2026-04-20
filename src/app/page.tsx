"use client";

import Link from "next/link";
import {
  Github,
  Search,
  Star,
  Zap,
  Code2,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { signIn } from "next-auth/react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* 1. Hero Section */}
      <section className="relative pt-20 pb-16 md:pt-32 md:pb-24 overflow-hidden">
        {/* Background Glow Decor */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
          <div className="absolute top-[-10%] left-[20%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-[10%] right-[20%] w-[30%] h-[30%] bg-blue-500/10 rounded-full blur-[100px]" />
        </div>

        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-muted border border-border text-xs font-medium mb-6 animate-fade-in">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Discover your next contribution
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-foreground mb-6 leading-[1.1]">
            Stop searching. <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-blue-500">
              Start contributing.
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground mb-10 leading-relaxed">
            OSS Match connects developers with &quot;Good First Issues&quot;
            tailored to their tech stack. Skip the noise and find projects that
            actually need your help.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() =>
                signIn("github", { callbackUrl: "/dashboard/for-you" })
              }
              className="flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-primary/20 transition-all active:scale-[0.98] w-full sm:w-auto"
            >
              <Github size={20} />
              Sign in with GitHub
            </button>
            <Link
              href="#how-it-works"
              className="flex items-center gap-2 bg-card border border-border px-8 py-4 rounded-xl font-bold text-lg hover:bg-muted transition-all w-full sm:w-auto"
            >
              How it works
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Key Features Grid */}
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

      {/* 3. The "Process" Section */}
      <section id="how-it-works" className="py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="flex-1 space-y-8">
              <h2 className="text-3xl md:text-4xl font-bold">
                Built for the modern <br /> open-source developer.
              </h2>
              <ul className="space-y-6">
                <Step
                  number="01"
                  title="Connect your Account"
                  text="Sign in securely via GitHub. We never ask for write access to your code."
                />
                <Step
                  number="02"
                  title="Define your Stack"
                  text="Choose the languages and labels (like 'documentation' or 'bug') you prefer."
                />
                <Step
                  number="03"
                  title="Claim your Issue"
                  text="Navigate directly to the issue on GitHub and start your Pull Request."
                />
              </ul>
            </div>

            {/* Visual Placeholder / Mockup */}
            <div className="flex-1 w-full bg-card border border-border rounded-2xl p-4 shadow-2xl relative">
              <div className="aspect-video bg-muted rounded-lg flex items-center justify-center border border-border/50">
                <Code2 size={64} className="text-muted-foreground/20" />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-background border border-border p-4 rounded-xl shadow-xl hidden md:block">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="text-green-500" />
                  <span className="text-sm font-semibold">
                    Matched 12 new issues!
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Final CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="bg-primary rounded-4xl p-12 text-center text-primary-foreground relative overflow-hidden shadow-2xl shadow-primary/20">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <Github size={200} />
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Ready to make your mark?
            </h2>
            <p className="text-primary-foreground/80 mb-10 max-w-xl mx-auto text-lg">
              Join hundreds of developers finding meaningful ways to contribute
              to the tools they love.
            </p>
            <button
              onClick={() =>
                signIn("github", { callbackUrl: "/dashboard/for-you" })
              }
              className="bg-white text-primary px-10 py-4 rounded-xl font-bold text-lg hover:bg-opacity-90 transition-all shadow-xl"
            >
              Get Started for Free
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

/* --- Helper Components --- */

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="p-8 rounded-2xl border border-border bg-card hover:border-primary/50 transition-colors">
      <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center mb-6">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">{description}</p>
    </div>
  );
}

function Step({
  number,
  title,
  text,
}: {
  number: string;
  title: string;
  text: string;
}) {
  return (
    <li className="flex gap-4">
      <span className="text-primary font-mono font-bold text-lg">{number}</span>
      <div>
        <h4 className="font-bold text-lg mb-1">{title}</h4>
        <p className="text-muted-foreground">{text}</p>
      </div>
    </li>
  );
}
