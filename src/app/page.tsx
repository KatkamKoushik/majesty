'use client';
import React, { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { CanvasHero } from '@/components/layout/CanvasHero';
import { CartDrawer } from '@/components/layout/CartDrawer';
import { MenuGrid } from '@/components/sections/MenuGrid';
import { AmbianceGallery } from '@/components/sections/AmbianceGallery';
import { PhysicalMenuCTA } from '@/components/sections/PhysicalMenuCTA';
import { TableReservation } from '@/components/sections/TableReservation';
import { BirthdayPromoModal } from '@/components/ui/BirthdayPromoModal';
import { CartItem, MenuItem } from '@/types';

export default function Home() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Cart Functions
  const addToCart = (item: Omit<CartItem, 'qty'>) => {
    setCart(prev => {
      const exists = prev.find(i => i.id === item.id && i.selectedPortion === item.selectedPortion);
      if (exists) return prev.map(i => (i.id === item.id && i.selectedPortion === item.selectedPortion) ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...item, qty: 1 }];
    });
  };

  const increaseQty = (id: string, portion: string) => {
    setCart(prev => prev.map(i => (i.id === id && i.selectedPortion === portion) ? { ...i, qty: i.qty + 1 } : i));
  };

  const decreaseQty = (id: string, portion: string) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === id && i.selectedPortion === portion);
      if (existing && existing.qty === 1) {
        return prev.filter(i => !(i.id === id && i.selectedPortion === portion));
      }
      return prev.map(i => 
        (i.id === id && i.selectedPortion === portion) 
          ? { ...i, qty: i.qty - 1 } 
          : i
      );
    });
  };

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <main className="min-h-screen bg-[#0A0A0B] text-white font-sans overflow-clip relative selection:bg-[#DFB15B] selection:text-[#0A0A0B]">
      <div id="home" className="absolute top-0 left-0 w-full h-[1px] pointer-events-none" />
      <BirthdayPromoModal />
      {/* ═══════════════ TOP BANNER ═══════════════ */}
      <div className="w-full bg-gradient-to-r from-[#DFB15B] via-[#F3A833] to-[#DFB15B] text-black text-center py-2.5 font-bold text-xs sm:text-sm tracking-wide z-50 relative border-b border-[#0A0A0B]">
        🎓 Exclusive Offer: 10% Discount available with a valid Student ID (Dine-in only).
      </div>

      <Navbar cartCount={cartCount} onOpenCart={() => setIsCartOpen(true)} />
      
      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        cart={cart}
        onIncrease={increaseQty}
        onDecrease={decreaseQty}
      />

      <CanvasHero />

      {/* ═══════════════ THE MAJESTY EXPERIENCE ═══════════════ */}
      <section className="w-full py-20 md:py-32 px-4 sm:px-6 md:px-12 lg:px-24 bg-[#0A0A0B]">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[#DFB15B] text-xs sm:text-sm tracking-[0.4em] uppercase font-bold mb-4">The Legacy</p>
          <h3 className="text-3xl sm:text-4xl md:text-5xl font-serif text-white mb-8">The Majesty Experience</h3>
          <div className="w-12 h-[2px] bg-[#DFB15B]/50 mx-auto mb-10" />
          
          <p className="text-neutral-400 text-sm sm:text-base md:text-lg leading-relaxed font-light mb-6">
            Majesty Mandi House is a popular dining destination in Hanumakonda that specializes in authentic Arabian-style mandi and traditional Middle Eastern flavors. Known for its fragrant rice, tender meat preparations, and generous portions, the restaurant offers a unique culinary experience for mandi lovers in Greater Warangal.
          </p>
          <p className="text-neutral-400 text-sm sm:text-base md:text-lg leading-relaxed font-light mb-6">
            The restaurant serves a variety of chicken, mutton, and special mandi dishes prepared using aromatic spices and traditional cooking techniques. With its comfortable seating, family-friendly atmosphere, and flavorful menu, Majesty Mandi House has become a preferred choice for families, friends, and food enthusiasts looking to enjoy authentic Arabian cuisine.
          </p>

          <div className="flex flex-wrap justify-center gap-3 mt-16">
            {["Authentic Arabian Mandi", "Family-Friendly Dining", "Freshly Prepared Food", "Large Sharing Platters"].map((feature, idx) => (
              <span key={idx} className="border border-[#161618] bg-[#161618] text-neutral-300 px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium tracking-wide">
                {feature}
              </span>
            ))}
          </div>
        </div>
      </section>

      <MenuGrid 
        cart={cart} 
        onIncrease={increaseQty} 
        onDecrease={decreaseQty} 
        onAdd={addToCart} 
      />

      <PhysicalMenuCTA />
      <AmbianceGallery />
      <TableReservation />

      {/* ═══════════════ FOOTER & CONTACT ═══════════════ */}
      <footer id="contact" className="w-full bg-[#0A0A0B] py-16 px-4 sm:px-6 md:px-12 border-t border-neutral-900 mt-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12 lg:gap-24 mb-16">
          {/* Left: Info & Socials */}
          <div className="flex flex-col justify-center text-center md:text-left md:flex-1">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#DFB15B] tracking-widest uppercase mb-6">Majesty</h2>
            <p className="text-neutral-400 text-sm sm:text-base leading-relaxed mb-8 max-w-md mx-auto md:mx-0">
              Experience the ultimate authentic Arabian dining right here in Hanamkonda. The perfect ambiance for family, friends, and unforgettable flavors.
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3 justify-center md:justify-start">
                <svg className="w-5 h-5 text-[#DFB15B] shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <p className="text-neutral-300 text-sm leading-relaxed text-left">
                  H.No.5 - 11 - 205, Jagruti Colony<br />
                  Naim Nagar<br />
                  Hanamkonda, Telangana 506009<br /><br />
                  <span className="text-[#DFB15B] font-bold">WhatsApp:</span> 8008120038
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 justify-center md:justify-start">
              <a href="https://www.instagram.com/majesty_mandi_house" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 p-3 bg-[#161618] rounded-full border border-neutral-800 text-[#DFB15B] hover:bg-[#DFB15B] hover:text-black hover:border-[#DFB15B] transition-all duration-300 group">
                <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
                <span className="hidden sm:inline font-bold pr-2 text-sm tracking-wide">@majesty_mandi_house</span>
              </a>
            </div>
          </div>

          {/* Right: Map Embed */}
          <div className="w-full h-64 sm:h-80 md:h-[400px] min-h-[300px] rounded-2xl overflow-hidden border border-neutral-800 shadow-[0_0_30px_rgba(223,177,91,0.05)] relative bg-[#161618] md:flex-1">
            {/* The Google Maps src points to the exact area requested */}
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3794.199609522869!2d79.554788!3d18.0159377!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a334f9bc5e96337%3A0x571a883b2fd8762b!2sMajesty%20Mandi%20House!5e0!3m2!1sen!2sin!4v1784374907186!5m2!1sen!2sin" 
              className="absolute inset-0 w-full h-full border-0 filter opacity-80 hover:opacity-100 transition-opacity duration-500" 
              allowFullScreen={false} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>

        <div className="max-w-7xl mx-auto border-t border-neutral-900 pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-neutral-600">
          <p>© {new Date().getFullYear()} Majesty Mandi House. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-neutral-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-neutral-300 transition-colors">Terms of Service</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
