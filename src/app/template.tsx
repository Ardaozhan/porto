"use client";

import React, { useContext, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { LayoutRouterContext } from "next/dist/shared/lib/app-router-context.shared-runtime";

// Implements the FrozenRouter context bypass preventing immediate virtual DOM unmounting
export function FrozenRouter({ children }: { children: React.ReactNode }) {
    const context = useContext(LayoutRouterContext);
    const frozen = useRef(context).current;

    if (!frozen) {
        return <>{children}</>;
    }

    return (
        <LayoutRouterContext.Provider value={frozen}>
            {children}
        </LayoutRouterContext.Provider>
    );
}

export default function Template({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    const customBezier = [0.76, 0, 0.24, 1] as [number, number, number, number];

    // Curtain sweep motion variants using Bezier offsets explicitly designed for abrupt 'Brutalist' feels
    const curtainVariants = {
        initial: { top: "100%" },
        animate: {
            top: "-100%",
            transition: { duration: 0.6, ease: customBezier }
        },
        exit: {
            top: "0%",
            transition: { duration: 0.5, ease: customBezier }
        }
    };

    // Scale and opacity adjustments moving the Z-index gracefully backward
    const pageVariants = {
        initial: { opacity: 0.5, scale: 0.95 },
        animate: {
            opacity: 1,
            scale: 1,
            transition: { duration: 0.5, ease: customBezier, delay: 0.25 }
        },
        exit: {
            opacity: 0.5,
            scale: 0.95,
            transition: { duration: 0.5, ease: customBezier }
        }
    };

    return (
        <AnimatePresence mode="wait">
            <motion.div key={pathname} className="relative h-full w-full">
                {/* The Black Curtain Sweep Element */}
                <motion.div
                    className="fixed left-0 w-full h-[100vh] bg-black z-[9999]"
                    variants={curtainVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                />

                {/* Scaled Shrinking Document Content Wrapped Dynamically */}
                <motion.div
                    variants={pageVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="relative h-full w-full"
                >
                    <FrozenRouter>{children}</FrozenRouter>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
