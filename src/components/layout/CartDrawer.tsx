'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CartItem } from '@/types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onIncrease: (id: string, portion: string) => void;
  onDecrease: (id: string, portion: string) => void;
}

export function CartDrawer({ isOpen, onClose, cart, onIncrease, onDecrease }: CartDrawerProps) {
  // Checkout form state
  const [orderType, setOrderType] = useState<'delivery' | 'pickup'>('delivery');
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [flat, setFlat] = useState('');
  const [street, setStreet] = useState('');
  const [landmark, setLandmark] = useState('');
  const [pincode, setPincode] = useState('');
  const [specialInstructions, setSpecialInstructions] = useState('');
  const city = 'Hanamkonda';

  const checkoutWhatsApp = () => {
    const subtotal = cart.reduce((sum, i) => sum + i.prices[i.selectedPortion] * i.qty, 0);
    const gst = Math.round(subtotal * 0.05);
    const grandTotal = subtotal + gst;
    const itemLines = cart.map((i, n) => `${n + 1}. ${i.qty}x ${i.name} (${i.selectedPortion}) — ₹${i.prices[i.selectedPortion] * i.qty}`).join('\n');
    const addressLine = orderType === 'delivery'
      ? `\n\n*ADDRESS:* ${flat}, ${street}${landmark ? ', ' + landmark : ''}, ${city}${pincode ? ' — ' + pincode : ''}`
      : '';
    const notesLine = specialInstructions ? `\n*Notes:* ${specialInstructions}` : '';
    const text = encodeURIComponent(
      `🛎️ *NEW ORDER — MAJESTY MANDI HOUSE* 🛎️\n\n` +
      `*Type:* ${orderType === 'delivery' ? '🚗 Home Delivery' : '🏠 Pickup'}\n` +
      `*Customer:* ${customerName || 'N/A'}\n` +
      `*Phone:* ${phone || 'N/A'}\n\n` +
      `*ITEMS:*\n${itemLines}\n\n` +
      `*Subtotal:* ₹${subtotal}\n` +
      `*GST (5%):* ₹${gst}\n` +
      `*Grand Total:* ₹${grandTotal}` +
      addressLine + notesLine
    );
    window.open(`https://wa.me/918008120038?text=${text}`, '_blank');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/40 backdrop-blur-2xl z-[100] flex justify-end"
        >
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="w-full sm:max-w-md bg-[#0A0A0B]/90 h-full flex flex-col border-l border-[#DFB15B]/30 shadow-2xl"
          >
            {/* ── Drawer Header ── */}
            <div className="flex justify-between items-center px-4 sm:px-6 py-4 border-b border-neutral-800 shrink-0">
              <h2 className="text-xl sm:text-2xl font-serif text-[#DFB15B]">Your Order</h2>
              <button onClick={onClose} className="text-white text-xl font-bold hover:text-red-500 p-1">✕</button>
            </div>

            {/* ── Scrollable Body ── */}
            <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 space-y-4" data-lenis-prevent="true" onWheel={(e) => e.stopPropagation()}>
              {/* Order Type Toggle */}
              <div className="flex rounded-xl overflow-hidden border border-neutral-800 text-sm font-bold">
                <button
                  onClick={() => setOrderType('delivery')}
                  className={`flex-1 py-2.5 transition-colors ${
                    orderType === 'delivery' ? 'bg-[#DFB15B] text-black' : 'bg-[#161618] text-neutral-400 hover:text-white'
                  }`}
                >
                  🚗 Home Delivery
                </button>
                <button
                  onClick={() => setOrderType('pickup')}
                  className={`flex-1 py-2.5 transition-colors ${
                    orderType === 'pickup' ? 'bg-[#DFB15B] text-black' : 'bg-[#161618] text-neutral-400 hover:text-white'
                  }`}
                >
                  🏠 Pickup
                </button>
              </div>

              {/* Cart Items */}
              {cart.length === 0 ? (
                <p className="text-neutral-500 text-center py-8 text-sm font-medium">Your cart is empty. Browse the menu below.</p>
              ) : (
                <div className="space-y-2">
                  {cart.map((item) => (
                    <div key={`${item.id}-${item.selectedPortion}`} className="flex items-center justify-between bg-[#161618] p-3 rounded-lg border border-neutral-800 gap-2">
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-sm truncate">{item.name} <span className="text-neutral-500 text-xs">({item.selectedPortion})</span></p>
                        <p className="text-[#DFB15B] text-xs font-bold mt-0.5">₹{item.prices[item.selectedPortion] * item.qty}</p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <button onClick={() => onDecrease(item.id, item.selectedPortion)} className="w-7 h-7 rounded-full bg-neutral-800 hover:bg-red-500 text-white font-bold text-base flex items-center justify-center transition-colors">−</button>
                        <span className="w-5 text-center font-bold text-sm">{item.qty}</span>
                        <button onClick={() => onIncrease(item.id, item.selectedPortion)} className="w-7 h-7 rounded-full bg-neutral-800 hover:bg-[#DFB15B] hover:text-black text-white font-bold text-base flex items-center justify-center transition-colors">+</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Customer Details & Address Form */}
              {cart.length > 0 && (
                <div className="space-y-2.5">
                  <p className="text-xs text-neutral-500 uppercase tracking-widest font-bold border-t border-neutral-800 pt-4">Customer Details</p>
                  <input
                    value={customerName} onChange={e => setCustomerName(e.target.value)}
                    placeholder="Full Name *"
                    className="w-full bg-[#161618] border border-neutral-800 text-white text-sm rounded-lg px-3 py-2.5 focus:outline-none focus:border-[#DFB15B] placeholder:text-neutral-600 transition-colors"
                  />
                  <input
                    value={phone} onChange={e => setPhone(e.target.value)}
                    placeholder="Mobile Number *" type="tel"
                    className="w-full bg-[#161618] border border-neutral-800 text-white text-sm rounded-lg px-3 py-2.5 focus:outline-none focus:border-[#DFB15B] placeholder:text-neutral-600 transition-colors"
                  />

                  {orderType === 'delivery' && (
                    <>
                      <p className="text-xs text-neutral-500 uppercase tracking-widest font-bold border-t border-neutral-800 pt-3">Delivery Address</p>
                      <input
                        value={flat} onChange={e => setFlat(e.target.value)}
                        placeholder="Flat / House No. *"
                        className="w-full bg-[#161618] border border-neutral-800 text-white text-sm rounded-lg px-3 py-2.5 focus:outline-none focus:border-[#DFB15B] placeholder:text-neutral-600 transition-colors"
                      />
                      <input
                        value={street} onChange={e => setStreet(e.target.value)}
                        placeholder="Street / Area *"
                        className="w-full bg-[#161618] border border-neutral-800 text-white text-sm rounded-lg px-3 py-2.5 focus:outline-none focus:border-[#DFB15B] placeholder:text-neutral-600 transition-colors"
                      />
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          value={landmark} onChange={e => setLandmark(e.target.value)}
                          placeholder="Landmark"
                          className="w-full bg-[#161618] border border-neutral-800 text-white text-sm rounded-lg px-3 py-2.5 focus:outline-none focus:border-[#DFB15B] placeholder:text-neutral-600 transition-colors"
                        />
                        <input
                          value={pincode} onChange={e => setPincode(e.target.value)}
                          placeholder="Pincode" type="number"
                          className="w-full bg-[#161618] border border-neutral-800 text-white text-sm rounded-lg px-3 py-2.5 focus:outline-none focus:border-[#DFB15B] placeholder:text-neutral-600 transition-colors"
                        />
                      </div>
                    </>
                  )}

                  <textarea
                    value={specialInstructions} onChange={e => setSpecialInstructions(e.target.value)}
                    placeholder="Special Instructions (optional)..." rows={2}
                    className="w-full bg-[#161618] border border-neutral-800 text-white text-sm rounded-lg px-3 py-2.5 focus:outline-none focus:border-[#DFB15B] placeholder:text-neutral-600 resize-none transition-colors"
                  />
                </div>
              )}
            </div>

            {/* ── Footer: Bill + Checkout ── */}
            {cart.length > 0 && (() => {
              const subtotal = cart.reduce((s, i) => s + i.prices[i.selectedPortion] * i.qty, 0);
              const gst = Math.round(subtotal * 0.05);
              const grandTotal = subtotal + gst;
              return (
                <div className="px-4 sm:px-6 py-4 border-t border-neutral-800 shrink-0 bg-[#0A0A0B]/80 backdrop-blur-md">
                  <div className="space-y-1.5 mb-3">
                    <div className="flex justify-between text-sm text-neutral-400">
                      <span>Subtotal</span><span className="text-white font-medium">₹{subtotal}</span>
                    </div>
                    <div className="flex justify-between text-sm text-neutral-400">
                      <span>GST (5%)</span><span className="text-white font-medium">₹{gst}</span>
                    </div>
                    <div className="flex justify-between text-base font-bold text-[#DFB15B] border-t border-neutral-800 pt-2 mt-2">
                      <span>Grand Total</span><span>₹{grandTotal}</span>
                    </div>
                  </div>
                  <button
                    onClick={checkoutWhatsApp}
                    className="w-full py-3 sm:py-4 bg-[#DFB15B] text-black font-bold text-base sm:text-lg rounded-xl hover:bg-[#F3A833] transition-colors"
                  >
                    📲 SEND ORDER TO WHATSAPP
                  </button>
                </div>
              );
            })()}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
