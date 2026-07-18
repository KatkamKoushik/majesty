'use client';

import React, { useState } from 'react';
import Image from 'next/image';

export function TableReservation() {
  const [guests, setGuests] = useState('2');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [occasion, setOccasion] = useState('');

  const handleReserve = () => {
    if (!name || !phone || !date || !time || !occasion) {
      alert("Please fill all fields");
      return;
    }
    const msg = `📅 TABLE RESERVATION REQUEST 📅\n*Name:* ${name}\n*Phone:* ${phone}\n*Guests:* ${guests}\n*Date:* ${date}\n*Time:* ${time}\n*Occasion:* ${occasion}\n\nPlease confirm if this slot is available.`;
    const encoded = encodeURIComponent(msg);
    const waUrl = `https://wa.me/918008120038?text=${encoded}`;
    window.open(waUrl, '_blank');
  };

  return (
    <section className="w-full py-20 md:py-32 px-4 sm:px-6 md:px-12 lg:px-24 bg-[#0A0A0B] border-t border-neutral-900">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-24 items-center">
        {/* Left Image */}
        <div className="w-full lg:w-1/2 relative h-[400px] sm:h-[500px] lg:h-[600px] rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(223,177,91,0.1)]">
          <Image 
            src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=1200" 
            alt="Majesty Dining Table" 
            fill 
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0B] via-transparent to-transparent opacity-80" />
        </div>

        {/* Right Form */}
        <div className="w-full lg:w-1/2 flex flex-col">
          <p className="text-[#DFB15B] text-xs sm:text-sm tracking-[0.4em] uppercase font-bold mb-4">Plan a Grand Celebration</p>
          <h3 className="text-3xl sm:text-4xl md:text-5xl font-serif text-white mb-10">Table Reservation</h3>
          
          <div className="flex flex-col gap-5">
            <div className="flex flex-col sm:flex-row gap-5">
              <input 
                type="text" 
                placeholder="Full Name" 
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full bg-[#161618] border border-neutral-800 rounded-xl px-4 py-3.5 text-white placeholder-neutral-500 focus:outline-none focus:border-[#DFB15B] transition-colors"
              />
              <input 
                type="tel" 
                placeholder="Mobile Number" 
                value={phone}
                onChange={e => setPhone(e.target.value)}
                className="w-full bg-[#161618] border border-neutral-800 rounded-xl px-4 py-3.5 text-white placeholder-neutral-500 focus:outline-none focus:border-[#DFB15B] transition-colors"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-5">
              <select 
                value={guests}
                onChange={e => setGuests(e.target.value)}
                className="w-full bg-[#161618] border border-neutral-800 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-[#DFB15B] transition-colors appearance-none"
              >
                {[...Array(19)].map((_, i) => (
                  <option key={i+2} value={i+2}>{i+2} Guests</option>
                ))}
                <option value="20+">20+ Guests</option>
              </select>
              <select 
                value={occasion}
                onChange={e => setOccasion(e.target.value)}
                className="w-full bg-[#161618] border border-neutral-800 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-[#DFB15B] transition-colors appearance-none"
              >
                <option value="" disabled>Occasion</option>
                <option value="Birthday">Birthday</option>
                <option value="Anniversary">Anniversary</option>
                <option value="Casual Dining">Casual Dining</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="flex flex-col sm:flex-row gap-5">
              <input 
                type="date" 
                value={date}
                onChange={e => setDate(e.target.value)}
                className="w-full bg-[#161618] border border-neutral-800 rounded-xl px-4 py-3.5 text-white placeholder-neutral-500 focus:outline-none focus:border-[#DFB15B] transition-colors [&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:invert"
              />
              <select 
                value={time}
                onChange={e => setTime(e.target.value)}
                className="w-full bg-[#161618] border border-neutral-800 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-[#DFB15B] transition-colors appearance-none"
              >
                <option value="" disabled>Time</option>
                <option value="Lunch (12:00 PM - 4:00 PM)">Lunch (12:00 PM - 4:00 PM)</option>
                <option value="Dinner (7:00 PM - 11:30 PM)">Dinner (7:00 PM - 11:30 PM)</option>
              </select>
            </div>

            <button 
              onClick={handleReserve}
              className="w-full bg-gradient-to-r from-[#DFB15B] via-[#F3A833] to-[#DFB15B] text-black font-bold py-4 rounded-xl mt-6 hover:shadow-[0_0_20px_rgba(223,177,91,0.4)] transition-all duration-300 tracking-wider text-sm"
            >
              CONFIRM TABLE VIA WHATSAPP
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
