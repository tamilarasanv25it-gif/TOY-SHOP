import React from 'react';
import { ArrowRight, Sparkles, ShieldCheck, HeartHandshake } from 'lucide-react';
import { HERO_IMAGE } from '../data/toys';

interface HeroProps {
  onExploreCatalog: () => void;
  onOpenGiftFinder: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreCatalog, onOpenGiftFinder }) => {
  return (
    <section className="relative overflow-hidden bg-[#FAF9F5] border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Editorial Headline & Actions */}
          <div className="lg:col-span-6 space-y-6">
            {/* Quiet editorial kicker */}
            <div className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-stone-500">
              <span>Artisanal Toymakers</span>
              <span aria-hidden="true">·</span>
              <span>Since 1984</span>
              <span aria-hidden="true">·</span>
              <span>Certified European Craft</span>
            </div>

            {/* Display Headline with balanced wrap */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-stone-900 tracking-tight leading-[1.1] [text-wrap:balance]">
              Playthings crafted for wonder, engineered for generations.
            </h1>

            {/* Body prose */}
            <p className="text-base sm:text-lg text-stone-600 leading-relaxed max-w-xl">
              We handcraft solid beechwood trains, precision brass refractor telescopes, and pure linen companions. No synthetic chimes, no disposable plastics — only tactile physics and unbounded childhood imagination.
            </p>

            {/* Action buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onExploreCatalog}
                className="px-6 py-3 text-sm font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded-md transition-all shadow-sm hover:shadow flex items-center gap-2 cursor-pointer"
              >
                <span>Explore The Workshop</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenGiftFinder}
                className="px-5 py-3 text-sm font-semibold text-stone-800 bg-white hover:bg-stone-50 border border-stone-300 rounded-md transition-colors flex items-center gap-2 cursor-pointer shadow-2xs"
              >
                <Sparkles className="w-4 h-4 text-amber-700" />
                <span>Gift Advisor</span>
              </button>
            </div>

            {/* Trust markers adjacent to hero claim */}
            <div className="pt-6 border-t border-stone-200/80 grid grid-cols-3 gap-4 text-left">
              <div>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-stone-800">
                  <ShieldCheck className="w-4 h-4 text-amber-800 shrink-0" />
                  <span>100% Non-Toxic</span>
                </div>
                <p className="text-[11px] text-stone-500 mt-0.5">Organic plant oils & water pigments</p>
              </div>

              <div>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-stone-800">
                  <HeartHandshake className="w-4 h-4 text-amber-800 shrink-0" />
                  <span>Heirloom Built</span>
                </div>
                <p className="text-[11px] text-stone-500 mt-0.5">Lifetime craftsmanship warranty</p>
              </div>

              <div>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-stone-800">
                  <span className="w-4 h-4 rounded-full bg-emerald-700/15 text-emerald-800 flex items-center justify-center text-[10px] font-bold shrink-0">✓</span>
                  <span>FSC Forestry</span>
                </div>
                <p className="text-[11px] text-stone-500 mt-0.5">Certified European Alpine wood</p>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Showcase Image with Resilient Fallback */}
          <div className="lg:col-span-6">
            <div className="relative rounded-xl overflow-hidden border border-stone-200 shadow-md bg-stone-100 group">
              <img
                src={HERO_IMAGE}
                alt="Wunderkind artisanal toy workshop featuring handcrafted wooden toys and music boxes"
                referrerPolicy="no-referrer"
                className="w-full aspect-16/10 object-cover object-center group-hover:scale-[1.01] transition-transform duration-500"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  const fallback = e.currentTarget.nextElementSibling;
                  if (fallback) (fallback as HTMLElement).style.display = 'flex';
                }}
              />
              <div className="hidden w-full aspect-16/10 bg-gradient-to-br from-amber-100 to-stone-200 p-8 flex-col justify-end text-stone-800">
                <span className="font-serif text-2xl font-bold">Wunderkind Toy Emporium</span>
                <span className="text-xs text-stone-600 mt-1">Artisanal European Craftsmanship Since 1984</span>
              </div>

              {/* Quiet photo caption metadata */}
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent p-4 text-white flex items-center justify-between">
                <div className="text-xs">
                  <span className="font-medium">The Master Woodturner Workshop</span>
                  <span className="opacity-70 text-[11px] block">Black Forest, Germany · Batch No. 84</span>
                </div>
                <span className="text-[11px] font-mono text-amber-200 bg-black/40 px-2 py-0.5 rounded">
                  Hand-lathed
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
