import React from 'react';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { ToyProduct } from '../types/toy';

interface WishlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  wishlist: ToyProduct[];
  onRemoveFromWishlist: (toy: ToyProduct) => void;
  onAddToCart: (toy: ToyProduct) => void;
  onMoveAllToCart: () => void;
  onSelectToy: (toy: ToyProduct) => void;
}

export const WishlistModal: React.FC<WishlistModalProps> = ({
  isOpen,
  onClose,
  wishlist,
  onRemoveFromWishlist,
  onAddToCart,
  onMoveAllToCart,
  onSelectToy
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-stone-900/60 backdrop-blur-xs">
      <div className="relative w-full max-w-xl bg-white rounded-xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="px-6 py-4 bg-[#FAF9F5] border-b border-stone-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="w-4 h-4 fill-rose-500 text-rose-600" />
            <h2 className="font-serif text-lg font-bold text-stone-900">
              Saved Keepsakes & Wishlist
            </h2>
            <span className="text-xs text-stone-500 tabular-nums">({wishlist.length})</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-stone-200 text-stone-500 hover:text-stone-900 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-3">
          {wishlist.length === 0 ? (
            <div className="py-12 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-400 flex items-center justify-center mx-auto">
                <Heart className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-base font-bold text-stone-800">Your wishlist is empty</h3>
              <p className="text-xs text-stone-500 max-w-xs mx-auto">
                Click the heart icon on any handcrafted toy to bookmark it for upcoming birthdays or holidays.
              </p>
            </div>
          ) : (
            wishlist.map((toy) => (
              <div
                key={toy.id}
                className="p-3 border border-stone-200 rounded-lg flex items-center justify-between gap-3 bg-stone-50/50 hover:bg-stone-50 transition-colors"
              >
                <div
                  onClick={() => {
                    onClose();
                    onSelectToy(toy);
                  }}
                  className="flex items-center gap-3 cursor-pointer min-w-0 flex-1"
                >
                  <img
                    src={toy.image}
                    alt={toy.title}
                    className="w-14 h-14 object-cover rounded border border-stone-200 shrink-0"
                  />
                  <div className="truncate">
                    <span className="text-[11px] text-stone-400 uppercase tracking-wider block">{toy.category}</span>
                    <h4 className="font-serif text-sm font-bold text-stone-900 truncate">{toy.title}</h4>
                    <span className="text-xs font-semibold text-stone-800 block mt-0.5 tabular-nums">${toy.price}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => onAddToCart(toy)}
                    className="px-3 py-1.5 bg-stone-900 hover:bg-stone-800 text-white rounded text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Add to Bag</span>
                  </button>
                  <button
                    onClick={() => onRemoveFromWishlist(toy)}
                    className="p-1.5 text-stone-400 hover:text-stone-700 cursor-pointer"
                    title="Remove"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {wishlist.length > 0 && (
          <div className="p-4 bg-[#FAF9F5] border-t border-stone-200 flex justify-between items-center">
            <span className="text-xs text-stone-500">
              Total wishlist value: <strong className="text-stone-900 tabular-nums">${wishlist.reduce((a, b) => a + b.price, 0)}</strong>
            </span>
            <button
              onClick={() => {
                onMoveAllToCart();
                onClose();
              }}
              className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded text-xs font-semibold cursor-pointer"
            >
              Move All to Shopping Bag
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
