'use client';

import React, { useState, useEffect } from 'react';

export default function GLBViewer({ modelId = 'food' }: { modelId?: string }) {
  const [interactive, setInteractive] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [lastTap, setLastTap] = useState(0);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleTouch = () => {
    const now = Date.now();
    if (now - lastTap < 400) {
      setInteractive(true);
    }
    setLastTap(now);
  };

  return (
    <div 
      className="absolute inset-0 w-full h-full z-0 opacity-100 flex items-center justify-center"
      onTouchStart={!interactive ? handleTouch : undefined}
      onDoubleClick={() => setInteractive(true)}
    >
      <iframe 
        src={`/3d-viewer.html?model=${modelId}`} 
        className={`w-full h-full border-none bg-transparent ${isMobile && !interactive ? 'pointer-events-none' : 'pointer-events-auto'}`}
        title="3D Viewer"
      ></iframe>
      
      {isMobile && !interactive && (
        <div className="absolute bottom-24 left-1/2 -translate-x-1/2 px-5 py-2.5 bg-black/50 backdrop-blur-md rounded-full text-white text-xs border border-white/20 pointer-events-none animate-pulse whitespace-nowrap z-10">
          Touchez 2 fois pour explorer en 3D
        </div>
      )}
      
      {isMobile && interactive && (
        <button 
          onClick={() => setInteractive(false)}
          className="absolute bottom-24 left-1/2 -translate-x-1/2 px-5 py-2.5 bg-white backdrop-blur-md rounded-full text-black text-xs font-bold z-50 shadow-lg pointer-events-auto border border-black/10"
        >
          Bloquer la 3D (Pour scroller)
        </button>
      )}
    </div>
  );
}
