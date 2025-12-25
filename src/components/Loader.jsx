import { useEffect, useState } from 'react';
import './Loader.css';

function Loader({ isLoading, progress }) {
    const [displayProgress, setDisplayProgress] = useState(0);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setDisplayProgress(Math.min(Math.round(progress), 100));
        }, 50);
        return () => clearTimeout(timeout);
    }, [progress]);

    return (
        <div className={`loader ${!isLoading ? 'hidden' : ''}`}>
            <div className="loader-content">
                <div className="loader-logo">
                    <span className="logo-text">GM</span>
                    <span className="logo-dot"></span>
                </div>
                <div className="loader-text">Loading Experience</div>
                <div className="loader-bar">
                    <div
                        className="loader-progress"
                        style={{ width: `${displayProgress}%` }}
                    ></div>
                </div>
                <div className="loader-percentage">{displayProgress}%</div>
            </div>

            {/* Animated Background Elements */}
            <div className="loader-bg">
                <div className="loader-orb loader-orb-1"></div>
                <div className="loader-orb loader-orb-2"></div>
                <div className="loader-orb loader-orb-3"></div>
            </div>
        </div>
    );
}

export default Loader;
