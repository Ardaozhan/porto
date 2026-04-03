"use client";

import React, { useRef, useEffect } from "react";

export const GrainEffect = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let w = (canvas.width = window.innerWidth);
        let h = (canvas.height = window.innerHeight);

        let id: number;

        const render = () => {
            // Create monochrome noisy texture efficiently via pixel buffer manipulation
            const idata = ctx.createImageData(w, h);
            const buffer32 = new Uint32Array(idata.data.buffer);
            const len = buffer32.length;
            for (let i = 0; i < len; i++) {
                // Compute black and white stark noise calculation 
                buffer32[i] = ((255 * Math.random()) | 0) << 24 | 0x000000;
            }
            ctx.putImageData(idata, 0, 0);
            // Recursively repaint noise on animation frame for 'filmic' dynamic vibe
            id = requestAnimationFrame(render);
        };

        render();

        const handleResize = () => {
            w = canvas.width = window.innerWidth;
            h = canvas.height = window.innerHeight;
        };
        window.addEventListener("resize", handleResize);

        return () => {
            cancelAnimationFrame(id);
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-[9999] opacity-[0.03] mix-blend-difference"
        />
    );
};
