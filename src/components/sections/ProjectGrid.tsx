"use client";

import React from "react";
import Link from "next/link";
import { FadeInUp } from "../animations/MotionWrappers";
import { ProjectCard } from "../ui/ProjectCard";
import { PROJECTS } from "@/lib/projects";
import { KineticMarquee } from "../animations/KineticMarquee";

export const ProjectGrid = () => {
    return (
        <section className="py-24 px-4 md:px-12 bg-dark-base min-h-screen">
            <div className="max-w-[1400px] mx-auto">

                {/* Section Header */}
                <FadeInUp className="mb-24 flex items-end justify-between border-b border-white/10 pb-8">
                    <div>
                        <span className="text-neon-pink font-mono text-sm tracking-widest uppercase mb-4 block">Idx / 01</span>
                        <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter text-white mix-blend-difference">
                            Selected Work
                        </h2>
                    </div>
                    <Link href="/projects" className="hidden md:flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-white/40 hover:text-neon-blue transition-colors group">
                        View All
                        <span className="w-8 h-px bg-current group-hover:w-16 transition-all" />
                    </Link>
                </FadeInUp>

                {/* Asymmetrical Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-32">
                    {PROJECTS.slice(0, 4).map((project, idx) => {
                        const isOdd = idx % 2 !== 0;
                        return (
                            <FadeInUp
                                key={project.id}
                                className={`w-full ${isOdd ? "md:mt-40" : ""}`}
                                delay={0.1}
                            >
                                <Link href={`/projects/${project.slug}`} className="block group">
                                    <ProjectCard project={{
                                        title: project.title,
                                        tags: [project.category, project.year],
                                        cover_image: project.imageSrc
                                    }} />
                                </Link>
                            </FadeInUp>
                        );
                    })}
                </div>

                {/* Marquee separator */}
                <div className="mt-32 border-t border-b border-white/10 py-4 overflow-hidden">
                    <KineticMarquee baseVelocity={2}>BRANDING // MOTION // WEBGL // TYPOGRAPHY // IDENTITY // SYSTEMS //</KineticMarquee>
                </div>

                {/* CTA */}
                <FadeInUp className="mt-16 flex justify-center">
                    <Link href="/projects" className="group font-mono text-sm uppercase tracking-widest text-white/40 hover:text-white transition-colors flex items-center gap-4">
                        <span className="w-12 h-px bg-current group-hover:w-24 transition-all" />
                        See Full Archive ({PROJECTS.length} Projects)
                        <span className="w-12 h-px bg-current group-hover:w-24 transition-all" />
                    </Link>
                </FadeInUp>
            </div>
        </section>
    );
};

