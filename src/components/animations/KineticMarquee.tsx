"use client";

import React, { useRef } from "react";
import {
    motion,
    useScroll,
    useSpring,
    useTransform,
    useMotionValue,
    useVelocity,
    useAnimationFrame
} from "framer-motion";
// Custom linear mapping wrapping logic bypassing inaccessible underlying motionone dependency structures 
const wrap = (min: number, max: number, v: number) => {
    const rangeSize = max - min;
    return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};
interface KineticMarqueeProps {
    children: string;
    baseVelocity: number;
}

export const KineticMarquee = ({ children, baseVelocity = 5 }: KineticMarqueeProps) => {
    const baseX = useMotionValue(0);

    // Track scroll velocity exclusively mapped natively on frame computations
    const { scrollY } = useScroll();
    const scrollVelocity = useVelocity(scrollY);

    // Smoothly damp the mechanical velocity utilizing strict React physics math
    const smoothVelocity = useSpring(scrollVelocity, {
        damping: 50,
        stiffness: 400
    });

    // Clamp mapping bounds explicitly preventing infinite GPU tearing while increasing exponential delta bounds
    const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
        clamp: false
    });

    const directionFactor = useRef<number>(1);

    useAnimationFrame((t, delta) => {
        let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

        // Dynamic mechanical direction switching bounds evaluating exact frame states
        if (velocityFactor.get() < 0) {
            directionFactor.current = -1;
        } else if (velocityFactor.get() > 0) {
            directionFactor.current = 1;
        }

        // Multiply native movement interpolation against user manual velocity overrides dynamically
        moveBy += directionFactor.current * moveBy * velocityFactor.get();
        baseX.set(baseX.get() + moveBy);
    });

    // Safely modularize CSS translation across an exact mapped interval loop 
    const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

    return (
        <div className="parallax overflow-hidden flex m-0 whitespace-nowrap flex-nowrap w-full mix-blend-difference pointer-events-none z-0">
            <motion.div className="scroller flex font-black uppercase text-[10vw] leading-none tracking-tighter" style={{ x }}>
                {Array.from({ length: 6 }).map((_, idx) => (
                    <span key={idx} className="block mr-12 text-transparent bg-clip-text" style={{ WebkitTextStroke: "1px rgba(255, 255, 255, 0.4)" }}>
                        {children}
                    </span>
                ))}
            </motion.div>
        </div>
    );
};
