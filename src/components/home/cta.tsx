"use client";

import { Github } from "lucide-react";
import { signIn } from "next-auth/react";

export const CTA = () => (
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
          Join hundreds of developers finding meaningful ways to contribute to
          the tools they love.
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
);
