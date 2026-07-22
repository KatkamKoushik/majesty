'use client';
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

// ─── Constants ────────────────────────────────────────────────────────────────
const TOTAL_FRAMES = 241; // frame_0000.webp → frame_0240.webp

// ╔══════════════════════════════════════════════════════════════════════════╗
// ║  CACHE-BUSTING VERSION STRING                                           ║
// ║  Change this value whenever you replace frames on disk.                 ║
// ║  The browser treats "?v=updated_v1" as a new URL, bypassing the cache.  ║
// ╚══════════════════════════════════════════════════════════════════════════╝
const CACHE_BUST = '?v=updated_v1';

/** Build the full URL for a given frame index, including the cache-bust query. */
function frameUrl(index: number): string {
  // CACHE-BUSTING: appending CACHE_BUST forces the browser to bypass its
  // cached copy and download the newly rendered frame from the server.
  return `/webp_frames/frame_${String(index).padStart(4, '0')}.webp${CACHE_BUST}`;
}

const heroImages = [
  '/dishes/chicken juicy mandi.png',
  '/dishes/mutton juicy mandi.png',
  '/dishes/fish platter mandi.png',
  '/dishes/chicken full mandi.png',
  '/dishes/chicken broasted mandi.png',
  '/dishes/chicken crispy mandi.png',
  '/dishes/chicken faham mandi.png',
  '/dishes/chicken fry mandi.png',
  '/dishes/chicken madfoon mandi.png',
  '/dishes/mutton fry mandi.png',
  '/dishes/fish fry mandi.png',
  '/dishes/prawns juicy Mandi.png',
  '/dishes/paneer fry mandi.png',
];

