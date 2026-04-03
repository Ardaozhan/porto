"use client";

import React, { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { EffectComposer, Bloom } from "@react-three/postprocessing";

const SPACING = 100; // Accurately matches exactly 100px bounds in our global layout linear CSS Gradients
const MAX_REPULSION = 250;

const Particles = () => {
    const meshRef = useRef<THREE.InstancedMesh>(null);
    const { size } = useThree();

    const particles = useMemo(() => {
        const cols = Math.ceil(size.width / SPACING) + 2;
        const rows = Math.ceil(size.height / SPACING) + 2;

        const points = [];
        for (let i = 0; i < cols; i++) {
            for (let j = 0; j < rows; j++) {
                // Generates raw mapped grid bounding matrices uniformly across viewport natively
                const x = (i - cols / 2) * SPACING;
                const y = (j - rows / 2) * SPACING;

                points.push({ baseX: x, baseY: y, x, y, vx: 0, vy: 0 });
            }
        }
        return points;
    }, [size.width, size.height]); // Only recalculate matrices cleanly onto aggressive window resizes

    const targetMouse = useRef(new THREE.Vector2(-10000, -10000));
    const dummy = useMemo(() => new THREE.Object3D(), []);
    const activeCount = useRef(particles.length);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            // Accurately translate mouse pixels precisely into 0,0 center-mapped Orthographic bounds linearly 
            targetMouse.current.set(
                e.clientX - size.width / 2,
                -(e.clientY - size.height / 2)
            );
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [size]);

    useFrame((state, delta) => {
        if (!meshRef.current) return;

        // Performance fail-safe: automatically natively purge particles down directly reacting if FPS tanks (0.018s = ~55fps threshold max)
        if (delta > 0.019) {
            activeCount.current = Math.max(10, activeCount.current - 5);
            meshRef.current.count = activeCount.current;
        } else if (delta < 0.016 && activeCount.current < particles.length) {
            // Recover cleanly if frames restore to hyper stability
            if (Math.random() > 0.9) activeCount.current += 1;
            meshRef.current.count = activeCount.current;
        }

        // Force strict bound limit map
        const loopLimit = Math.min(activeCount.current, particles.length);

        for (let i = 0; i < loopLimit; i++) {
            const p = particles[i];

            const dx = targetMouse.current.x - p.x;
            const dy = targetMouse.current.y - p.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            // Massive raw repulsion physics loop executed across 1000 indices bypassing React state securely 
            if (dist < MAX_REPULSION) {
                const force = (MAX_REPULSION - dist) / MAX_REPULSION;
                p.vx -= (dx / dist) * force * 4;
                p.vy -= (dy / dist) * force * 4;
            }

            // Spring tension constraints mapping exactly to exact static HTML layout intersection grids 
            p.vx += (p.baseX - p.x) * 0.08;
            p.vy += (p.baseY - p.y) * 0.08;

            // Base atmospheric friction dampener bounds
            p.vx *= 0.75;
            p.vy *= 0.75;

            // Inject velocity
            p.x += p.vx;
            p.y += p.vy;

            dummy.position.set(p.x, p.y, 0);
            dummy.updateMatrix();
            meshRef.current.setMatrixAt(i, dummy.matrix);
        }

        // Declare the matrix dirty updating massive GPU array simultaneously gracefully 
        meshRef.current.instanceMatrix.needsUpdate = true;
    });

    return (
        <instancedMesh ref={meshRef} args={[undefined, undefined, particles.length]}>
            <circleGeometry args={[2.5, 12]} />
            {/* Enforce pure Neon emission visually decoupled away from environmental lights preventing dead spots */}
            <meshBasicMaterial color="#00F0FF" toneMapped={false} />
        </instancedMesh>
    );
};

export const InteractiveBackground = () => {
    return (
        <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden" style={{ width: "100%", height: "100%" }}>
            {/* Direct 1:1 screen mapping bounds yielding absolute precision alignment for our static background overlay layer securely */}
            <Canvas orthographic camera={{ zoom: 1, position: [0, 0, 100] }} dpr={[1, 1.5]} gl={{ alpha: true, antialias: false }}>
                <Particles />
                <EffectComposer enabled={true} autoClear={false}>
                    <Bloom mipmapBlur luminanceThreshold={0.2} luminanceSmoothing={0.9} intensity={2.5} />
                </EffectComposer>
            </Canvas>
        </div>
    );
};
