"use client";

import { Hero } from "@/components/sections/Hero";
import { ProjectGrid } from "@/components/sections/ProjectGrid";
import { LottiePlayer } from "@/components/media/LottiePlayer";
import { LOTTIE_PARTICLES } from "@/lib/lottie-animations";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-dark-base relative" style={{ position: "relative" }}>
      <Hero />
      <ProjectGrid />

      {/* Ambient particle Lottie background layer */}
      <div className="fixed top-0 left-0 w-[200vw] h-[200vw] -translate-x-[50vw] -translate-y-[50vw] pointer-events-none z-0 opacity-[0.02]">
        <LottiePlayer animationData={LOTTIE_PARTICLES} />
      </div>
    </main>
  );
}
