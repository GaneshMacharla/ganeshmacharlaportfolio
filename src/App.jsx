import { useState, useEffect, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Preload } from '@react-three/drei';
import Scene3D from './components/Scene3D';
import Loader from './components/Loader';
import Hero from './sections/Hero';
import About from './sections/About';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import Contact from './sections/Contact';
import Navbar from './components/Navbar';

function App() {
    const [isLoading, setIsLoading] = useState(true);
    const [loadProgress, setLoadProgress] = useState(0);

    useEffect(() => {
        // Simulate loading progress
        const interval = setInterval(() => {
            setLoadProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(() => setIsLoading(false), 500);
                    return 100;
                }
                return prev + Math.random() * 15;
            });
        }, 100);

        return () => clearInterval(interval);
    }, []);

    return (
        <>
            {/* Loading Screen */}
            <Loader isLoading={isLoading} progress={loadProgress} />

            {/* 3D Canvas Background */}
            <div className="canvas-container interactive">
                <Canvas
                    camera={{ position: [0, 0, 10], fov: 45 }}
                    dpr={[1, 2]}
                    gl={{ antialias: true, alpha: true }}
                >
                    <Suspense fallback={null}>
                        <Scene3D />
                        <Preload all />
                    </Suspense>
                </Canvas>
            </div>

            {/* Navigation */}
            <Navbar />

            {/* Main Content */}
            <main className="main-content">
                <Hero />
                <About />
                <Skills />
                <Projects />
                <Contact />
            </main>
        </>
    );
}

export default App;
