import React, { useState } from 'react';
import { ShoppingBag, Heart, Sparkles, Gift, Menu, X, Search } from 'lucide-react';
import { ToyCategory } from '../types/toy';

interface NavbarProps {
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenGiftFinder: () => void;
  onOpenGiftBoxBuilder: () => void;
  onSelectCategory: (category: ToyCategory) => void;
  selectedCategory: ToyCategory;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onScrollToStory: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenGiftFinder,
  onOpenGiftBoxBuilder,
  onSelectCategory,
  selectedCategory,
  searchQuery,
  onSearchChange,
  onScrollToStory
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSearchInput, setShowSearchInput] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#FAF9F5]/90 backdrop-blur-md border-b border-stone-200/80 transition-colors">
      {/* Top Announcement Bar - Clean minimal banner adhering to section governance */}
      <div className="bg-[#2C342C] text-[#FAF9F5] text-xs py-1.5 px-4 text-center tracking-wide font-medium flex items-center justify-center gap-2">
        <span>Complimentary courier delivery on orders over $80</span>
        <span aria-hidden="true" className="opacity-50">·</span>
        <span className="opacity-90">Every wooden toy carved from certified European sustainable forestry</span>
      </div>

      {/* Top Bar Contract: 3 zones */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
        {/* Zone 1: Single element wordmark in display face */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              onSelectCategory('All');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-left group cursor-pointer focus-visible:outline-stone-800"
          >
            <span className="font-serif text-2xl font-bold tracking-tight text-stone-900 group-hover:text-amber-800 transition-colors">
              Wunderkind & Co.
            </span>
          </button>
        </div>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-stone-700">
          <button
            onClick={() => {
              onSelectCategory('Wooden & Montessori');
              document.getElementById('catalog-section')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className={`cursor-pointer transition-colors hover:text-stone-900 ${
              selectedCategory === 'Wooden & Montessori' ? 'text-amber-900 font-semibold underline underline-offset-8 decoration-amber-700' : ''
            }`}
          >
            Montessori & Wood
          </button>

          <button
            onClick={() => {
              onSelectCategory('STEM & Science');
              document.getElementById('catalog-section')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className={`cursor-pointer transition-colors hover:text-stone-900 ${
              selectedCategory === 'STEM & Science' ? 'text-amber-900 font-semibold underline underline-offset-8 decoration-amber-700' : ''
            }`}
          >
            STEM & Science
          </button>

          <button
            onClick={onOpenGiftFinder}
            className="flex items-center gap-1.5 cursor-pointer text-amber-900 font-semibold hover:text-amber-700 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            <span>Gift Finder</span>
          </button>

          <button
            onClick={onOpenGiftBoxBuilder}
            className="flex items-center gap-1.5 cursor-pointer text-stone-700 hover:text-stone-900 transition-colors"
          >
            <Gift className="w-3.5 h-3.5 text-stone-500" />
            <span>Bespoke Gift Box</span>
          </button>

          <button
            onClick={onScrollToStory}
            className="cursor-pointer transition-colors hover:text-stone-900"
          >
            Artisan Story
          </button>
        </nav>

        {/* Zone 3: 1-2 primary actions + search */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick search affordance */}
          <div className="relative flex items-center">
            {showSearchInput ? (
              <div className="flex items-center relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  placeholder="Search toys, ages, skills..."
                  autoFocus
                  className="w-44 sm:w-60 pl-8 pr-7 py-1.5 text-xs bg-white border border-stone-300 rounded-md focus:outline-none focus:border-amber-700 text-stone-900"
                />
                <Search className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 pointer-events-none" />
                <button
                  onClick={() => {
                    setShowSearchInput(false);
                    onSearchChange('');
                  }}
                  className="absolute right-2 text-stone-400 hover:text-stone-700 text-xs cursor-pointer"
                  aria-label="Close search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowSearchInput(true)}
                className="p-2 text-stone-700 hover:text-stone-900 hover:bg-stone-100 rounded-md transition-colors cursor-pointer"
                aria-label="Search catalog"
              >
                <Search className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Wishlist Action */}
          <button
            onClick={onOpenWishlist}
            className="relative p-2 text-stone-700 hover:text-stone-900 hover:bg-stone-100 rounded-md transition-colors cursor-pointer"
            aria-label="View saved toys"
          >
            <Heart className="w-4 h-4" />
            {wishlistCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-amber-700 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center tabular-nums">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Cart Bag Action */}
          <button
            onClick={onOpenCart}
            className="relative flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded-md transition-colors cursor-pointer whitespace-nowrap shadow-xs"
            aria-label="Shopping bag"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Bag</span>
            <span className="tabular-nums font-bold">({cartCount})</span>
          </button>

          {/* Mobile hamburger menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-stone-700 hover:text-stone-900 rounded-md cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-stone-200 bg-[#FAF9F5] px-4 pt-3 pb-6 space-y-3">
          <div className="text-xs uppercase tracking-wider text-stone-400 font-semibold px-2">Collections</div>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => {
                onSelectCategory('Wooden & Montessori');
                setMobileMenuOpen(false);
                document.getElementById('catalog-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="text-left px-3 py-2 text-sm text-stone-800 bg-white border border-stone-200 rounded-md"
            >
              Montessori & Wood
            </button>
            <button
              onClick={() => {
                onSelectCategory('STEM & Science');
                setMobileMenuOpen(false);
                document.getElementById('catalog-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="text-left px-3 py-2 text-sm text-stone-800 bg-white border border-stone-200 rounded-md"
            >
              STEM & Science
            </button>
            <button
              onClick={() => {
                onSelectCategory('Plush Companions');
                setMobileMenuOpen(false);
                document.getElementById('catalog-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="text-left px-3 py-2 text-sm text-stone-800 bg-white border border-stone-200 rounded-md"
            >
              Plush Companions
            </button>
            <button
              onClick={() => {
                onSelectCategory('Creative Arts');
                setMobileMenuOpen(false);
                document.getElementById('catalog-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="text-left px-3 py-2 text-sm text-stone-800 bg-white border border-stone-200 rounded-md"
            >
              Creative Arts
            </button>
          </div>

          <div className="pt-2 border-t border-stone-200/80 space-y-2">
            <button
              onClick={() => {
                onOpenGiftFinder();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-between px-3 py-2.5 text-sm font-medium text-amber-900 bg-amber-50/70 border border-amber-200/70 rounded-md text-left"
            >
              <span className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-700" />
                Interactive Gift Finder
              </span>
              <span className="text-xs text-amber-800">Start &rarr;</span>
            </button>

            <button
              onClick={() => {
                onOpenGiftBoxBuilder();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-between px-3 py-2.5 text-sm font-medium text-stone-800 bg-white border border-stone-200 rounded-md text-left"
            >
              <span className="flex items-center gap-2">
                <Gift className="w-4 h-4 text-stone-600" />
                Build-Your-Own Gift Box
              </span>
              <span className="text-xs text-stone-500">Customize &rarr;</span>
            </button>

            <button
              onClick={() => {
                onScrollToStory();
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 text-sm text-stone-700 hover:text-stone-900"
            >
              About Our European Workshop
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
