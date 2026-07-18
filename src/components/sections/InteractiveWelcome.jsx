"use client";

import React, { useRef, useState, useEffect } from 'react';

const MODES = [
  { id: 'color', label: 'Color' },
  { id: 'texture', label: 'Texture' },
  { id: 'light', label: 'Light' },
];

export default function InteractiveWelcome() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const brushCanvasRef = useRef(null);
  const bufferCanvasRef = useRef(null);
  const grainPatternRef = useRef(null);

  const [activeMode, setActiveMode] = useState('color');
  const [photoLoaded, setPhotoLoaded] = useState(false);
  const photoRef = useRef(null);

  const mouseRef = useRef({ x: 0, y: 0, lastX: 0, lastY: 0, isMoving: false });

  // Load B&W photograph for Texture and Light modes
  useEffect(() => {
    const img = new Image();
    img.src = '/photography/1.jpg';
    img.onload = () => {
      photoRef.current = img;
      setPhotoLoaded(true);
    };
  }, []);

  // Pre-generate static 100x100 film grain pattern for GPU tiling
  useEffect(() => {
    const grainCanvas = document.createElement('canvas');
    grainCanvas.width = 100;
    grainCanvas.height = 100;
    const grainCtx = grainCanvas.getContext('2d');
    const imgData = grainCtx.createImageData(100, 100);
    const data = imgData.data;

    for (let i = 0; i < data.length; i += 4) {
      const val = Math.floor((Math.random() - 0.5) * 24);
      data[i] = 128 + val;     // R
      data[i + 1] = 128 + val; // G
      data[i + 2] = 128 + val; // B
      data[i + 3] = 25;        // Alpha (grain opacity)
    }

    grainCtx.putImageData(imgData, 0, 0);
    grainPatternRef.current = grainCanvas;
  }, []);

  // Handle canvas sizing and drawing loop
  useEffect(() => {
    const canvas = canvasRef.current;
    const brushCanvas = brushCanvasRef.current;
    const bufferCanvas = bufferCanvasRef.current;
    if (!canvas || !brushCanvas || !bufferCanvas) return;

    const ctx = canvas.getContext('2d');
    const brushCtx = brushCanvas.getContext('2d');
    const bufferCtx = bufferCanvas.getContext('2d');

    let animationFrameId;
    let width = 0;
    let height = 0;

    const resizeCanvas = () => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      width = containerRef.current.clientWidth || rect.width || 1100;
      height = containerRef.current.clientHeight || rect.height || 220;

      // Handle Retina displays
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      // Pre-scale offscreen canvas buffers
      brushCanvas.width = width;
      brushCanvas.height = height;
      bufferCanvas.width = width;
      bufferCanvas.height = height;

      ctx.scale(dpr, dpr);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Drawing loop
    const draw = () => {
      const mouse = mouseRef.current;

      // 1. Draw brush line segments on the offscreen canvas when the mouse moves
      if (mouse.isMoving) {
        brushCtx.strokeStyle = 'rgba(0, 0, 0, 1)';
        brushCtx.lineWidth = Math.min(width * 0.12, 64);
        brushCtx.lineCap = 'round';
        brushCtx.lineJoin = 'round';
        
        brushCtx.beginPath();
        brushCtx.moveTo(mouse.lastX, mouse.lastY);
        brushCtx.lineTo(mouse.x, mouse.y);
        brushCtx.stroke();

        mouse.lastX = mouse.x;
        mouse.lastY = mouse.y;
        mouse.isMoving = false;
      }

      // 2. Render dynamic texture content to the buffer canvas
      bufferCtx.clearRect(0, 0, width, height);

      if (activeMode === 'color') {
        // Mode 1: Color (Procedural warm light leak gradient)
        const grad = bufferCtx.createLinearGradient(0, 0, width, height);
        grad.addColorStop(0, '#D97706'); // Amber
        grad.addColorStop(0.3, '#DC2626'); // Red
        grad.addColorStop(0.65, '#4F46E5'); // Indigo
        grad.addColorStop(1, '#0F172A'); // Dark slate
        
        bufferCtx.fillStyle = grad;
        bufferCtx.fillRect(0, 0, width, height);
      } else if (activeMode === 'texture' && photoRef.current && photoLoaded) {
        // Mode 2: Texture (B&W image + tiled film grain pattern)
        bufferCtx.drawImage(photoRef.current, 0, 0, width, height);
        
        if (grainPatternRef.current) {
          const pattern = bufferCtx.createPattern(grainPatternRef.current, 'repeat');
          bufferCtx.fillStyle = pattern;
          bufferCtx.fillRect(0, 0, width, height);
        }
      } else if (activeMode === 'light' && photoRef.current && photoLoaded) {
        // Mode 3: Light (Focus/depth-of-field lens reveal)
        bufferCtx.drawImage(photoRef.current, 0, 0, width, height);
      }

      // 3. Mask the photo buffer with the persistent brush canvas
      bufferCtx.globalCompositeOperation = 'destination-in';
      bufferCtx.drawImage(brushCanvas, 0, 0);
      bufferCtx.globalCompositeOperation = 'source-over';

      // 4. Fill the remaining transparent background of the buffer canvas
      bufferCtx.globalCompositeOperation = 'destination-over';
      
      if (activeMode === 'light' && photoRef.current && photoLoaded) {
        // Blurred photo background for light focus mode
        bufferCtx.save();
        bufferCtx.filter = 'blur(12px) grayscale(100%)';
        bufferCtx.drawImage(photoRef.current, -10, -10, width + 20, height + 20);
        bufferCtx.restore();
        
        bufferCtx.fillStyle = 'rgba(15, 15, 17, 0.4)';
        bufferCtx.fillRect(0, 0, width, height);
      } else {
        // Solid white baseline background for others
        bufferCtx.fillStyle = '#FAFAFA';
        bufferCtx.fillRect(0, 0, width, height);
      }
      
      bufferCtx.globalCompositeOperation = 'source-over';

      // 5. Draw the text in solid color first, then layer the masked buffer canvas on top
      ctx.clearRect(0, 0, width, height);

      // Determine robust, device-width mapped font size to match static breakpoints
      let fontSize = 120;
      const w = window.innerWidth;
      if (w < 480) fontSize = 54;
      else if (w < 640) fontSize = 72;
      else if (w < 768) fontSize = 96;
      else if (w < 1024) fontSize = 110;
      else fontSize = 128;

      ctx.fillStyle = '#FAFAFA';
      ctx.font = `900 ${fontSize}px Geist, "Inter Tight", -apple-system, sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      
      // Draw text horizontally centered and vertically aligned in the container
      ctx.fillText('TAUFIQU', width / 2, height / 2);

      // Mask and render the dynamic artwork only inside the letters
      ctx.globalCompositeOperation = 'source-atop';
      ctx.drawImage(bufferCanvas, 0, 0);
      ctx.globalCompositeOperation = 'source-over';

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [activeMode, photoLoaded]);

  // Using native offset coordinates avoids triggering browser reflows (no getBoundingClientRect layout thrashing)
  const handleMouseMove = (e) => {
    e.preventDefault();
    const mouse = mouseRef.current;
    
    // Read pre-calculated offset coordinates directly
    const x = e.nativeEvent.offsetX;
    const y = e.nativeEvent.offsetY;

    if (!mouse.isMoving) {
      mouse.lastX = mouse.x;
      mouse.lastY = mouse.y;
    }
    
    mouse.x = x;
    mouse.y = y;
    mouse.isMoving = true;
  };

  const handleReset = () => {
    const brushCanvas = brushCanvasRef.current;
    if (brushCanvas) {
      const brushCtx = brushCanvas.getContext('2d');
      brushCtx.clearRect(0, 0, brushCanvas.width, brushCanvas.height);
    }
  };

  // Automatically reset canvas when switching modes to start fresh
  const handleModeChange = (modeId) => {
    handleReset();
    setActiveMode(modeId);
  };

  return (
    <div className="w-full flex flex-col gap-6 items-start select-none">
      {/* Dynamic Text Mask Container */}
      <div 
        ref={containerRef}
        onMouseMove={handleMouseMove}
        className="w-full relative min-h-[160px] sm:min-h-[220px] flex items-center justify-center cursor-crosshair overflow-hidden"
      >
        <canvas ref={canvasRef} className="absolute inset-0 z-10 pointer-events-none" />
        
        {/* Offscreen canvases for double buffering */}
        <canvas ref={brushCanvasRef} className="hidden" />
        <canvas ref={bufferCanvasRef} className="hidden" />

        {/* SEO / Crawler Accessibility Title */}
        <h1 className="sr-only">TAUFIQU</h1>
      </div>

      {/* Camera-inspired Lens Controller Panel */}
      <div className="flex items-center gap-5 font-mono text-[10px] tracking-wider text-zinc-500 select-none">
        <div className="flex gap-4">
          {MODES.map((mode) => {
            const isActive = activeMode === mode.id;
            return (
              <button
                key={mode.id}
                onClick={() => handleModeChange(mode.id)}
                className={`pb-1 border-b-2 font-medium interactive-transition cursor-pointer ${
                  isActive 
                    ? 'text-[#FAFAFA] border-[#2563EB]' 
                    : 'text-zinc-500 border-transparent hover:text-[#FAFAFA]'
                }`}
              >
                {mode.label}
              </button>
            );
          })}
        </div>

        <span className="text-zinc-800 select-none">/</span>

        <button 
          onClick={handleReset}
          className="pb-1 border-b-2 border-transparent font-medium hover:text-[#FAFAFA] interactive-transition cursor-pointer"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
