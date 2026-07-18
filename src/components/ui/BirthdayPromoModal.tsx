'use client';

import React, { useState, useEffect } from 'react';

export function BirthdayPromoModal() {
  const [showPromo, setShowPromo] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPromo(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const handleClaim = () => {
    if (!name || !phone || !date) {
      alert("Please fill all fields");
      return;
    }
    const msg = `🎉 BIRTHDAY PROMO CLAIM 🎉\n*Name:* ${name}\n*Phone:* ${phone}\n*Birthday:* ${date}\n\nPlease save my number and send me my 10% off code!`;
    const encoded = encodeURIComponent(msg);
    const waUrl = `https://wa.me/918008120038?text=${encoded}`;
    window.open(waUrl, '_blank');
    setShowPromo(false);
  };

  if (!showPromo) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-[#0A0A0B] border border-[#DFB15B]/30 rounded-2xl w-full max-w-md p-6 sm:p-8 relative shadow-[0_0_40px_rgba(223,177,91,0.15)] flex flex-col gap-4">
        <h3 className="text-2xl font-serif text-[#DFB15B] text-center mb-2">Birthday Special</h3>
        <p className="text-sm text-neutral-300 text-center mb-4">Claim your exclusive 10% discount for your birthday celebration!</p>
        
        <input 
          type="text" 
          placeholder="Full Name" 
          value={name} 
          onChange={e => setName(e.target.value)}
          className="w-full bg-[#161618] border border-neutral-800 rounded-xl px-4 py-3 text-white placeholder-neutral-500 focus:outline-none focus:border-[#DFB15B] transition-colors"
        />
        <input 
          type="tel" 
          placeholder="Mobile Number" 
          value={phone} 
          onChange={e => setPhone(e.target.value)}
          className="w-full bg-[#161618] border border-neutral-800 rounded-xl px-4 py-3 text-white placeholder-neutral-500 focus:outline-none focus:border-[#DFB15B] transition-colors"
        />
        <input 
          type="date" 
          value={date} 
          onChange={e => setDate(e.target.value)}
          className="w-full bg-[#161618] border border-neutral-800 rounded-xl px-4 py-3 text-white placeholder-neutral-500 focus:outline-none focus:border-[#DFB15B] transition-colors [&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:invert"
        />
        
        <button 
          onClick={handleClaim}
          className="w-full bg-gradient-to-r from-[#DFB15B] via-[#F3A833] to-[#DFB15B] text-black font-bold py-3 sm:py-4 rounded-xl mt-4 hover:shadow-[0_0_20px_rgba(223,177,91,0.4)] transition-all duration-300"
        >
          CLAIM 10% DISCOUNT
        </button>
        
        <button 
          onClick={() => setShowPromo(false)}
          className="w-full text-neutral-500 text-sm py-2 hover:text-white transition-colors mt-2"
        >
          No thanks, close
        </button>
      </div>
    </div>
  );
}
