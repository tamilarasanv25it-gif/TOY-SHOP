import React, { useState } from 'react';
import { Heart, Volume2, Plus, Star } from 'lucide-react';
import { ToyProduct } from '../types/toy';
import { playToySound } from '../utils/audioSynth';

interface ToyCardProps {
  toy: ToyProduct;
  onSelect: (toy: ToyProduct) => void;
  onAddToCart: (toy: ToyProduct) => void;
  isWishlisted: boolean;
  onToggleWishlist: (toy: ToyProduct) => void;
}

export const ToyCard: React.FC<ToyCardProps> = ({
  toy,
  onSelect,
  onAddToCart,
  isWishlisted,
  onToggleWishlist
}) => {
  const [isPlayingSound, setIsPlayingSound] = useState(false);

  const handleSoundTest = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (toy.soundType) {
      setIsPlayingSound(true);
      playToySound(toy.soundType);
      setTimeout(() => setIsPlayingSound(false), 1200);
    }
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(toy);
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleWishlist(toy);
  };

  return (
    <div
      onClick={() => onSelect(toy)}
      className="group flex flex-col bg-white border border-stone-200/90 rounded-lg overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-md cursor-pointer text-left"
    >
      {/* Product Image Stage */}
      <div className="relative w-full aspect-4/3 bg-[#F6F5F0] overflow-hidden">
        <img
          src={toy.image}
          alt={toy.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
            const fallback = e.currentTarget.nextElementSibling;
            if (fallback) (fallback as HTMLElement).style.display = 'flex';
          }}
        />

        {/* Resilient fallback if image fails */}
        <div className={`hidden w-full h-full bg-gradient-to-br ${toy.fallbackGradient || 'from-amber-50 to-stone-200'} p-4 flex-col justify-between`}>
          <span className="text-xs font-serif font-bold text-stone-700">{toy.title}</span>
          <span className="text-[11px] text-stone-500">{toy.category}</span>
        </div>

        {/* Subtle Editorial Tag (Max 1 subtle text tag per Section 2.B) */}
        {toy.badge && (
          <div className="absolute top-2.5 left-2.5 text-[11px] font-medium tracking-wide uppercase text-stone-800 bg-white/90 backdrop-blur-xs px-2 py-0.5 rounded-sm border border-stone-200/80">
            {toy.badge}
          </div>
        )}

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistClick}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          className={`absolute top-2.5 right-2.5 p-1.5 rounded-full transition-colors ${
            isWishlisted
              ? 'bg-rose-50 text-rose-600 border border-rose-200'
              : 'bg-white/80 hover:bg-white text-stone-600 hover:text-stone-900 border border-stone-200/60'
          }`}
        >
          <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-rose-500' : ''}`} />
        </button>

        {/* Sound Test Sample Pill/Affordance */}
        {toy.soundType && (
          <button
            onClick={handleSoundTest}
            title={toy.soundLabel || 'Listen to toy acoustics'}
            className={`absolute bottom-2.5 left-2.5 flex items-center gap-1.5 px-2 py-1 text-[11px] font-medium rounded bg-stone-900/85 hover:bg-stone-900 text-white backdrop-blur-xs transition-colors ${
              isPlayingSound ? 'ring-2 ring-amber-400 bg-amber-900' : ''
            }`}
          >
            <Volume2 className={`w-3 h-3 ${isPlayingSound ? 'animate-bounce text-amber-300' : 'text-stone-300'}`} />
            <span>{isPlayingSound ? 'Playing…' : 'Sound Test'}</span>
          </button>
        )}

        {/* Quick Add Button Hover Reveal */}
        <button
          onClick={handleQuickAdd}
          title="Quick add to shopping bag"
          className="absolute bottom-2.5 right-2.5 p-2 bg-stone-900 hover:bg-stone-800 text-white rounded-md opacity-90 sm:opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {/* Card Content Area */}
      <div className="p-4 flex flex-col flex-1 justify-between gap-3">
        <div>
          {/* Quiet Unboxed Metadata: Category and Age Group */}
          <div className="flex items-center gap-1.5 text-xs text-stone-500 mb-1">
            <span>{toy.category}</span>
            <span aria-hidden="true">·</span>
            <span>Ages {toy.ageGroup}</span>
          </div>

          {/* Product Title */}
          <h3 className="font-serif text-base font-semibold text-stone-900 group-hover:text-amber-900 transition-colors line-clamp-1">
            {toy.title}
          </h3>

          {/* Secondary Subtitle */}
          <p className="text-xs text-stone-500 line-clamp-1 mt-0.5">
            {toy.subtitle}
          </p>
        </div>

        {/* Rating and Price Row */}
        <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
          <div className="flex items-center gap-1 text-xs text-stone-600">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
            <span className="font-semibold tabular-nums text-stone-800">{toy.rating}</span>
            <span className="text-stone-400 text-[11px]">({toy.reviewCount})</span>
          </div>

          <div className="flex items-baseline gap-1.5">
            {toy.originalPrice && (
              <span className="text-xs text-stone-400 line-through tabular-nums">
                ${toy.originalPrice}
              </span>
            )}
            <span className="text-base font-semibold text-stone-900 tabular-nums">
              ${toy.price}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
