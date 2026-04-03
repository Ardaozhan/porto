"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { RevealText } from "../animations/MotionWrappers";
import { LottiePlayer } from "../media/LottiePlayer";
import { OptimizedVideo } from "../media/OptimizedVideo";

const animationBack = { v: "5.5.2", fr: 60, ip: 0, op: 100, w: 100, h: 100, nm: "Layer1", ddd: 0, assets: [], layers: [] };
const animationMid = { v: "5.5.2", fr: 60, ip: 0, op: 100, w: 100, h: 100, nm: "Layer2", ddd: 0, assets: [], layers: [] };
const animationFront = { v: "5.5.2", fr: 60, ip: 0, op: 100, w: 100, h: 100, nm: "Layer3", ddd: 0, assets: [], layers: [] };

export const Hero = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    });

    const parallaxSlow = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
    const parallaxMed = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const parallaxFast = useTransform(scrollYProgress, [0, 1], ["0%", "90%"]);

    return (
        <section
            ref={containerRef}
            className="relative min-h-[140vh] flex flex-col items-center justify-center overflow-hidden bg-dark-base px-4 py-32"
            style={{ position: "relative" }}
        >
            {/* Background Lottie Layer, Z-0, Slow Parallax */}
            <motion.div
                className="absolute top-[5%] left-[5%] w-[50vw] h-[50vw] z-0 opacity-10 pointer-events-none filter blur-[40px]"
                style={{ y: parallaxSlow }}
            >
                <LottiePlayer animationData={animationBack} />
            </motion.div>

            {/* Midground Parallax Lottie Layer, Z-10 Screen Blend */}
            <motion.div
                className="absolute top-[20%] right-[5%] w-[40vw] h-[40vw] z-10 opacity-20 pointer-events-none mix-blend-screen"
                style={{ y: parallaxMed }}
            >
                <LottiePlayer animationData={animationMid} />
            </motion.div>

            {/* Central Masked Graphic Component, Z-20 Fast Parallax */}
            <motion.div
                className="z-20 w-full flex flex-col items-center justify-center relative mt-32"
                style={{ y: parallaxFast }}
            >
                <h2 className="text-[2.5vw] md:text-[1.2vw] text-white/50 tracking-[0.5em] font-mono uppercase mb-[1vw] text-center">
                    <RevealText text="Elevating visual logic & aesthetics" />
                </h2>

                {/* Text-Masked Lottie Container */}
                <div className="relative w-full h-[40vh] md:h-[50vh] flex items-center justify-center mt-4">
                    {/* Linked SVG bounded perfectly to the wrapper ensures x=50% hits the geometric center */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none">
                        <defs>
                            <clipPath id="designer-mask">
                                <text x="50%" y="54%" textAnchor="middle" dominantBaseline="middle" className="text-[18vw] font-black uppercase" fontFamily="sans-serif">
                                    DESIGNER
                                </text>
                            </clipPath>
                        </defs>
                    </svg>

                    {/* Masked Internal Lottie Region. Visible only where SVG '#designer-mask' allows */}
                    <div
                        className="absolute inset-0 flex items-center justify-center mix-blend-screen"
                        style={{ clipPath: "url(#designer-mask)", WebkitClipPath: "url(#designer-mask)" }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-neon-blue to-neon-pink opacity-[0.85]" />
                        <LottiePlayer animationData={animationFront} className="absolute inset-0 w-full h-full scale-[1.5] origin-center opacity-90" />
                    </div>
                </div>
            </motion.div>

            <motion.div
                className="z-30 w-full max-w-4xl aspect-[21/9] rounded-xl bg-white/5 backdrop-blur-md border border-white/10 shadow-[0_0_30px_rgba(255,0,60,0.1)] overflow-hidden relative group mt-24"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
            >
                <OptimizedVideo
                    src="https://www.w3schools.com/html/mov_bbb.webm"
                    poster="https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=2574&auto=format&fit=crop"
                />
            </motion.div>

        </section>
    );
};
