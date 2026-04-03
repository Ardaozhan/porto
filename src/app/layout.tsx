import type { Metadata } from "next";
import "./globals.css";
import { CustomCursor } from "@/components/cursor/CustomCursor";
import { GrainEffect } from "@/components/canvas/GrainEffect";
import { Navbar } from "@/components/navigation/Navbar";
import { LayoutWrapper } from "@/components/ui/LayoutWrapper";
import { InteractiveBackground } from "@/components/canvas/InteractiveBackground";

// Metadata configuration for SEO
export const metadata: Metadata = {
  title: "Graphic Designer | Brutalist Portfolio",
  description: "Awwwards-winning graphic designer portfolio exploring brutalism and minimalism with neon accents.",
  keywords: ["Graphic Designer", "Portfolio", "Brutalism", "Awwwards", "Minimalism"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark cursor-none">
      {/* 
        The body implements strict dark mode defaulting to dark-base (#0A0A0A)
        and white text. It provides a clean, minimal HTML structure.
      */}
      <body className="bg-dark-base text-white antialiased min-h-screen cursor-none border-x border-white/10 max-w-[100vw]">
        {/* Native absolute strictly locked blueprint layout bounding box mappings globally executed */}
        <div className="fixed inset-0 pointer-events-none z-[-2] bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:100px_100px]" />

        <InteractiveBackground />

        <GrainEffect />
        <CustomCursor />
        <Navbar />
        <LayoutWrapper>
          {children}
        </LayoutWrapper>
      </body>
    </html>
  );
}