export function CanvasHero() {
  const [isLoading, setIsLoading] = useState(true);

  // Canvas & scroll container refs
  const canvasRef          = useRef<HTMLCanvasElement | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  // In-memory image store — all 241 HTMLImageElements live here after preload
  const imagesRef  = useRef<HTMLImageElement[]>([]);
  // Track which frame index is currently painted to avoid redundant draws
  const activeFrame = useRef<number>(0);
  // rAF guard: prevents queuing more than one animation frame per scroll burst
  const rafPending  = useRef<boolean>(false);

  // Rotating hero dish image displayed in the section below the canvas
  const [currentHeroIdx, setCurrentHeroIdx] = useState(0);

  // ─── Draw a single frame onto the <canvas> ──────────────────────────────
  const drawFrame = (frameIdx: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = imagesRef.current[frameIdx];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    // Resize the canvas buffer lazily to match intrinsic image dimensions
    if (canvas.width !== img.naturalWidth || canvas.height !== img.naturalHeight) {
      canvas.width  = img.naturalWidth  || 1920;
      canvas.height = img.naturalHeight || 1080;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  };

  // ─── Preload all 241 frames eagerly via new Image() ─────────────────────
  useEffect(() => {
    const images: HTMLImageElement[] = new Array(TOTAL_FRAMES);

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new window.Image();

      // CACHE-BUSTING: frameUrl() appends ?v=updated_v1 so the browser
      // fetches fresh files instead of serving stale cached versions.
      img.src = frameUrl(i);

      const capturedIdx = i; // capture loop variable in closure
      img.onload = () => {
        // Repaint if this frame is the one currently active during loading
        if (activeFrame.current === capturedIdx) {
          drawFrame(capturedIdx);
        }
        // Paint frame 0 as soon as it's ready so the canvas is never blank
        if (capturedIdx === 0 && activeFrame.current === 0) {
          drawFrame(0);
        }
      };

      images[i] = img;
    }

    imagesRef.current = images;

    // If frame 0 was cached and already complete, draw it synchronously
    if (images[0]?.complete) drawFrame(0);

    const timer = setTimeout(() => setIsLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // ─── Scroll → frame-index mapping (rAF-throttled) ───────────────────────
  useEffect(() => {
    const handleScroll = () => {
      // Throttle with requestAnimationFrame — never exceeds 60 fps draw rate
      if (rafPending.current) return;
      rafPending.current = true;

      requestAnimationFrame(() => {
        rafPending.current = false;

        const container = scrollContainerRef.current;
        if (!container) return;

        const rect        = container.getBoundingClientRect();
        const scrollRange = rect.height - window.innerHeight; // total scrollable px
        if (scrollRange <= 0) return;

        // progress: 0 at section top → 1 at section bottom
        let progress = -rect.top / scrollRange;
        progress = Math.max(0, Math.min(1, progress));

        // Map [0, 1] → [0, TOTAL_FRAMES − 1]
        const frameIndex = Math.min(
          Math.floor(progress * TOTAL_FRAMES),
          TOTAL_FRAMES - 1
        );

        if (activeFrame.current !== frameIndex) {
          activeFrame.current = frameIndex;
          drawFrame(frameIndex);
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // paint correct frame on mount / browser back-navigation

    return () => window.removeEventListener('scroll', handleScroll);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // ─── Rotating dish image ──────────────────────────────────────────────────
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroIdx(prev => (prev + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* ═══════════════ CINEMATIC PRELOADER (THE AURA) ═══════════════ */}
      {isLoading && (
        <div className="fixed inset-0 bg-[#0A0A0B] z-[999] flex items-center justify-center transition-opacity duration-700">
          <div className="flex flex-col items-center gap-6">
            <div className="relative w-32 h-32 rounded-full border-2 border-[#DFB15B] shadow-[0_0_50px_10px_rgba(223,177,91,0.6)] animate-pulse overflow-hidden">
              <Image src="/brand/logo.jpg" alt="Majesty Mandi House Logo" fill className="object-cover" sizes="128px" priority />
            </div>
            <span className="text-[#DFB15B] font-serif text-xl tracking-[0.3em] uppercase animate-pulse">Majesty</span>
          </div>
        </div>
      )}

      {/* ═══════════════ SCROLL-BOUND CANVAS SECTION ═══════════════════
          500vh gives comfortable scrolling room for all 241 frames.
          The inner div is sticky so the canvas stays pinned to the
          viewport while the parent scrolls behind it.
      ════════════════════════════════════════════════════════════════ */}
      <div ref={scrollContainerRef} className="relative w-full h-[500vh] bg-[#0A0A0B]">
        <div className="sticky top-0 w-full h-[100dvh] flex items-center justify-center pointer-events-none">
          <canvas
            ref={canvasRef}
            className="w-full h-full object-contain mix-blend-screen portrait:scale-[1.8] landscape:scale-100"
          />
        </div>
      </div>

      {/* ═══════════════ HERO TEXT SECTION ═══════════════ */}
      <section className="w-full py-12 md:py-20 flex flex-col items-center justify-center text-center px-4 sm:px-6 md:px-12 relative overflow-hidden bg-[#0A0A0B]">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#161618] pointer-events-none z-10" />
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="flex flex-col items-center z-20 w-full"
        >
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-serif mb-3 sm:mb-4 text-white leading-tight">...TASTE THE LEGACY...</h2>
          <p className="text-sm sm:text-base md:text-lg text-neutral-400 mb-8 sm:mb-12 max-w-lg px-2">Experience the ultimate authentic Arabian dining right here in Hanamkonda.</p>
          <div className="w-full max-w-xs sm:max-w-md md:max-w-2xl animate-[bounce_4s_ease-in-out_infinite] relative aspect-[4/3]">
            <Image
              src={heroImages[currentHeroIdx]}
              alt="Signature Mandi"
              fill
              sizes="(max-width: 640px) 320px, (max-width: 768px) 448px, 672px"
              className="object-contain drop-shadow-[0_0_30px_rgba(223,177,91,0.3)] transition-opacity duration-700 ease-in-out"
            />
          </div>
        </motion.div>
      </section>
    </>
  );
}
