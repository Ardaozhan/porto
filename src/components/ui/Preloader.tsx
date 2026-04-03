"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const Preloader = ({ onComplete }: { onComplete: () => void }) => {
    const [progress, setProgress] = useState(0);
    const [isShattering, setIsShattering] = useState(false);
    const audioCtxRef = useRef<AudioContext | null>(null);
    const oscRef = useRef<OscillatorNode | null>(null);

    useEffect(() => {
        // Lock scroll immediately on mount
        document.body.style.overflow = "hidden";

        // Web Audio API logic (inside a safe try-catch for browsers that block auto-audio)
        try {
            const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
            const ctx = new AudioContext();
            const osc = ctx.createOscillator();
            const gainNode = ctx.createGain();

            osc.type = "square";
            osc.frequency.value = 30; // Deep mechanical brutalist hum

            osc.connect(gainNode);
            gainNode.connect(ctx.destination);

            // Start muted to prevent startling users
            gainNode.gain.setValueAtTime(0, ctx.currentTime);
            osc.start();

            audioCtxRef.current = ctx;
            oscRef.current = osc;

            // Mock loading interval scaling up
            const interval = setInterval(() => {
                setProgress((prev) => {
                    const next = prev + Math.floor(Math.random() * 4) + 1;

                    if (next >= 100) {
                        clearInterval(interval);

                        // Shatter crescendo
                        osc.frequency.setTargetAtTime(150, ctx.currentTime, 0.05);
                        gainNode.gain.setTargetAtTime(0, ctx.currentTime, 0.2); // Fades out the sound quickly

                        setIsShattering(true);
                        setTimeout(() => {
                            // Unlock document body scrolling explicitly 
                            document.body.style.overflow = "auto";
                            onComplete();
                        }, 1000); // Allow scale-up shatter animation to resolve fully
                        return 100;
                    }

                    // Map load progress functionally to escalating sound intensity
                    if (ctx.state === "running") {
                        osc.frequency.setTargetAtTime(30 + next, ctx.currentTime, 0.1);
                        gainNode.gain.setTargetAtTime(next * 0.0005, ctx.currentTime, 0.1);
                    }

                    return next;
                });
            }, 25);

            return () => {
                clearInterval(interval);
                if (oscRef.current) oscRef.current.stop();
                if (audioCtxRef.current) audioCtxRef.current.close();
                document.body.style.overflow = "auto";
            };
        } catch (e) {
            // Fallback loop if Media/Audio is blocked unconditionally
            const fallbackInterval = setInterval(() => {
                setProgress((p) => {
                    const n = p + 2;
                    if (n >= 100) {
                        clearInterval(fallbackInterval);
                        setIsShattering(true);
                        setTimeout(() => {
                            document.body.style.overflow = "auto";
                            onComplete();
                        }, 1000);
                        return 100;
                    }
                    return n;
                });
            }, 20);
            return () => clearInterval(fallbackInterval);
        }
    }, [onComplete]);

    return (
        <AnimatePresence>
            {!isShattering && (
                <motion.div
                    className="fixed inset-0 z-[99999] bg-black flex items-center justify-center overflow-hidden"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, transition: { duration: 0.8, delay: 0.5 } }}
                >
                    <motion.div
                        className="flex items-center justify-center relative mix-blend-screen"
                        animate={
                            progress === 100
                                ? { scale: 100, opacity: 0, filter: "blur(20px)" } // Shatter scale-up
                                : { scale: 1, opacity: 1, filter: "blur(0px)" }
                        }
                        transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
                    >
                        <h1 className="text-[30vw] font-black text-white leading-none tracking-tighter tabular-nums mb-8 drop-shadow-[0_0_20px_rgba(255,255,255,0.4)]">
                            {progress}
                        </h1>
                        <span className="text-[8vw] absolute top-[15%] -right-[15%] font-black text-neon-blue mix-blend-exclusion">
                            %
                        </span>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
