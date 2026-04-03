"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { LottiePlayer } from "@/components/media/LottiePlayer";
import { LOTTIE_WAVE, LOTTIE_CHECKMARK } from "@/lib/lottie-animations";
import { FadeInUp } from "@/components/animations/MotionWrappers";
import { TextScramble } from "@/components/animations/TextScramble";

const CONTACT_LINKS = [
    { label: "Instagram", handle: "@studio.vx", href: "https://instagram.com" },
    { label: "Dribbble", handle: "@creativevx", href: "https://dribbble.com" },
    { label: "LinkedIn", handle: "Creative Studio VX", href: "https://linkedin.com" },
    { label: "Email", handle: "hello@creativevx.com", href: "mailto:hello@creativevx.com" },
];

type FormState = "idle" | "sending" | "sent";

export default function ContactPage() {
    const [formState, setFormState] = useState<FormState>("idle");
    const [fields, setFields] = useState({ name: "", email: "", project: "", message: "" });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setFormState("sending");
        setTimeout(() => setFormState("sent"), 1500);
    };

    return (
        <main className="min-h-screen flex flex-col bg-dark-base" style={{ position: "relative" }}>

            {/* Header */}
            <section className="pt-40 pb-16 px-8 md:px-16 border-b border-white/10">
                <FadeInUp>
                    <span className="font-mono text-xs text-neon-pink tracking-widest uppercase block mb-6">// Contact</span>
                    <h1 className="text-[12vw] font-black uppercase tracking-tighter leading-[0.85] text-white">
                        <TextScramble text="Start a" />
                        <br />
                        <span className="text-transparent" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.3)" }}>
                            <TextScramble text="Dialogue" />
                        </span>
                    </h1>
                </FadeInUp>
            </section>

            {/* Main grid */}
            <section className="flex-1 grid md:grid-cols-2">

                {/* Form Side */}
                <div className="p-8 md:p-16 border-r border-white/10">
                    {formState === "sent" ? (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="h-full flex flex-col items-center justify-center gap-8 py-32"
                        >
                            <div className="w-24 h-24">
                                <LottiePlayer animationData={LOTTIE_CHECKMARK} />
                            </div>
                            <p className="font-black text-3xl uppercase tracking-tighter text-white">Message Received</p>
                            <p className="text-white/40 font-mono text-sm text-center">I'll get back to you within 24–48 hours.</p>
                            <button
                                onClick={() => { setFormState("idle"); setFields({ name: "", email: "", project: "", message: "" }); }}
                                className="font-mono text-xs text-neon-blue uppercase tracking-widest border-b border-neon-blue pb-1 hover:opacity-60 transition-opacity"
                            >
                                Send Another
                            </button>
                        </motion.div>
                    ) : (
                        <form onSubmit={handleSubmit} className="flex flex-col gap-10 pt-8">
                            {[
                                { id: "name", label: "Your Name", type: "text", placeholder: "Alex Smith" },
                                { id: "email", label: "Email Address", type: "email", placeholder: "alex@studio.com" },
                                { id: "project", label: "Project Type", type: "text", placeholder: "Brand Identity / Web / Motion" },
                            ].map((field) => (
                                <div key={field.id} className="flex flex-col gap-2">
                                    <label className="font-mono text-xs text-white/30 uppercase tracking-widest">{field.label}</label>
                                    <input
                                        type={field.type}
                                        placeholder={field.placeholder}
                                        value={fields[field.id as keyof typeof fields]}
                                        onChange={(e) => setFields((prev) => ({ ...prev, [field.id]: e.target.value }))}
                                        className="appearance-none bg-transparent border-b border-white/10 py-4 text-white text-lg placeholder-white/20 focus:outline-none focus:border-neon-pink transition-colors"
                                        required
                                    />
                                </div>
                            ))}
                            <div className="flex flex-col gap-2">
                                <label className="font-mono text-xs text-white/30 uppercase tracking-widest">Message</label>
                                <textarea
                                    placeholder="Tell me about your project..."
                                    rows={5}
                                    value={fields.message}
                                    onChange={(e) => setFields((prev) => ({ ...prev, message: e.target.value }))}
                                    className="appearance-none bg-transparent border-b border-white/10 py-4 text-white text-lg placeholder-white/20 focus:outline-none focus:border-neon-pink transition-colors resize-none"
                                    required
                                />
                            </div>

                            <div className="flex items-center gap-8 pt-4">
                                <MagneticButton
                                    className="w-36 h-36 rounded-full border border-neon-blue text-neon-blue text-xs font-mono tracking-widest uppercase hover:bg-neon-blue hover:text-dark-base hover:shadow-[0_0_40px_#00F0FF] transition-all"
                                >
                                    {formState === "sending" ? "Sending..." : "Send Log"}
                                </MagneticButton>
                                <p className="text-white/20 text-xs font-mono leading-relaxed max-w-[180px]">
                                    All inquiries answered within 48 hours.
                                </p>
                            </div>
                        </form>
                    )}
                </div>

                {/* Links Side */}
                <div className="p-8 md:p-16 flex flex-col gap-16">
                    <FadeInUp delay={0.3}>
                        <span className="font-mono text-xs text-white/30 tracking-widest uppercase block mb-10">// Find Me</span>
                        <div className="flex flex-col">
                            {CONTACT_LINKS.map((link, i) => (
                                <a
                                    key={link.label}
                                    href={link.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group flex items-center justify-between py-6 border-b border-white/10 hover:border-white/30 transition-colors"
                                >
                                    <div className="flex flex-col">
                                        <span className="font-mono text-xs text-white/30 uppercase tracking-widest mb-1">{link.label}</span>
                                        <span className="text-white text-xl font-bold group-hover:text-neon-blue transition-colors">{link.handle}</span>
                                    </div>
                                    <span className="text-white/20 group-hover:text-neon-blue transition-all group-hover:translate-x-1">→</span>
                                </a>
                            ))}
                        </div>
                    </FadeInUp>

                    {/* Ambient Lottie wave */}
                    <FadeInUp delay={0.5} className="flex flex-col gap-4">
                        <div className="w-full h-16 opacity-40">
                            <LottiePlayer animationData={LOTTIE_WAVE} />
                        </div>
                        <p className="text-white/20 font-mono text-xs leading-relaxed">
                            Based in Istanbul. Available for global remote collaboration and on-site projects across Europe.
                        </p>
                    </FadeInUp>
                </div>
            </section>
        </main>
    );
}
