"use client";

import React, { useRef, useEffect } from "react";
import { useInView } from "framer-motion";

export const SectionInvertTrigger = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => {
    const containerRef = useRef<HTMLDivElement>(null);

    // Strict center constraints utilizing native Intersection Observers intercepting brutalist offset mappings
    const isInView = useInView(containerRef, { margin: "-45% 0px -45% 0px" });

    useEffect(() => {
        if (isInView) {
            document.body.classList.add("theme-inverted");
        } else {
            document.body.classList.remove("theme-inverted");
        }
    }, [isInView]);

    return (
        <div ref={containerRef} className={`relative z-10 ${className}`}>
            {children}
        </div>
    );
};
