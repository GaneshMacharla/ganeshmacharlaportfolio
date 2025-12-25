import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Float, Stars, Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';
import useScrollProgress from '../hooks/useScrollProgress';
import useMousePosition from '../hooks/useMousePosition';

// Floating Orb Component
function FloatingOrb({ position, color, scale = 1, speed = 1 }) {
    const meshRef = useRef();

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.x = state.clock.elapsedTime * 0.2 * speed;
            meshRef.current.rotation.y = state.clock.elapsedTime * 0.3 * speed;
        }
    });

    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
            <Sphere ref={meshRef} args={[1, 64, 64]} position={position} scale={scale}>
                <MeshDistortMaterial
                    color={color}
                    attach="material"
                    distort={0.4}
                    speed={2}
                    roughness={0.2}
                    metalness={0.8}
                />
            </Sphere>
        </Float>
    );
}

// Particle Field
function ParticleField() {
    const particlesRef = useRef();
    const { normalizedPosition } = useMousePosition();

    const particleCount = 200;

    const positions = useMemo(() => {
        const pos = new Float32Array(particleCount * 3);
        for (let i = 0; i < particleCount; i++) {
            pos[i * 3] = (Math.random() - 0.5) * 30;
            pos[i * 3 + 1] = (Math.random() - 0.5) * 30;
            pos[i * 3 + 2] = (Math.random() - 0.5) * 30;
        }
        return pos;
    }, []);

    useFrame((state) => {
        if (particlesRef.current) {
            particlesRef.current.rotation.x = state.clock.elapsedTime * 0.02;
            particlesRef.current.rotation.y = state.clock.elapsedTime * 0.03;

            // Mouse interaction
            particlesRef.current.rotation.x += normalizedPosition.y * 0.001;
            particlesRef.current.rotation.y += normalizedPosition.x * 0.001;
        }
    });

    return (
        <points ref={particlesRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={particleCount}
                    array={positions}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.05}
                color="#8b5cf6"
                transparent
                opacity={0.6}
                sizeAttenuation
            />
        </points>
    );
}

// Animated Torus
function AnimatedTorus({ position }) {
    const meshRef = useRef();

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.x = state.clock.elapsedTime * 0.3;
            meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
        }
    });

    return (
        <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
            <mesh ref={meshRef} position={position}>
                <torusKnotGeometry args={[0.8, 0.3, 100, 16]} />
                <meshStandardMaterial
                    color="#6366f1"
                    roughness={0.3}
                    metalness={0.7}
                    emissive="#6366f1"
                    emissiveIntensity={0.2}
                />
            </mesh>
        </Float>
    );
}

// Main Scene
function Scene3D() {
    const { scrollProgress } = useScrollProgress();
    const groupRef = useRef();
    const { camera } = useThree();

    // Scroll-based camera movement
    useFrame(() => {
        if (groupRef.current) {
            // Subtle rotation based on scroll
            groupRef.current.rotation.y = scrollProgress * Math.PI * 0.5;

            // Camera Z position based on scroll
            const targetZ = 10 - scrollProgress * 3;
            camera.position.z += (targetZ - camera.position.z) * 0.02;
        }
    });

    return (
        <>
            {/* Ambient and Directional Lighting */}
            <ambientLight intensity={0.3} />
            <directionalLight position={[10, 10, 5]} intensity={1} color="#ffffff" />
            <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#8b5cf6" />
            <pointLight position={[5, 5, 5]} intensity={0.8} color="#6366f1" />

            {/* Stars Background */}
            <Stars
                radius={100}
                depth={50}
                count={5000}
                factor={4}
                saturation={0}
                fade
                speed={0.5}
            />

            {/* Main Group */}
            <group ref={groupRef}>
                {/* Floating Orbs */}
                <FloatingOrb position={[-4, 2, -5]} color="#6366f1" scale={0.8} speed={1} />
                <FloatingOrb position={[4, -2, -3]} color="#8b5cf6" scale={0.6} speed={1.2} />
                <FloatingOrb position={[-3, -3, -4]} color="#a78bfa" scale={0.5} speed={0.8} />
                <FloatingOrb position={[5, 3, -6]} color="#c4b5fd" scale={0.4} speed={1.5} />

                {/* Torus Knot */}
                <AnimatedTorus position={[6, 0, -8]} />

                {/* Particle Field */}
                <ParticleField />
            </group>
        </>
    );
}

export default Scene3D;
