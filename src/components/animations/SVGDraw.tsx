"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface SVGDrawProps {
    width?: number | string;
    height?: number | string;
    viewBox?: string;
    d: string;
    color?: string;
    strokeWidth?: number;
    className?: string;
}

export const SVGDraw = ({
    width = "100%",
    height = "100%",
    viewBox = "0 0 100 100",
    d,
    color = "#FF003C", // Natively bound default Neon-Pink configuration
    strokeWidth = 2,
    className = ""
}: SVGDrawProps) => {
    const containerRef = useRef<HTMLDivElement>(null);

    // Binding scroll mappings exclusively directly to SVG root parameters
    const { scrollYProgress } = useScroll({
        target: containerRef,
        // Triggers execution mapping actively between element collision thresholds matching viewport window 
        offset: ["start end", "center center"]
    });

    // Calculate rendering interpolation strictly mapping Path drawing percentages
    const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);
    const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

    return (
        <div ref={containerRef} className={`flex items-center justify-center overflow-visible ${className}`}>
            <motion.svg
                width={width}
                height={height}
                viewBox={viewBox}
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ opacity }}
                className="overflow-visible w-full h-full"
            >
                <motion.path
                    d={d}
                    stroke={color}
                    strokeWidth={strokeWidth}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    // Mapped directly abstracting SVG properties gracefully circumventing the React tree updates sequentially allowing 60FPS raw output 
                    style={{ pathLength }}
                />
            </motion.svg>
        </div>
    );
};
