'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

export function AmbianceGallery() {
  const galleryImages = [
    "/ambiance/outer view wps.png",
    "/ambiance/inner view.jpg",
    "/ambiance/inner view 2.jpg",
    "/ambiance/inner view 3.jpg",
    "/ambiance/inner view of majesty.jpg",
    "/ambiance/dinning place 1.jpg",
    "/ambiance/dinning place 2.jpg",
    "/ambiance/dinning place 3.jpg",
    "/ambiance/inner view 4.webp",
  ];

  return (
    <section id="ambiance" className="w-full bg-[#0A0A0B] py-16 md:py-24 px-4 sm:px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <h3 className="text-3xl sm:text-4xl font-serif text-white text-center mb-12 sm:mb-16">The Royal Ambiance</h3>
        <motion.div 
          initial={{ opacity: 0, y: 50 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true, margin: "-100px" }} 
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {galleryImages.map((img, idx) => (
            <div 
              key={img} 
              className={`relative w-full overflow-hidden rounded-2xl bg-[#161618] border border-neutral-800 shadow-2xl group ${
                idx === 0 || idx === 3 || idx === 8 ? 'md:col-span-2 aspect-[16/9]' : 'aspect-square'
              }`}
            >
              <Image
                src={img}
                alt={`Ambiance ${idx}`}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-700" />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
