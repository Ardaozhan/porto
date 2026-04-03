"use client";

import React from "react";
import dynamic from "next/dynamic";

// Dynamically import Lottie to prevent it from blocking the main thread during initial load (FID/INP optimization)
const Lottie = dynamic(() => import("lottie-react"), {
    ssr: false,
    loading: () => (
        <div className="w-full h-full flex items-center justify-center bg-white/5 animate-pulse rounded-md">
            <span className="text-[10px] font-mono text-white/30 uppercase tracking-widest">Loading Animation...</span>
        </div>
    )
});

interface LottiePlayerProps {
    animationData: unknown;
    className?: string;
}

export const LottiePlayer = ({ animationData, className = "" }: LottiePlayerProps) => {
    return (
        <div className={`relative w-full h-full ${className}`}>
            <Lottie animationData={animationData} loop={true} autoplay={true} className="w-full h-full" />
        </div>
    );
};
