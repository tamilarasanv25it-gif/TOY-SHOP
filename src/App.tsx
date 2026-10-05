import React, { useState, useMemo, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ToyCard } from './components/ToyCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { GiftFinderModal } from './components/GiftFinderModal';
import { GiftBoxBuilder } from './components/GiftBoxBuilder';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { WishlistModal } from './components/WishlistModal';
import { CraftsmanshipStory } from './components/CraftsmanshipStory';
import { Footer } from './components/Footer';
import { TOY_PRODUCTS, CATEGORIES, AGE_GROUPS } from './data/toys';
import { ToyProduct, ToyCategory, AgeGroup, CartItem, OrderConfirmation } from './types/toy';
import { SlidersHorizontal, Sparkles, Gift, Check, ArrowUpDown } from 'lucide-react';

export default function App() {
  // Navigation & Category states
  const [selectedCategory, setSelectedCategory] = useState<ToyCategory>('All');
  const [selectedAge, setSelectedAge] = useState<AgeGroup>('All');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [searchQuery, setSearchQuery] = useState('');

  // Cart & Wishlist state
  const [cart, setCart] = useState<CartItem[]>(() => {
    // Initial seeded bag item for pleasant immediate interaction
    return [
      {
        product: TOY_PRODUCTS[0],
        quantity: 1,
        giftWrap: false
      }
    ];
  });
  const [wishlist, setWishlist] = useState<ToyProduct[]>(() => [TOY_PRODUCTS[1]]);
  const [appliedPromo, setAppliedPromo] = useState('');

  // Modal display states
  const [selectedToy, setSelectedToy] = useState<ToyProduct | null>(null);
  const [isGiftFinderOpen, setIsGiftFinderOpen] = useState(false);
  const [isGiftBoxOpen, setIsGiftBoxOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);

  // Cart helper functions
  const handleAddToCart = (toy: ToyProduct, quantity = 1, giftWrap = false, giftNote?: string) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === toy.id && item.giftWrap === giftWrap);
      if (existing) {
        return prev.map((item) =>
          item.product.id === toy.id && item.giftWrap === giftWrap
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product: toy, quantity, giftWrap, giftNote }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateCartQuantity = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.product.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null)
    );
  };

  const handleRemoveCartItem = (id: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== id));
  };

  const handleApplyPromo = (code: string) => {
    if (code === 'WONDER15' || code === 'WELCOME10' || code === 'WUNDERKIND') {
      setAppliedPromo(code);
      return true;
    }
    return false;
  };

  // Gift box bundle to cart
  const handleAddGiftBoxToCart = (
    toys: ToyProduct[],
    boxName: string,
    note: string,
    price: number
  ) => {
    // Add each toy as part of the bundled box
    toys.forEach((toy, index) => {
      handleAddToCart(
        {
          ...toy,
          price: Math.round(toy.price * 0.9), // 10% discount on items in box
          title: index === 0 ? `${toy.title} (in ${boxName})` : toy.title
        },
        1,
        false,
        note
      );
    });
  };

  // Wishlist helper functions
  const handleToggleWishlist = (toy: ToyProduct) => {
    setWishlist((prev) => {
      const exists = prev.some((t) => t.id === toy.id);
      if (exists) {
        return prev.filter((t) => t.id !== toy.id);
      }
      return [...prev, toy];
    });
  };

  const handleMoveAllWishlistToCart = () => {
    wishlist.forEach((toy) => handleAddToCart(toy, 1, false));
    setWishlist([]);
    setIsCartOpen(true);
  };

  // Cart totals calculation
  const cartSubtotal = cart.reduce((acc, item) => {
    return acc + (item.product.price * item.quantity + (item.giftWrap ? 5 * item.quantity : 0));
  }, 0);
  const cartDiscount = appliedPromo ? Math.round(cartSubtotal * 0.15) : 0;
  const cartShipping = cartSubtotal >= 80 || cart.length === 0 ? 0 : 9;
  const cartTotal = cartSubtotal - cartDiscount + cartShipping;

  // Filtered & Sorted catalog items
  const filteredToys = useMemo(() => {
    return TOY_PRODUCTS.filter((toy) => {
      // Category filter
      if (selectedCategory !== 'All' && toy.category !== selectedCategory) {
        return false;
      }
      // Age filter
      if (selectedAge !== 'All' && toy.ageGroup !== selectedAge) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = toy.title.toLowerCase().includes(query);
        const matchesCategory = toy.category.toLowerCase().includes(query);
        const matchesDesc = toy.description.toLowerCase().includes(query);
        const matchesSkills = toy.developmentalSkills.some((s) => s.toLowerCase().includes(query));
        if (!matchesTitle && !matchesCategory && !matchesDesc && !matchesSkills) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      // Default: featured first
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [selectedCategory, selectedAge, searchQuery, sortBy]);

  const handleScrollToStory = () => {
    document.getElementById('craft-story')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#FAF9F5] text-stone-900 flex flex-col font-sans">
      {/* Top Bar with 3-Zone contract */}
      <Navbar
        cartCount={cart.reduce((a, b) => a + b.quantity, 0)}
        wishlistCount={wishlist.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenGiftFinder={() => setIsGiftFinderOpen(true)}
        onOpenGiftBoxBuilder={() => setIsGiftBoxOpen(true)}
        onSelectCategory={setSelectedCategory}
        selectedCategory={selectedCategory}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onScrollToStory={handleScrollToStory}
      />

      {/* Hero section */}
      <Hero
        onExploreCatalog={() => {
          document.getElementById('catalog-section')?.scrollIntoView({ behavior: 'smooth' });
        }}
        onOpenGiftFinder={() => setIsGiftFinderOpen(true)}
      />

      {/* Main Catalog Viewport */}
      <main id="catalog-section" className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 w-full">
        {/* Curated Interactive Studio Strip */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div
            onClick={() => setIsGiftFinderOpen(true)}
            className="p-5 bg-stone-900 text-white rounded-xl flex items-center justify-between cursor-pointer group hover:bg-stone-800 transition-colors shadow-xs"
          >
            <div className="space-y-1">
              <span className="text-[11px] font-semibold uppercase tracking-widest text-amber-300 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Gift Finder Advisor</span>
              </span>
              <h3 className="font-serif text-lg font-bold">Unsure what to choose?</h3>
              <p className="text-xs text-stone-300">
                Match by developmental age & curious interests in 3 quick questions.
              </p>
            </div>
            <span className="text-xs font-semibold text-amber-300 group-hover:translate-x-1 transition-transform ml-4 shrink-0">
              Start Advisor &rarr;
            </span>
          </div>

          <div
            onClick={() => setIsGiftBoxOpen(true)}
            className="p-5 bg-[#EAE8DF] text-stone-900 rounded-xl flex items-center justify-between cursor-pointer group hover:bg-[#E3E0D5] transition-colors border border-stone-300/80 shadow-xs"
          >
            <div className="space-y-1">
              <span className="text-[11px] font-semibold uppercase tracking-widest text-stone-600 flex items-center gap-1.5">
                <Gift className="w-3.5 h-3.5 text-stone-700" />
                <span>Keepsake Studio</span>
              </span>
              <h3 className="font-serif text-lg font-bold">Bespoke Crate Builder</h3>
              <p className="text-xs text-stone-600">
                Bundle 1-3 toys inside an artisan pine chest with wax-sealed ribbon & note.
              </p>
            </div>
            <span className="text-xs font-semibold text-stone-800 group-hover:translate-x-1 transition-transform ml-4 shrink-0">
              Build Crate &rarr;
            </span>
          </div>
        </div>

        {/* Section Heading & Filter Header */}
        <div className="space-y-4 pt-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-stone-200 pb-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-stone-500 mb-1">
                <span>The Workshop Collection</span>
                <span aria-hidden="true">·</span>
                <span className="tabular-nums">{filteredToys.length} Playthings Available</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
                {selectedCategory === 'All' ? 'Every Plaything in Our Workshop' : selectedCategory}
              </h2>
            </div>

            {/* Sorting & Filter Affordance */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 text-xs text-stone-600 bg-white border border-stone-300 rounded-md px-3 py-1.5">
                <ArrowUpDown className="w-3.5 h-3.5 text-stone-400" />
                <span className="text-stone-500">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-transparent font-medium text-stone-800 focus:outline-none cursor-pointer"
                >
                  <option value="featured">Workshop Favorites</option>
                  <option value="rating">Highest Rated</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                </select>
              </div>
            </div>
          </div>

          {/* Interactive Filter Tabs / Segmented Controls (Section 1.A DO) */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Category Segmented Buttons */}
            <div className="flex flex-wrap items-center gap-1.5 p-1 bg-stone-100 rounded-lg">
              {CATEGORIES.map((category) => {
                const isActive = selectedCategory === category;
                return (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                      isActive
                        ? 'bg-white text-stone-900 shadow-xs font-semibold'
                        : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>

            {/* Age Filter Segmented Buttons */}
            <div className="flex items-center gap-1 text-xs">
              <span className="text-stone-400 mr-1 hidden sm:inline">Age:</span>
              <div className="flex items-center gap-1 p-1 bg-stone-100 rounded-lg">
                {AGE_GROUPS.map((age) => {
                  const isActive = selectedAge === age;
                  return (
                    <button
                      key={age}
                      onClick={() => setSelectedAge(age)}
                      className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                        isActive
                          ? 'bg-white text-stone-900 shadow-xs font-semibold'
                          : 'text-stone-600 hover:text-stone-900'
                      }`}
                    >
                      {age === 'All' ? 'All Ages' : age}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Product Catalog Grid (3-column desktop / 2-column tablet per Section 2.A) */}
        {filteredToys.length === 0 ? (
          <div className="py-20 text-center space-y-3 bg-white rounded-xl border border-stone-200">
            <h3 className="font-serif text-lg font-bold text-stone-800">
              No playthings match your active search or filters
            </h3>
            <p className="text-xs text-stone-500 max-w-sm mx-auto">
              Try selecting a different age bracket or resetting your search term.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSelectedAge('All');
                setSearchQuery('');
              }}
              className="px-4 py-2 bg-stone-900 text-white rounded text-xs font-semibold hover:bg-stone-800 cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredToys.map((toy) => (
              <ToyCard
                key={toy.id}
                toy={toy}
                onSelect={(selected) => setSelectedToy(selected)}
                onAddToCart={(addedToy) => handleAddToCart(addedToy)}
                isWishlisted={wishlist.some((w) => w.id === toy.id)}
                onToggleWishlist={handleToggleWishlist}
              />
            ))}
          </div>
        )}
      </main>

      {/* Craftsmanship & Sustainability Story section */}
      <CraftsmanshipStory />

      {/* Editorial Footer */}
      <Footer />

      {/* Product Detail Modal */}
      <ProductDetailModal
        toy={selectedToy}
        onClose={() => setSelectedToy(null)}
        onAddToCart={handleAddToCart}
        isWishlisted={selectedToy ? wishlist.some((w) => w.id === selectedToy.id) : false}
        onToggleWishlist={handleToggleWishlist}
      />

      {/* Gift Finder Modal */}
      <GiftFinderModal
        isOpen={isGiftFinderOpen}
        onClose={() => setIsGiftFinderOpen(false)}
        onSelectToy={(toy) => setSelectedToy(toy)}
        onAddToCart={(toy) => handleAddToCart(toy)}
      />

      {/* Bespoke Gift Box Builder */}
      <GiftBoxBuilder
        isOpen={isGiftBoxOpen}
        onClose={() => setIsGiftBoxOpen(false)}
        onAddBoxToCart={handleAddGiftBoxToCart}
      />

      {/* Slide-over Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onProceedToCheckout={() => setIsCheckoutOpen(true)}
        appliedPromo={appliedPromo}
        onApplyPromo={handleApplyPromo}
      />

      {/* Multi-step Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cart}
        subtotal={cartSubtotal}
        discount={cartDiscount}
        shipping={cartShipping}
        total={cartTotal}
        onOrderComplete={(order) => {
          // Clear cart on successful order
          setCart([]);
        }}
      />

      {/* Saved Wishlist Modal */}
      <WishlistModal
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlist={wishlist}
        onRemoveFromWishlist={handleToggleWishlist}
        onAddToCart={(toy) => handleAddToCart(toy)}
        onMoveAllToCart={handleMoveAllWishlistToCart}
        onSelectToy={(toy) => setSelectedToy(toy)}
      />
    </div>
  );
}
