'use client';
import React, { useState, useEffect } from 'react';
import Image, { ImageProps } from 'next/image';

interface OptimizedImageProps extends Omit<ImageProps, 'onError'> {
  fallbackAlt?: string;
}

export function OptimizedImage({ src, alt, className, fallbackAlt, ...props }: OptimizedImageProps) {
  const [error, setError] = useState(false);

  useEffect(() => {
    setError(false);
  }, [src]);

  if (error || !src) {
    return (
      <div className={`w-full h-full min-h-[144px] bg-[#161618] border border-[#DFB15B]/30 rounded-full flex flex-col items-center justify-center p-4 text-center selection:bg-transparent ${className}`}>
        {/* Delicate Geometric Luxury Icon */}
        <svg className="w-8 h-8 text-[#DFB15B]/60 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M14 12a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        <span className="text-[9px] font-serif tracking-[0.25em] uppercase text-[#DFB15B]/80 font-bold">Image Unavailable</span>
      </div>
    );
  }

  const isDataUri = typeof src === 'string' && src.startsWith('data:');
  const isRemote  = typeof src === 'string' && src.startsWith('http');

  if (isDataUri || isRemote) {
    // Destructure Next.js specific props to avoid passing them to native <img> elements
    const { fill, quality, priority, placeholder, blurDataURL, ...domProps } = props as any;
    return (
      <img
        src={src as string}
        alt={alt}
        className={className}
        onError={() => setError(true)}
        {...domProps}
      />
    );
  }

  // NOTE: Next.js <Image> does NOT allow query strings on local /public paths.
  // Cache-busting for local images is handled by restarting the dev server,
  // which clears the /_next/image cache automatically.
  return (
    <Image
      src={src}
      alt={alt}
      className={className}
      onError={() => setError(true)}
      {...props}
    />
  );
}
export default OptimizedImage;

