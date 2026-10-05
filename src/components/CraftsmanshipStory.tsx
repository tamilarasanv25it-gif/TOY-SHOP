import React from 'react';
import { Sparkles, TreePine, ShieldCheck, HeartHandshake } from 'lucide-react';

export const CraftsmanshipStory: React.FC = () => {
  return (
    <section id="craft-story" className="py-16 md:py-24 bg-[#F5F4EE] border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Section Header */}
        <div className="max-w-2xl mx-auto text-center space-y-3 mb-12 md:mb-16">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-widest text-stone-500">
            <span>Our Workshop Philosophy</span>
            <span aria-hidden="true">·</span>
            <span>Est. 1984</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl font-normal text-stone-900 tracking-tight [text-wrap:balance]">
            Crafted slowly from Alpine wood, earth pigments, and natural flax.
          </h2>

          <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
            In an era of disposable plastic gadgets with flashing screens and harsh synthetic tones, we protect the quiet, tactile wonder of childhood. Every object we sculpt is made to survive childhood and be passed down to grandchildren.
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Pillar 1 */}
          <div className="bg-white p-6 sm:p-8 rounded-xl border border-stone-200/90 shadow-2xs space-y-4">
            <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-800 flex items-center justify-center">
              <TreePine className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-bold text-stone-900">
              Sustainably Harvested Alpine Woods
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              We source only FSC-certified Bavarian beechwood, linden wood, and black cherry. Each timber is air-seasoned for two winters to ensure dimensional stability and silky hand-feel.
            </p>
            <div className="pt-3 border-t border-stone-100 text-xs text-stone-500">
              <span>0% Synthetic Varnishes</span>
              <span aria-hidden="true" className="mx-2">·</span>
              <span>Organic Beeswax Seal</span>
            </div>
          </div>

          {/* Pillar 2 */}
          <div className="bg-white p-6 sm:p-8 rounded-xl border border-stone-200/90 shadow-2xs space-y-4">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-800 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-bold text-stone-900">
              Stringent Safety & Mineral Pigments
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              Our coloring uses water-borne plant extractions and ground mineral clays. Every piece undergoes independent tensile, drop, and mastication testing conforming to European EN71 and ASTM F963 standards.
            </p>
            <div className="pt-3 border-t border-stone-100 text-xs text-stone-500">
              <span>OEKO-TEX Class 1</span>
              <span aria-hidden="true" className="mx-2">·</span>
              <span>Food-Grade Tested</span>
            </div>
          </div>

          {/* Pillar 3 */}
          <div className="bg-white p-6 sm:p-8 rounded-xl border border-stone-200/90 shadow-2xs space-y-4">
            <div className="w-10 h-10 rounded-lg bg-stone-100 text-stone-800 flex items-center justify-center">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-bold text-stone-900">
              Heirloom Repair & Restoration Guarantee
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              Should a locomotive carriage decouple or a brass clockwork key require tuning twenty years from now, our Black Forest workshop offers lifelong refurbishment and replacement parts.
            </p>
            <div className="pt-3 border-t border-stone-100 text-xs text-stone-500">
              <span>Generational Promise</span>
              <span aria-hidden="true" className="mx-2">·</span>
              <span>Hand-Turned Spares</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
