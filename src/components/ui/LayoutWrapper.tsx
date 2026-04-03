"use client";
import React, { useState } from "react";
import { Preloader } from "./Preloader";

export const LayoutWrapper = ({ children }: { children: React.ReactNode }) => {
    const [loading, setLoading] = useState(true);

    return (
        <>
            <div className="fixed top-0 left-0 z-[99999]">
                {loading && <Preloader onComplete={() => setLoading(false)} />}
            </div>

            {/* Decoupling children opacity allowing seamless native loading unveil without re-rendering tree */}
            <div className={`transition-opacity duration-1000 ${loading ? "opacity-0" : "opacity-100"}`}>
                {children}
            </div>
        </>
    );
}
