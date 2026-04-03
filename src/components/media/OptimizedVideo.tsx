import React from "react";

interface OptimizedVideoProps {
    src: string;
    poster?: string;
    className?: string;
}

export const OptimizedVideo = ({ src, poster, className = "" }: OptimizedVideoProps) => {
    return (
        <div className={`relative w-full h-full overflow-hidden bg-brutalist-gray ${className}`}>
            {/* We utilize preload="metadata" to optimize core web vitals and minimize LCP bottlenecks */}
            <video
                src={src}
                poster={poster}
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                className="w-full h-full object-cover transition-opacity duration-700 data-[loaded=true]:opacity-100 opacity-90"
            />
        </div>
    );
};
