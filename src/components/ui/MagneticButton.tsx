"use client";

import React, { useRef, useState, MouseEvent, ReactNode } from "react";
import { motion } from "framer-motion";

interface MagneticButtonProps {
    children: ReactNode;
    className?: string;
}

export const MagneticButton = ({ children, className = "" }: MagneticButtonProps) => {
    const buttonRef = useRef<HTMLButtonElement>(null);

    const [posX, setPosX] = useState(0);
    const [posY, setPosY] = useState(0);

    const handleMouseMove = (e: MouseEvent<HTMLButtonElement>) => {
        if (!buttonRef.current) return;
        const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
        const x = e.clientX - (left + width / 2);
        const y = e.clientY - (top + height / 2);

        // Magnetic framework pull ratio
        setPosX(x * 0.4);
        setPosY(y * 0.4);
    };

    const handleMouseLeave = () => {
        setPosX(0);
        setPosY(0);
    };

    return (
        <motion.button
            ref={buttonRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            animate={{ x: posX, y: posY }}
            transition={{ type: "spring", stiffness: 180, damping: 12, mass: 0.1 }}
            className={`group overflow-hidden flex items-center justify-center text-center transition-all ${className}`}
        >
            <span className="z-10 font-bold mix-blend-difference pointer-events-none w-full h-full flex items-center justify-center uppercase">
                {children}
            </span>
        </motion.button>
    );
};
