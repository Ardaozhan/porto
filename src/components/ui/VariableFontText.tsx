"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";

export const VariableFontText = ({ text, className = "" }: { text: string; className?: string }) => {
    const mouseX = useMotionValue(0);
    const isTouch = useRef(false);
    const [enabled, setEnabled] = useState(false);

    useEffect(() => {
        // Highly optimized check forcing hardware execution constraint exclusively to cursor-based devices
        isTouch.current = window.matchMedia("(pointer: coarse)").matches;
        setEnabled(!isTouch.current);

        if (isTouch.current) return;

        // Abstracting event listener direct tracking avoiding heavy React hydration loop interference
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX / window.innerWidth);
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX]);

    // Interpolating raw velocity mapping dynamically natively within Framer Springs 
    const smoothMouse = useSpring(mouseX, { stiffness: 60, damping: 20 });
    const fontWeight = useTransform(smoothMouse, [0, 1], [100, 900]);
    const fontStretch = useTransform(smoothMouse, [0, 1], [50, 150]);

    return (
        <motion.span
            className={`block font-sans tracking-tighter uppercase ${className}`}
            style={enabled ? { fontWeight, fontStretch: fontStretch as any } : { fontWeight: 900 }}
        >
            {text}
        </motion.span>
    );
};
