"use client";

import React, { useRef, useEffect } from "react";

interface ImageRevealProps {
    baseImage: string;
    wireframeImage?: string;
    className?: string;
    radius?: number;
}

export const ImageReveal = ({ baseImage, wireframeImage, className = "", radius = 150 }: ImageRevealProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const wireframeRef = useRef<HTMLDivElement>(null);

    // Strictly executing completely outside React's Render cycle maximizing tracking loop framerates natively
    useEffect(() => {
        const container = containerRef.current;
        const wireframe = wireframeRef.current;
        if (!container || !wireframe) return;

        let rafId: number;
        // Map initial states wildly off-screen preventing flash intersections prior to cursor collision
        let targetX = -10000;
        let targetY = -10000;

        const onMouseMove = (e: MouseEvent) => {
            const rect = container.getBoundingClientRect();
            targetX = e.clientX - rect.left;
            targetY = e.clientY - rect.top;
        };

        const onMouseLeave = () => {
            targetX = -10000;
            targetY = -10000;
        };

        const updateMask = () => {
            // 100% bounded explicit color-stops mathematically destroying any arbitrary browser gradient feathering
            const maskStr = `radial-gradient(${radius}px circle at ${targetX}px ${targetY}px, black 0%, black 100%, transparent 100%)`;
            wireframe.style.maskImage = maskStr;
            wireframe.style.webkitMaskImage = maskStr;

            rafId = requestAnimationFrame(updateMask);
        };

        container.addEventListener("mousemove", onMouseMove);
        container.addEventListener("mouseleave", onMouseLeave);

        // Kickstart the hardware tracking 60FPS loop
        rafId = requestAnimationFrame(updateMask);

        return () => {
            container.removeEventListener("mousemove", onMouseMove);
            container.removeEventListener("mouseleave", onMouseLeave);
            cancelAnimationFrame(rafId);
        };
    }, [radius]);

    return (
        <div ref={containerRef} className={`relative overflow-hidden w-full h-full bg-brutalist-gray border border-white/10 ${className}`}>
            {/* Base Render */}
            <img
                src={baseImage}
                alt="Static Base"
                className="w-full h-full object-cover pointer-events-none"
            />

            {/* Architectural Reveal Mask */}
            <div
                ref={wireframeRef}
                className="absolute inset-0 z-10 pointer-events-none"
                style={{
                    willChange: "mask-image, -webkit-mask-image",
                    maskImage: `radial-gradient(circle ${radius}px at -1000px -1000px, black 100%, transparent 100%)`,
                    WebkitMaskImage: `radial-gradient(circle ${radius}px at -1000px -1000px, black 100%, transparent 100%)`
                }}
            >
                {wireframeImage ? (
                    <img src={wireframeImage} alt="Wireframe" className="w-full h-full object-cover" />
                ) : (
                    // Natively fallback onto CSS filter architecture calculating neon-blue blueprint offsets seamlessly on raw source images
                    <div className="w-full h-full bg-[#00F0FF]/10 mix-blend-screen">
                        <img
                            src={baseImage}
                            alt="Digital Blueprint Emulation"
                            className="w-full h-full object-cover mix-blend-color-burn"
                            style={{
                                filter: "invert(1) sepia(1) saturate(5) hue-rotate(180deg) contrast(2) brightness(1.2)"
                            }}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};
