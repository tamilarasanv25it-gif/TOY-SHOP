import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, ShieldCheck, Tag } from 'lucide-react';
import { CartItem } from '../types/toy';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onProceedToCheckout: () => void;
  appliedPromo: string;
  onApplyPromo: (code: string) => boolean;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  appliedPromo,
  onApplyPromo
}) => {
  if (!isOpen) return null;

  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState('');

  const subtotal = items.reduce((acc, item) => {
    const itemTotal = item.product.price * item.quantity + (item.giftWrap ? 5 * item.quantity : 0);
    return acc + itemTotal;
  }, 0);

  const freeShippingThreshold = 80;
  const isFreeShipping = subtotal >= freeShippingThreshold;
  const distanceToFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const progressPercent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  const discountAmount = appliedPromo ? Math.round(subtotal * 0.15) : 0;
  const shippingCost = items.length === 0 ? 0 : (isFreeShipping ? 0 : 9);
  const finalTotal = subtotal - discountAmount + shippingCost;

  const handlePromoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;

    const valid = onApplyPromo(promoInput.trim().toUpperCase());
    if (valid) {
      setPromoSuccess('Promo code WONDER15 applied (15% Off)');
      setPromoError('');
    } else {
      setPromoError('Invalid code. Try WONDER15');
      setPromoSuccess('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-stone-900/50 backdrop-blur-xs flex justify-end">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between border-l border-stone-200">
        {/* Drawer Header */}
        <div className="px-6 py-4 border-b border-stone-200 flex items-center justify-between bg-[#FAF9F5]">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-4 h-4 text-stone-900" />
            <h2 className="font-serif text-lg font-bold text-stone-900">
              Your Plaything Bag
            </h2>
            <span className="text-xs text-stone-500 tabular-nums">({items.reduce((a, b) => a + b.quantity, 0)} items)</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-stone-200 text-stone-500 hover:text-stone-900 cursor-pointer"
            aria-label="Close bag"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Free Shipping Progress Meter */}
        <div className="px-6 py-3 bg-stone-50 border-b border-stone-200/80">
          <div className="flex justify-between items-center text-xs mb-1.5 font-medium">
            <span className="text-stone-700">
              {isFreeShipping ? (
                <span className="text-emerald-700 font-semibold">✓ You qualify for complimentary courier delivery!</span>
              ) : (
                <span>Add <strong className="text-stone-900 tabular-nums">${distanceToFreeShipping}</strong> more for Free Shipping</span>
              )}
            </span>
            <span className="text-stone-400 tabular-nums">{progressPercent}%</span>
          </div>
          <div className="w-full h-1.5 bg-stone-200 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-300 ${
                isFreeShipping ? 'bg-emerald-600' : 'bg-amber-600'
              }`}
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Itemized Cart List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {items.length === 0 ? (
            <div className="py-16 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center mx-auto text-stone-400">
                <ShoppingBag className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-base font-bold text-stone-800">Your bag is empty</h3>
              <p className="text-xs text-stone-500 max-w-xs mx-auto">
                Explore our handcrafted wooden trains, celestial telescopes, and heirloom linen companions.
              </p>
              <button
                onClick={onClose}
                className="mt-2 px-4 py-2 bg-stone-900 text-white rounded text-xs font-semibold hover:bg-stone-800 cursor-pointer"
              >
                Browse The Catalog
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.product.id}
                className="flex gap-3.5 pb-4 border-b border-stone-100 last:border-0"
              >
                <img
                  src={item.product.image}
                  alt={item.product.title}
                  className="w-18 h-18 object-cover rounded border border-stone-200 bg-stone-100 shrink-0"
                />

                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start gap-2">
                      <h4 className="font-serif text-sm font-bold text-stone-900 truncate">
                        {item.product.title}
                      </h4>
                      <button
                        onClick={() => onRemoveItem(item.product.id)}
                        className="text-stone-400 hover:text-stone-700 p-1 cursor-pointer shrink-0"
                        title="Remove"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="text-[11px] text-stone-500 mt-0.5">
                      <span>{item.product.category}</span>
                      {item.giftWrap && (
                        <span className="block text-amber-800 font-medium">+ Artisanal Gift Wrap (+$5)</span>
                      )}
                      {item.giftNote && (
                        <span className="block italic text-stone-400 truncate">"{item.giftNote}"</span>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-2">
                    {/* Stepper */}
                    <div className="flex items-center border border-stone-200 rounded bg-stone-50">
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, -1)}
                        className="px-2 py-0.5 text-xs text-stone-600 hover:text-stone-900 cursor-pointer"
                      >
                        -
                      </button>
                      <span className="px-2 py-0.5 text-xs font-semibold tabular-nums text-stone-900">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, 1)}
                        className="px-2 py-0.5 text-xs text-stone-600 hover:text-stone-900 cursor-pointer"
                      >
                        +
                      </button>
                    </div>

                    <span className="font-semibold text-sm text-stone-900 tabular-nums">
                      ${(item.product.price * item.quantity + (item.giftWrap ? 5 * item.quantity : 0)).toFixed(0)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer & Order Calculations */}
        {items.length > 0 && (
          <div className="p-6 bg-[#FAF9F5] border-t border-stone-200 space-y-4">
            {/* Promo Code Input */}
            <form onSubmit={handlePromoSubmit} className="space-y-1">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    placeholder="Promo code (try: WONDER15)"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    className="w-full pl-8 pr-3 py-1.5 text-xs uppercase tracking-wider bg-white border border-stone-300 rounded text-stone-900 focus:outline-stone-800"
                  />
                  <Tag className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-2" />
                </div>
                <button
                  type="submit"
                  className="px-3 py-1.5 bg-stone-200 hover:bg-stone-300 text-stone-800 text-xs font-semibold rounded cursor-pointer transition-colors"
                >
                  Apply
                </button>
              </div>
              {promoSuccess && <p className="text-[11px] text-emerald-700 font-medium">{promoSuccess}</p>}
              {promoError && <p className="text-[11px] text-rose-600 font-medium">{promoError}</p>}
            </form>

            {/* Calculations Breakdown */}
            <div className="space-y-1.5 text-xs text-stone-600 pt-2 border-t border-stone-200/80">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span className="tabular-nums text-stone-900 font-medium">${subtotal}</span>
              </div>
              {appliedPromo && (
                <div className="flex justify-between text-emerald-700">
                  <span>Voucher ({appliedPromo} - 15%):</span>
                  <span className="tabular-nums font-medium">-${discountAmount}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Courier Delivery:</span>
                <span className="tabular-nums text-stone-900">
                  {shippingCost === 0 ? 'Complimentary' : `$${shippingCost}`}
                </span>
              </div>
              <div className="pt-2 border-t border-stone-200 flex justify-between text-sm font-bold text-stone-900">
                <span>Estimated Total:</span>
                <span className="tabular-nums font-serif text-base">${finalTotal}</span>
              </div>
            </div>

            {/* Checkout Action */}
            <button
              onClick={() => {
                onClose();
                onProceedToCheckout();
              }}
              className="w-full py-3 px-4 bg-stone-900 hover:bg-stone-800 text-white rounded-md text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-2 text-[11px] text-stone-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
              <span>Encrypted Checkout · 30-Day Return Guarantee</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
