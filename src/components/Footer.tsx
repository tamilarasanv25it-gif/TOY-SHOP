import React, { useState } from 'react';
import { Mail, Check } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail('');
  };

  return (
    <footer className="bg-[#1E1F22] text-[#E5E5E3] pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
          {/* Brand Info */}
          <div className="md:col-span-4 space-y-4">
            <span className="font-serif text-2xl font-bold text-white tracking-tight block">
              Wunderkind & Co.
            </span>
            <p className="text-xs text-stone-400 leading-relaxed max-w-sm">
              Artisanal European toy emporium dedicated to tactile physics, open-ended Montessori play, and heirloom craftsmanship since 1984.
            </p>
            <div className="text-[11px] text-stone-500 pt-2 space-y-1">
              <p>The Master Workshop: Waldstraße 14, 78136 Schonach, Germany</p>
              <p>North American Showroom: 412 Mercer Street, New York, NY</p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-2 space-y-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-stone-300 block">
              Play Collections
            </span>
            <ul className="text-xs text-stone-400 space-y-2">
              <li><a href="#catalog-section" className="hover:text-white transition-colors">Montessori Beechwood</a></li>
              <li><a href="#catalog-section" className="hover:text-white transition-colors">STEM & Astronomy</a></li>
              <li><a href="#catalog-section" className="hover:text-white transition-colors">Artisan Music Boxes</a></li>
              <li><a href="#catalog-section" className="hover:text-white transition-colors">Belgian Linen Bears</a></li>
              <li><a href="#catalog-section" className="hover:text-white transition-colors">Botanical Watercolors</a></li>
            </ul>
          </div>

          {/* Customer Care */}
          <div className="md:col-span-2 space-y-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-stone-300 block">
              Customer Sanctuary
            </span>
            <ul className="text-xs text-stone-400 space-y-2">
              <li><span className="hover:text-white transition-colors cursor-pointer">Courier Tracking</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Bespoke Gift Boxes</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Toy Care & Beeswax</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Lifetime Repair Guarantee</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Safety Certifications</span></li>
            </ul>
          </div>

          {/* Newsletter Dispatch */}
          <div className="md:col-span-4 space-y-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-stone-300 block">
              The Toymaker's Chronicle
            </span>
            <p className="text-xs text-stone-400 leading-relaxed">
              Quarterly letters on child developmental play, small-batch woodturner releases, and holiday gift curation.
            </p>

            {subscribed ? (
              <div className="p-3 bg-stone-800/80 border border-emerald-500/40 rounded text-xs text-emerald-400 flex items-center gap-2">
                <Check className="w-4 h-4" />
                <span>You have been enrolled in our seasonal dispatches.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  required
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-3 py-2 text-xs bg-stone-800/80 border border-stone-700 rounded text-white placeholder-stone-500 focus:outline-none focus:border-amber-500"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-amber-700 hover:bg-amber-600 text-white rounded text-xs font-semibold cursor-pointer transition-colors"
                >
                  Join
                </button>
              </form>
            )}
            <span className="text-[10px] text-stone-500 block">
              We honor your privacy. Unsubscribe at any moment. Zero spam.
            </span>
          </div>
        </div>

        {/* Quiet Bottom Strip */}
        <div className="pt-8 border-t border-stone-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <div>
            © 2026 Wunderkind & Co. Handcrafted Toymakers. All rights reserved.
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>EN71 Certified</span>
            <span aria-hidden="true">·</span>
            <span>ASTM F963-23</span>
            <span aria-hidden="true">·</span>
            <span>FSC Mix Certified</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
