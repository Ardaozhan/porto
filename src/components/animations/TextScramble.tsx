"use client";

import React, { useState, useEffect, useRef } from "react";
import { useInView } from "framer-motion";

const CHARACTERS = "!@#$%^&*()_+={}[]|\\;':\",.<>/?`~1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

interface TextScrambleProps {
    text: string;
    className?: string;
    triggerOnHover?: boolean;
}

export const TextScramble = ({ text, className = "", triggerOnHover = false }: TextScrambleProps) => {
    const [displayText, setDisplayText] = useState(text);
    const containerRef = useRef<HTMLSpanElement>(null);

    // Use Framer intersection observer to strictly trigger decode sequence once initially inside viewport
    const isInView = useInView(containerRef, { once: true, margin: "-100px" });
    const [isScrambling, setIsScrambling] = useState(false);
    const [hasScrambledOnView, setHasScrambledOnView] = useState(false);

    const scramble = () => {
        if (isScrambling) return;
        setIsScrambling(true);

        let iteration = 0;
        const interval = setInterval(() => {
            setDisplayText(
                text
                    .split("")
                    .map((char, index) => {
                        // Keep native whitespace bounds formatting perfectly intact
                        if (char === " ") return " ";

                        // Decoded characters lock cleanly in place gracefully behind the iteration limit
                        if (index < iteration) return char;

                        // Generate mechanical glitch fragments ahead of the decode pipeline
                        return CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
                    })
                    .join("")
            );

            // Increment fractional interpolation ensuring longer randomized symbol delays yielding cinematic brutalist pacing
            if (iteration >= text.length) {
                clearInterval(interval);
                setIsScrambling(false);
            }
            iteration += 1 / 3;
        }, 20); // Extremely rapidly fire bounds logic avoiding DOM main thread lagging
    };

    useEffect(() => {
        if (isInView && !hasScrambledOnView) {
            scramble();
            setHasScrambledOnView(true);
        }
    }, [isInView]); // Execute natively inside React hydration bindings solely bounded to interaction thresholds

    return (
        <span
            ref={containerRef}
            className={`inline-block font-mono ${className}`}
            onMouseEnter={() => triggerOnHover && scramble()}
        >
            {displayText}
        </span>
    );
};
