"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export const CustomCursor = () => {
    const [hovered, setHovered] = useState(false);

    // Initial motion values
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    // Soft spring properties provide a very slick lag "lerp" feel globally
    const springConfig = { damping: 20, stiffness: 300, mass: 0.5 };
    const smoothX = useSpring(cursorX, springConfig);
    const smoothY = useSpring(cursorY, springConfig);

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            // Triggers interactive reaction state specifically against actionable elements
            if (
                target.tagName.toLowerCase() === "a" ||
                target.tagName.toLowerCase() === "button" ||
                target.closest("a") ||
                target.closest("button") ||
                target.closest(".group") // Specifically targets interactive project cards dynamically mapped
            ) {
                setHovered(true);
            } else {
                setHovered(false);
            }
        };

        window.addEventListener("mousemove", moveCursor);
        window.addEventListener("mouseover", handleMouseOver);

        return () => {
            window.removeEventListener("mousemove", moveCursor);
            window.removeEventListener("mouseover", handleMouseOver);
        };
    }, [cursorX, cursorY]);

    // Framer Motion automatically links the mapped layout style dependencies natively 
    return (
        <motion.div
            className="fixed top-0 left-0 w-6 h-6 rounded-full pointer-events-none z-[10000] mix-blend-screen flex items-center justify-center transition-colors duration-300"
            style={{
                x: smoothX,
                y: smoothY,
                translateX: "-50%",
                translateY: "-50%",
                backgroundColor: hovered ? "#FF003C" : "#00F0FF",
                boxShadow: hovered ? "0 0 20px 4px rgba(255,0,60,0.5)" : "0 0 10px 2px rgba(0,240,255,0.4)"
            }}
            animate={{
                scale: hovered ? 2.5 : 1,
            }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
        />
    );
};
