"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { PROJECTS } from "@/lib/projects";
import { LottiePlayer } from "@/components/media/LottiePlayer";
import { LOTTIE_GEOMETRIC, LOTTIE_PARTICLES } from "@/lib/lottie-animations";
import { FadeInUp } from "@/components/animations/MotionWrappers";
import { TextScramble } from "@/components/animations/TextScramble";
import { KineticMarquee } from "@/components/animations/KineticMarquee";

export default function ProjectsArchive() {
    const targetRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: targetRef });
    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-65%"]);

    return (
        <div className="bg-dark-base" style={{ position: "relative" }}>
            {/* Page Title */}
            <section className="pt-40 pb-20 px-8 md:px-16 border-b border-white/10">
                <FadeInUp>
                    <span className="font-mono text-xs text-neon-blue tracking-widest uppercase block mb-6">// Projects Archive</span>
                    <h1 className="text-[14vw] font-black uppercase tracking-tighter leading-[0.85] text-white">
                        <TextScramble text="Selected" />
                        <br />
                        <span className="text-transparent" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.3)" }}>
                            <TextScramble text="Work" />
                        </span>
                    </h1>
                </FadeInUp>
            </section>

            {/* Horizontal Scroll Gallery */}
            <section ref={targetRef} className="relative h-[500vh] bg-dark-base">
                <div className="sticky top-0 h-screen flex items-center overflow-hidden">

                    <div className="absolute top-6 right-8 z-10 w-32 h-32 opacity-30 pointer-events-none">
                        <LottiePlayer animationData={LOTTIE_GEOMETRIC} />
                    </div>

                    <motion.div style={{ x }} className="flex gap-8 md:gap-12 px-[8vw]">
                        {PROJECTS.map((project, idx) => {
                            const accent = project.accentColor === "blue" ? "group-hover:text-neon-blue" : "group-hover:text-neon-pink";
                            const glitch = project.accentColor === "blue" ? "bg-neon-blue" : "bg-neon-pink";
                            return (
                                <Link
                                    key={project.id}
                                    href={`/projects/${project.slug}`}
                                    className="group relative w-[80vw] md:w-[42vw] aspect-[4/5] overflow-hidden cursor-pointer shrink-0 bg-brutalist-gray border border-white/10 flex-shrink-0"
                                >
                                    <div className="absolute inset-0 overflow-hidden">
                                        <img
                                            src={project.imageSrc}
                                            alt={project.title}
                                            loading="lazy"
                                            className="object-cover w-full h-full opacity-70 transition-all duration-700 group-hover:scale-[1.04] group-hover:opacity-40 grayscale group-hover:grayscale-0"
                                        />
                                        <div className={`absolute top-0 left-[-2%] w-[104%] h-full ${glitch} mix-blend-exclusion opacity-0 translate-x-[-20px] group-hover:opacity-[0.2] group-hover:translate-x-0 transition-all duration-100`} />
                                        <div className={`absolute top-0 left-[2%] w-full h-full ${glitch === "bg-neon-blue" ? "bg-neon-pink" : "bg-neon-blue"} mix-blend-exclusion opacity-0 translate-x-[20px] group-hover:opacity-[0.1] group-hover:translate-x-0 transition-all duration-200`} />
                                    </div>

                                    {/* Rotated title */}
                                    <div className="absolute bottom-16 left-[-2rem] -rotate-90 origin-top-left pointer-events-none mix-blend-exclusion z-10">
                                        <h2 className={`text-5xl md:text-7xl font-black text-white uppercase tracking-tighter transition-colors ${accent} drop-shadow-[0_0_15px_rgba(0,0,0,0.6)]`}>
                                            {project.title}
                                        </h2>
                                    </div>

                                    {/* Bottom info */}
                                    <div className="absolute bottom-6 right-6 text-right z-10 pointer-events-none">
                                        <span className="font-mono text-xs text-white/40 uppercase tracking-widest block">{project.category}</span>
                                        <span className="font-mono text-xs text-white/25 uppercase tracking-widest">{project.year}</span>
                                    </div>

                                    {/* Index */}
                                    <div className="absolute top-6 left-6 z-10">
                                        <span className="font-mono text-xs text-white/30 uppercase tracking-widest">0{idx + 1}</span>
                                    </div>
                                </Link>
                            );
                        })}
                    </motion.div>
                </div>
            </section>

            {/* Kinetic Marquee separator  */}
            <div className="border-t border-b border-white/10 py-4 overflow-hidden">
                <KineticMarquee baseVelocity={3}>VOID OBSERVER // NEON PULSE // KINETICS // SYSTEM BREAK // CARBON PRINT //</KineticMarquee>
            </div>

            {/* Lottie particles ambient footer */}
            <div className="relative py-24 px-8 md:px-16 flex items-center justify-between border-t border-white/10">
                <p className="font-mono text-xs text-white/30 uppercase tracking-widest">5 Projects · 2023–2024</p>
                <div className="w-32 h-32 opacity-40 pointer-events-none">
                    <LottiePlayer animationData={LOTTIE_PARTICLES} />
                </div>
            </div>
        </div>
    );
}
