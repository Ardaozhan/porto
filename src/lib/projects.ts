export interface Project {
    id: number;
    slug: string;
    title: string;
    subtitle: string;
    category: string;
    year: string;
    tags: string[];
    imageSrc: string;
    images: string[];
    description: string;
    challenge: string;
    solution: string;
    accentColor: "blue" | "pink";
    lottieColor: string;
}

export const PROJECTS: Project[] = [
    {
        id: 1,
        slug: "void-observer",
        title: "Void Observer",
        subtitle: "Interactive Data Visualization",
        category: "Interactive",
        year: "2024",
        tags: ["WebGL", "GLSL", "React", "Three.js"],
        imageSrc: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1557682224-5b8590cd9ec5?q=80&w=2629&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?q=80&w=2670&auto=format&fit=crop",
        ],
        description: "An immersive data visualization experience that transforms abstract datasets into living, breathing visual fields. Each data point becomes a particle in a galaxy-scale simulation.",
        challenge: "The core challenge was rendering 500,000+ particles at 60FPS while maintaining full interactivity on mid-range hardware.",
        solution: "Custom GLSL shaders running directly on the GPU, bypassing JavaScript entirely for particle physics. CPU only handles user input state transitions.",
        accentColor: "blue",
        lottieColor: "#00F0FF",
    },
    {
        id: 2,
        slug: "neon-pulse",
        title: "Neon Pulse",
        subtitle: "Brand Identity System",
        category: "Branding",
        year: "2024",
        tags: ["Identity", "Typography", "Motion Design", "Print"],
        imageSrc: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2670&auto=format&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2670&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1614854262318-831574f15f1f?q=80&w=2670&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=2564&auto=format&fit=crop",
        ],
        description: "A full visual identity system for an underground music collective built entirely around kinetic typography and neon chromatic principles. Every touchpoint — digital, print, environmental — treated as a canvas.",
        challenge: "Creating a brand that works equally across LED displays in dark clubs and on white printed posters lit by daylight.",
        solution: "Dual-tone system: a dark-native palette with luminescent accents flips to a high-contrast reverse mode for print contexts, with no loss of brand legibility.",
        accentColor: "pink",
        lottieColor: "#FF003C",
    },
    {
        id: 3,
        slug: "kinetics",
        title: "Kinetics",
        subtitle: "Motion Language Experiment",
        category: "WebGL",
        year: "2023",
        tags: ["WebGL", "Canvas API", "Framer Motion", "Generative Art"],
        imageSrc: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=2574&auto=format&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=2574&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?q=80&w=2670&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=2670&auto=format&fit=crop",
        ],
        description: "An exploration of movement as a design element. Kinetics is a generative art system that produces unique motion signatures — no two sessions are identical. Built to challenge the boundary between design and code.",
        challenge: "How do you design a system that outputs beautiful work 100% of the time, while never producing the same output twice?",
        solution: "A constrained randomness engine with curated probability curves ensures outputs always fall within an aesthetically validated range, while variance guarantees uniqueness.",
        accentColor: "blue",
        lottieColor: "#00F0FF",
    },
    {
        id: 4,
        slug: "system-break",
        title: "System Break",
        subtitle: "Experimental UI Framework",
        category: "UI/UX",
        year: "2023",
        tags: ["UI Design", "Interaction Design", "Prototype", "Systems"],
        imageSrc: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2670&auto=format&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2670&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=2670&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=2574&auto=format&fit=crop",
        ],
        description: "A design system that deliberately breaks conventional UI patterns to create tension and engagement. Buttons that resist before submitting. Forms that glitch. Navigation that breathes. An experiment in making digital interfaces feel alive.",
        challenge: "Users are conditioned to expect standard UI patterns. Breaking them risks confusion. The challenge was being disruptive without being unusable.",
        solution: "Each unconventional element was paired with a strong affordance hint — micro-animations that communicate intent before the user acts, ensuring the experience feels surprising but never confusing.",
        accentColor: "pink",
        lottieColor: "#FF003C",
    },
    {
        id: 5,
        slug: "carbon-print",
        title: "Carbon Print",
        subtitle: "Sustainable Packaging Design",
        category: "Print Design",
        year: "2023",
        tags: ["Packaging", "Print", "Sustainability", "Illustration"],
        imageSrc: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=2670&auto=format&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=2670&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1553356084-58ef4a67b2a7?q=80&w=2574&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1541963463532-d68292c34b19?q=80&w=2688&auto=format&fit=crop",
        ],
        description: "Packaging design line for a zero-waste cosmetics brand. Every surface is a canvas. Botanical illustration meets technical data visualization to communicate the science of sustainability.",
        challenge: "Communicating complex carbon footprint data on packaging without it feeling clinical or overwhelming to the consumer.",
        solution: "Data-as-illustration approach: emissions charts become organic shapes, supply chain maps become botanical drawings. Science disguised as art.",
        accentColor: "blue",
        lottieColor: "#00F0FF",
    },
];

export function getProjectBySlug(slug: string): Project | undefined {
    return PROJECTS.find((p) => p.slug === slug);
}
