import { useState, useEffect } from 'react';

export function useMousePosition() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [normalizedPosition, setNormalizedPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (event) => {
            setMousePosition({ x: event.clientX, y: event.clientY });

            // Normalized position (-1 to 1)
            setNormalizedPosition({
                x: (event.clientX / window.innerWidth) * 2 - 1,
                y: -(event.clientY / window.innerHeight) * 2 + 1
            });
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return { mousePosition, normalizedPosition };
}

export default useMousePosition;
