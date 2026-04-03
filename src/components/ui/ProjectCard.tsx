"use client";

import React, { useRef, useMemo, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useInView } from "framer-motion";

const fragmentShader = `
uniform sampler2D uTexture;
uniform vec2 uMouse;
uniform float uHover;
varying vec2 vUv;

void main() {
  vec2 uv = vUv;
  
  // High-performance RBG Split Math dynamically modulated by interactive hover states
  float liquidDisplacement = sin(uv.y * 10.0 + uMouse.x * 5.0) * 0.05 * uHover;
  float r = texture2D(uTexture, uv + vec2(liquidDisplacement + uMouse.x * 0.05 * uHover, uMouse.y * 0.05 * uHover)).r;
  float g = texture2D(uTexture, uv).g;
  float b = texture2D(uTexture, uv - vec2(liquidDisplacement + uMouse.x * 0.02 * uHover, uMouse.y * 0.02 * uHover)).b;
  
  // Inject calculated chromatic aberration cleanly via basic color assignment
  gl_FragColor = vec4(r, g, b, 1.0);
}
`;

const vertexShader = `
varying vec2 vUv;
uniform vec2 uMouse;
uniform float uHover;

void main() {
  vUv = uv;
  vec3 pos = position;
  
  // Wave distortion geometry calculations executed directly on the GPU utilizing distance attenuation
  float dist = distance(uv, uMouse);
  pos.z += sin(dist * 10.0 - uHover * 5.0) * 0.1 * uHover;
  
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
`;

// Decoupled specialized internal component for robust Three JS isolated React Mounting
const ShaderPlane = ({ imageSrc }: { imageSrc: string }) => {
    const material = useRef<THREE.ShaderMaterial>(null);
    const { viewport } = useThree();

    // Memoise the base texture loading bypassing React lifecycle re-instantiations
    const texture = useMemo(() => new THREE.TextureLoader().load(imageSrc), [imageSrc]);

    const [hovered, setHover] = useState(false);
    const targetHover = useRef(0);
    const mouse = useRef(new THREE.Vector2(0.5, 0.5));
    const targetMouse = useRef(new THREE.Vector2(0.5, 0.5));

    useFrame(() => {
        if (!material.current) return;

        // Abstract Spring logic interpolating state constraints linearly via Lerp logic securely 60FPS Native
        targetHover.current = THREE.MathUtils.lerp(targetHover.current, hovered ? 1 : 0, 0.1);
        mouse.current.lerp(targetMouse.current, 0.1);

        material.current.uniforms.uHover.value = targetHover.current;
        material.current.uniforms.uMouse.value = mouse.current;
    });

    return (
        <mesh
            onPointerOver={() => setHover(true)}
            onPointerOut={() => {
                setHover(false);
                targetMouse.current.set(0.5, 0.5);
            }}
            onPointerMove={(e) => {
                targetMouse.current.set(e.uv?.x || 0.5, e.uv?.y || 0.5);
            }}
        >
            <planeGeometry args={[viewport.width, viewport.height, 32, 32]} />
            <shaderMaterial
                ref={material}
                fragmentShader={fragmentShader}
                vertexShader={vertexShader}
                uniforms={{
                    uTexture: { value: texture },
                    uHover: { value: 0 },
                    uMouse: { value: new THREE.Vector2(0.5, 0.5) }
                }}
            />
        </mesh>
    );
};

export const ProjectCard = ({ project }: { project: any }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    // Extremely robust performance bypass mapping native HTML element coordinates before executing Heavy WebGL Mounts
    const isInView = useInView(containerRef, { margin: "200px" });

    return (
        <div
            ref={containerRef}
            className="group relative w-full h-[60vh] overflow-hidden cursor-pointer bg-brutalist-gray border border-white/10"
        >
            {isInView && (
                <Canvas className="absolute inset-0 z-0">
                    <ShaderPlane imageSrc={project.cover_image || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&w=800&q=80"} />
                </Canvas>
            )}

            {/* Brutalist HTML overlay masking explicitly decoupled from canvas layer enabling high accessibly scores */}
            <div className="absolute inset-0 pointer-events-none z-10 flex flex-col justify-end p-8 mix-blend-exclusion">
                <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white transition-colors group-hover:text-neon-pink drop-shadow-[0_0_10px_rgba(0,0,0,0.8)]">
                    {project.title || "Project Alpha"}
                </h2>
                <p className="font-mono text-neon-blue uppercase text-sm mt-2">{project.tags?.join(" // ") || "WEBGL // SHADERS // R3F"}</p>
            </div>
        </div>
    );
};
