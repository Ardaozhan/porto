"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { LottiePlayer } from "@/components/media/LottiePlayer";
import { LOTTIE_SIGNATURE, LOTTIE_PARTICLES, LOTTIE_GEOMETRIC } from "@/lib/lottie-animations";
import { VariableFontText } from "@/components/ui/VariableFontText";
import { SectionInvertTrigger } from "@/components/animations/SectionInvertTrigger";
import { FadeInUp } from "@/components/animations/MotionWrappers";
import { SVGDraw } from "@/components/animations/SVGDraw";
import { TextScramble } from "@/components/animations/TextScramble";

const SKILLS = [
    { label: "Brand Identity", level: 95 },
    { label: "Motion Design", level: 90 },
    { label: "WebGL / Shaders", level: 80 },
    { label: "Typography", level: 98 },
    { label: "Print Design", level: 88 },
    { label: "UI/UX Systems", level: 85 },
];

const TIMELINE = [
    { year: "2024", event: "Lead Creative — Darkfield Studio", detail: "Directing visual strategy across digital and physical brand systems for 20+ clients." },
    { year: "2023", event: "Senior Designer — Studio Vanta", detail: "Spearheaded experimental UI/motion projects. Won 3 Awwwards nominations." },
    { year: "2022", event: "Art Director — Neon Bureau", detail: "Built the visual framework for a global creative agency's rebrand campaign." },
    { year: "2021", event: "Founded Independent Practice", detail: "Independent work across branding, interactive, and editorial design." },
];

export default function ProfilePage() {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    const highlight1 = useTransform(scrollYProgress, [0.1, 0.35], ["#1a1a1a", "#ffffff"]);
    const highlight2 = useTransform(scrollYProgress, [0.35, 0.6], ["#1a1a1a", "#ffffff"]);
    const highlight3 = useTransform(scrollYProgress, [0.55, 0.8], ["#1a1a1a", "#00F0FF"]);

    return (
        <main ref={containerRef} className="relative min-h-screen bg-dark-base" style={{ position: "relative" }}>

            {/* Hero Section */}
            <section className="relative pt-40 pb-32 px-8 md:px-16 border-b border-white/10">
                <div className="absolute top-40 right-8 md:right-24 w-[250px] h-[250px] opacity-20 pointer-events-none">
                    <LottiePlayer animationData={LOTTIE_GEOMETRIC} />
                </div>

                <FadeInUp className="max-w-7xl mx-auto">
                    <span className="font-mono text-xs text-neon-blue tracking-widest uppercase block mb-8">// About</span>
                    <h1 className="text-[12vw] font-black uppercase tracking-tighter leading-[0.85] text-white">
                        <VariableFontText text="I Design" />
                        <span className="block" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.4)", color: "transparent" }}>
                            <VariableFontText text="Futures" />
                        </span>
                    </h1>
                    <p className="mt-12 text-xl md:text-2xl text-white/50 font-light max-w-2xl leading-relaxed">
                        Art director and creative technologist. I build visual systems at the intersection of brutalist design theory and experimental interactive media.
                    </p>
                </FadeInUp>
            </section>

            {/* Manifesto */}
            <SectionInvertTrigger className="px-8 md:px-16 py-32 border-b border-white/10 bg-dark-base w-full">
                <div className="max-w-7xl mx-auto">
                    <span className="font-mono text-xs text-white/30 tracking-widest uppercase block mb-16">
                        <TextScramble text="// Manifesto" triggerOnHover={false} />
                    </span>
                    <div className="text-5xl md:text-7xl lg:text-[8vw] font-black uppercase leading-[1.05] tracking-tighter flex flex-col gap-8">
                        <motion.span style={{ color: highlight1 }} className="block border-l-4 border-neon-pink pl-8">
                            Design is not decoration.
                        </motion.span>
                        <motion.span style={{ color: highlight2 }} className="block border-l-4 border-neon-blue pl-8 md:ml-[15%]">
                            It is the system.
                        </motion.span>
                        <motion.span style={{ color: highlight3 }} className="block border-l-4 border-white/50 pl-8">
                            Code is our canvas.
                        </motion.span>
                    </div>
                    <p className="mt-16 text-lg text-white/40 font-light max-w-xl leading-relaxed">
                        Every pixel carries intent. Every interaction tells a story. The grid is not a constraint — it is a foundation from which beauty deviates into something profound.
                    </p>
                </div>
            </SectionInvertTrigger>

            {/* Skills */}
            <section className="px-8 md:px-16 py-32 border-b border-white/10">
                <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-24">
                    <FadeInUp>
                        <span className="font-mono text-xs text-white/30 tracking-widest uppercase block mb-12">// Capabilities</span>
                        <div className="flex flex-col gap-8">
                            {SKILLS.map((skill) => (
                                <div key={skill.label}>
                                    <div className="flex justify-between mb-2">
                                        <span className="font-mono text-sm text-white/60 uppercase tracking-widest">{skill.label}</span>
                                        <span className="font-mono text-xs text-neon-blue">{skill.level}%</span>
                                    </div>
                                    <div className="w-full h-px bg-white/10 relative">
                                        <motion.div
                                            className="absolute top-0 left-0 h-px bg-neon-blue"
                                            initial={{ width: 0 }}
                                            whileInView={{ width: `${skill.level}%` }}
                                            transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
                                            viewport={{ once: true }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </FadeInUp>

                    <FadeInUp delay={0.2}>
                        <span className="font-mono text-xs text-white/30 tracking-widest uppercase block mb-12">// Timeline</span>
                        <div className="flex flex-col gap-12">
                            {TIMELINE.map((item) => (
                                <div key={item.year} className="border-l border-white/10 pl-8 relative">
                                    <div className="absolute -left-[4.5px] top-0 w-2 h-2 rounded-full bg-neon-pink" />
                                    <span className="font-mono text-xs text-neon-pink tracking-widest uppercase block mb-2">{item.year}</span>
                                    <p className="text-white font-bold text-lg mb-2">{item.event}</p>
                                    <p className="text-white/40 text-sm leading-relaxed">{item.detail}</p>
                                </div>
                            ))}
                        </div>
                    </FadeInUp>
                </div>
            </section>

            {/* SVG Draw separator */}
            <div className="px-8 md:px-16 py-8">
                <SVGDraw
                    viewBox="0 0 1200 60"
                    d="M 0 30 Q 200 10 400 30 T 800 30 T 1200 30"
                    color="#00F0FF"
                    strokeWidth={1.5}
                    className="w-full h-16 opacity-40"
                />
            </div>

            {/* Signature Footer */}
            <div className="flex flex-col items-center justify-center pb-40 pt-20 px-8 border-t border-white/5">
                <div className="w-[60vw] md:w-[30vw] invert drop-shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                    <LottiePlayer animationData={LOTTIE_SIGNATURE} />
                </div>
                <div className="flex items-center gap-4 mt-4">
                    <div className="w-16 h-px bg-white/20" />
                    <p className="text-white/25 font-mono tracking-[0.5em] text-xs uppercase">Est. 2021</p>
                    <div className="w-16 h-px bg-white/20" />
                </div>
                <div className="mt-6 w-24 h-24 opacity-30 pointer-events-none">
                    <LottiePlayer animationData={LOTTIE_PARTICLES} />
                </div>
            </div>
        </main>
    );
}
