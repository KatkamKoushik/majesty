"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const ambianceImages = [
  { src: "/ambiance/outer view wps.png", alt: "Outer View", className: "col-span-1 md:col-span-2 row-span-2" },
  { src: "/ambiance/inner view.jpg", alt: "Inner View 1", className: "col-span-1 row-span-1" },
  { src: "/ambiance/inner view 2.jpg", alt: "Inner View 2", className: "col-span-1 row-span-1" },
  { src: "/ambiance/inner view 3.jpg", alt: "Inner View 3", className: "col-span-1 row-span-1" },
  { src: "/ambiance/inner view of majesty.jpg", alt: "Inner View Majesty", className: "col-span-1 row-span-1" },
  { src: "/ambiance/dinning place 1.jpg", alt: "Dining Place 1", className: "col-span-1 md:col-span-2 row-span-1" },
  { src: "/ambiance/dinning place 2.jpg", alt: "Dining Place 2", className: "col-span-1 row-span-1" },
  { src: "/ambiance/dinning place 3.jpg", alt: "Dining Place 3", className: "col-span-1 row-span-1" },
  { src: "/ambiance/inner view 4.webp", alt: "Inner View 4", className: "col-span-1 md:col-span-4 row-span-2" },
];

export default function Ambiance() {
  return (
    <section id="ambiance" className="py-24 bg-[#0B0B0C] relative">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-4xl md:text-5xl text-imperial mb-4 drop-shadow-lg">The Royal Ambiance</h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto font-light">
            Step into a world of elegance. Every detail is crafted to provide a truly authentic and unforgettable Arabian dining experience.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[250px]">
          {ambianceImages.map((img, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className={`relative w-full h-full rounded-xl overflow-hidden group shadow-lg ${img.className}`}
            >
              <Image 
                src={img.src} 
                alt={img.alt} 
                fill 
                className="object-cover transition-transform duration-700 group-hover:scale-105" 
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-transparent transition-colors duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
