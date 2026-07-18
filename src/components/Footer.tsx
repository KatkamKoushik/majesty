export default function Footer() {
  return (
    <footer className="bg-[#050505] text-white/80 py-16 border-t border-white/5 relative z-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Brand & Address Column */}
        <div className="space-y-4">
          <h3 className="font-serif text-3xl text-imperial font-bold tracking-wider mb-6">MAJESTY</h3>
          <p className="text-sm leading-relaxed max-w-sm">
            The ultimate destination for authentic Arabian Mandi and majestic dining experiences.
          </p>
          <div className="pt-4 space-y-2">
            <h4 className="text-white font-medium mb-2">Location</h4>
            <p className="text-sm">H.No.5 - 11 - 205, Jagruti Colony,</p>
            <p className="text-sm">Naim Nagar, Hanamkonda, Telangana 506009</p>
          </div>
        </div>

        {/* Contact Column */}
        <div className="space-y-4 md:pt-14">
          <h4 className="text-white font-medium mb-4">Contact Us</h4>
          <p className="text-sm flex items-center gap-2">
            <span className="text-imperial">WhatsApp:</span> 
            <a href="https://wa.me/918008120038" className="hover:text-amber transition-colors">
              +91 80081 20038
            </a>
          </p>
          <p className="text-sm flex items-center gap-2">
            <span className="text-imperial">Instagram:</span> 
            <a href="https://instagram.com/majesty_mandi_house" target="_blank" rel="noopener noreferrer" className="hover:text-amber transition-colors">
              @majesty_mandi_house
            </a>
          </p>
        </div>

        {/* Map Column */}
        <div className="space-y-4">
          <h4 className="text-white font-medium mb-4">Find Us</h4>
          <div className="w-full h-48 rounded-xl overflow-hidden shadow-lg border border-white/10">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3794.199609522869!2d79.554788!3d18.0159377!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a334f9bc5e96337%3A0x571a883b2fd8762b!2sMajesty%20Mandi%20House!5e0!3m2!1sen!2sin!4v1784374907186!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-white/10 text-center text-sm text-white/40">
        <p>&copy; {new Date().getFullYear()} Majesty Mandi House. All rights reserved.</p>
      </div>
    </footer>
  );
}
