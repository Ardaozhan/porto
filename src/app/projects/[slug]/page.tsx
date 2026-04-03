"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { notFound, useParams } from "next/navigation";
import Link from "next/link";
import { PROJECTS } from "@/lib/projects";
import { LottiePlayer } from "@/components/media/LottiePlayer";
import { LOTTIE_GEOMETRIC, LOTTIE_WAVE } from "@/lib/lottie-animations";
import { TextScramble } from "@/components/animations/TextScramble";
import { SVGDraw } from "@/components/animations/SVGDraw";
import { FadeInUp } from "@/components/animations/MotionWrappers";

export default function ProjectDetailPage() {
    const params = useParams();
    const slug = params?.slug as string;
    const project = PROJECTS.find((p) => p.slug === slug);

    if (!project) {
        notFound();
    }

    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
    const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
    const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    const accent = project.accentColor === "blue" ? "#00F0FF" : "#FF003C";
    const accentClass = project.accentColor === "blue" ? "text-neon-blue" : "text-neon-pink";
    const borderClass = project.accentColor === "blue" ? "border-neon-blue" : "border-neon-pink";

    const prevProject = PROJECTS[(project.id - 2 + PROJECTS.length) % PROJECTS.length];
    const nextProject = PROJECTS[project.id % PROJECTS.length];

    return (
        <main ref={containerRef} className="min-h-screen bg-dark-base" style={{ position: "relative" }}>
            {/* Hero Header */}
            <motion.section
                className="relative h-screen flex flex-col justify-end pb-20 px-8 md:px-16 overflow-hidden"
                style={{ y: heroY, opacity: heroOpacity }}
            >
                {/* Background image with parallax */}
                <div className="absolute inset-0 z-0">
                    <img
                        src={project.imageSrc}
                        alt={project.title}
                        className="w-full h-full object-cover opacity-25"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-base via-dark-base/60 to-transparent" />
                </div>

                {/* Lottie decoration */}
                <div className="absolute top-40 right-8 md:right-24 w-[300px] h-[300px] opacity-30 pointer-events-none">
                    <LottiePlayer animationData={LOTTIE_GEOMETRIC} />
                </div>

                <div className="relative z-10 max-w-7xl w-full mx-auto">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
                        <Link href="/projects" className={`font-mono text-xs uppercase tracking-widest ${accentClass} mb-8 flex items-center gap-3 group`}>
                            <span className="w-8 h-px bg-current transition-all group-hover:w-16" />
                            Back to Archive
                        </Link>
                        <span className={`font-mono text-sm tracking-widest uppercase mb-6 block ${accentClass}`}>
                            {project.category} / {project.year}
                        </span>
                        <h1 className="text-[14vw] md:text-[10vw] font-black uppercase tracking-tighter text-white leading-[0.85] mb-6">
                            <TextScramble text={project.title} className="text-white" />
                        </h1>
                        <p className="text-white/50 text-xl md:text-2xl font-light max-w-xl">{project.subtitle}</p>
                    </motion.div>
                </div>
            </motion.section>

            {/* Tags row */}
            <FadeInUp className="px-8 md:px-16 py-12 border-y border-white/10 flex flex-wrap gap-4">
                {project.tags.map((tag) => (
                    <span key={tag} className={`font-mono text-xs uppercase tracking-widest px-4 py-2 border ${borderClass} ${accentClass}`}>
                        {tag}
                    </span>
                ))}
            </FadeInUp>

            {/* Description */}
            <section className="px-8 md:px-16 py-24 max-w-7xl mx-auto grid md:grid-cols-2 gap-24">
                <FadeInUp>
                    <span className="font-mono text-xs text-white/30 tracking-widest uppercase block mb-6">Overview</span>
                    <p className="text-white/80 text-xl md:text-2xl leading-relaxed font-light">{project.description}</p>
                </FadeInUp>

                <FadeInUp delay={0.2} className="flex flex-col gap-16">
                    <div>
                        <span className="font-mono text-xs text-white/30 tracking-widest uppercase block mb-4">Challenge</span>
                        <p className="text-white/60 text-lg leading-relaxed">{project.challenge}</p>
                    </div>
                    <div>
                        <span className="font-mono text-xs text-white/30 tracking-widest uppercase block mb-4">Solution</span>
                        <p className="text-white/60 text-lg leading-relaxed">{project.solution}</p>
                    </div>

                    {/* Lottie wave */}
                    <div className="w-full h-24 opacity-60">
                        <LottiePlayer animationData={LOTTIE_WAVE} />
                    </div>
                </FadeInUp>
            </section>

            {/* SVG Draw Separator */}
            <div className="w-full px-8 md:px-16 py-4">
                <SVGDraw
                    viewBox="0 0 1200 2"
                    d="M 0 1 L 1200 1"
                    color={accent}
                    strokeWidth={1}
                    className="w-full h-4 opacity-50"
                />
            </div>

            {/* Images */}
            <section className="px-8 md:px-16 py-24 flex flex-col gap-12">
                {project.images.map((src, i) => (
                    <FadeInUp key={i} delay={i * 0.1} className={`w-full border border-white/10 overflow-hidden ${i % 2 === 0 ? "" : "md:ml-[20%] md:w-[80%]"}`}>
                        <img
                            src={src}
                            alt={`${project.title} - view ${i + 1}`}
                            className="w-full h-[60vh] object-cover grayscale hover:grayscale-0 transition-all duration-700"
                        />
                    </FadeInUp>
                ))}
            </section>

            {/* Next / Prev navigation */}
            <section className="border-t border-white/10 grid md:grid-cols-2">
                <Link href={`/projects/${prevProject.slug}`} className="p-12 md:p-20 border-r border-white/10 group flex flex-col gap-4 hover:bg-white/3 transition-colors">
                    <span className="font-mono text-xs text-white/30 uppercase tracking-widest">Previous</span>
                    <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white group-hover:text-neon-blue transition-colors">
                        {prevProject.title}
                    </h3>
                    <span className="text-white/40 text-sm">{prevProject.category}</span>
                </Link>
                <Link href={`/projects/${nextProject.slug}`} className="p-12 md:p-20 group flex flex-col gap-4 text-right hover:bg-white/3 transition-colors">
                    <span className="font-mono text-xs text-white/30 uppercase tracking-widest">Next</span>
                    <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white group-hover:text-neon-pink transition-colors">
                        {nextProject.title}
                    </h3>
                    <span className="text-white/40 text-sm">{nextProject.category}</span>
                </Link>
            </section>
        </main>
    );
}
