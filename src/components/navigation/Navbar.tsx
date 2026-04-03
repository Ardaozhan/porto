import Link from "next/link";
import React from "react";

export const Navbar = () => {
    return (
        <nav className="fixed top-0 left-0 w-full p-8 z-[100] flex justify-between items-center pointer-events-auto mix-blend-difference">
            <Link href="/" className="text-white font-black text-2xl tracking-tighter hover:text-neon-pink transition-colors" prefetch={true}>
                FOUNDER
            </Link>
            <div className="flex gap-8 text-sm font-mono tracking-widest text-white/70 uppercase">
                {/* Implementing prefetch boundaries natively allowing seamless fast Curtain transitions */}
                <Link href="/projects" className="hover:text-neon-blue transition-colors" prefetch={true}>Archive</Link>
                <Link href="/profile" className="hover:text-neon-blue transition-colors" prefetch={true}>Manifesto</Link>
                <Link href="/contact" className="hover:text-neon-pink transition-colors font-bold" prefetch={true}>Connect</Link>
            </div>
        </nav>
    );
}
