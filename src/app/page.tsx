"use client";

import { CTA } from "@/components/home/cta";
import { Features } from "@/components/home/features";
import { Hero } from "@/components/home/hero";
import { Process } from "@/components/home/process";

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <Process />
      <CTA />
    </>
  );
}
