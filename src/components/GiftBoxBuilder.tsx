import React, { useState } from 'react';
import { X, Gift, Check, Sparkles, Plus, Trash2 } from 'lucide-react';
import { TOY_PRODUCTS } from '../data/toys';
import { ToyProduct } from '../types/toy';

interface GiftBoxBuilderProps {
  isOpen: boolean;
  onClose: () => void;
  onAddBoxToCart: (items: ToyProduct[], boxName: string, note: string, price: number) => void;
}

export const GiftBoxBuilder: React.FC<GiftBoxBuilderProps> = ({
  isOpen,
  onClose,
  onAddBoxToCart
}) => {
  if (!isOpen) return null;

  const [boxStyle, setBoxStyle] = useState<'pinewood' | 'hatbox' | 'linen'>('pinewood');
  const [ribbonColor, setRibbonColor] = useState<'sage' | 'amber' | 'crimson' | 'navy'>('amber');
  const [selectedToyIds, setSelectedToyIds] = useState<string[]>([
    TOY_PRODUCTS[0].id,
    TOY_PRODUCTS[2].id
  ]);
  const [recipientName, setRecipientName] = useState('Little Arthur');
  const [giftMessage, setGiftMessage] = useState('May your days be filled with curious discoveries and boundless adventures. With all our love, Grandma & Grandpa');
  const [addedSuccess, setAddedSuccess] = useState(false);

  const boxOptions = {
    pinewood: { name: 'Artisan Solid Pine Wood Crate', fee: 18, desc: 'Re-usable keepsake toy chest with sliding brass latch' },
    hatbox: { name: 'Vintage Gold-Foil Hatbox', fee: 14, desc: 'Sturdy embossed millboard with velvet cord handle' },
    linen: { name: 'Organic Embroidered Linen Sack', fee: 12, desc: 'Natural flax drawstring bag with wooden name bead' }
  };

  const ribbonOptions = {
    sage: { name: 'Alpine Sage', hex: '#60725F' },
    amber: { name: 'Warm Honey Amber', hex: '#D97706' },
    crimson: { name: 'Velvet Crimson', hex: '#991B1B' },
    navy: { name: 'Midnight Navy', hex: '#1E293B' }
  };

  const selectedToys = TOY_PRODUCTS.filter((t) => selectedToyIds.includes(t.id));
  const toysSubtotal = selectedToys.reduce((acc, t) => acc + t.price, 0);
  const boxCost = boxOptions[boxStyle].fee;
  // 10% gift bundle discount on toys
  const bundleDiscount = Math.round(toysSubtotal * 0.1);
  const totalBoxPrice = toysSubtotal - bundleDiscount + boxCost;

  const toggleToySelection = (id: string) => {
    if (selectedToyIds.includes(id)) {
      if (selectedToyIds.length > 1) {
        setSelectedToyIds(selectedToyIds.filter((tid) => tid !== id));
      }
    } else {
      if (selectedToyIds.length < 3) {
        setSelectedToyIds([...selectedToyIds, id]);
      }
    }
  };

  const handleAddBox = () => {
    onAddBoxToCart(
      selectedToys,
      `${boxOptions[boxStyle].name} (${ribbonOptions[ribbonColor].name} Ribbon)`,
      `To: ${recipientName} — "${giftMessage}"`,
      totalBoxPrice
    );
    setAddedSuccess(true);
    setTimeout(() => {
      setAddedSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-stone-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white rounded-xl shadow-2xl border border-stone-200 overflow-hidden my-auto max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 bg-[#FAF9F5] border-b border-stone-200 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <Gift className="w-5 h-5 text-amber-700" />
            <div>
              <h2 className="font-serif text-lg font-bold text-stone-900 leading-tight">
                The Bespoke Gift Box Studio
              </h2>
              <span className="text-xs text-stone-500">
                Curate an heirloom present packaged in certified sustainable keepsakes
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-stone-200 text-stone-500 hover:text-stone-900 cursor-pointer"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Studio Body (2 columns) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 overflow-y-auto flex-1">
          {/* Left Configuration Column */}
          <div className="lg:col-span-7 p-6 space-y-6 border-b lg:border-b-0 lg:border-r border-stone-200">
            {/* Step 1: Select Box Crate */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-stone-700">
                  1. Choose Keepsake Packaging
                </span>
                <span className="text-[11px] text-stone-400">Reusable for keepsakes</span>
              </div>
              <div className="grid grid-cols-3 gap-2.5">
                {(Object.keys(boxOptions) as Array<keyof typeof boxOptions>).map((key) => {
                  const opt = boxOptions[key];
                  const isSelected = boxStyle === key;
                  return (
                    <button
                      key={key}
                      onClick={() => setBoxStyle(key)}
                      className={`p-3 text-left border rounded-lg transition-all cursor-pointer ${
                        isSelected
                          ? 'border-amber-800 bg-amber-50/60 ring-1 ring-amber-700'
                          : 'border-stone-200 hover:border-stone-300 bg-stone-50/50'
                      }`}
                    >
                      <span className="font-serif text-xs font-bold text-stone-900 block truncate">{opt.name}</span>
                      <span className="text-xs font-semibold text-amber-900 mt-1 block tabular-nums">+${opt.fee}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Select Satin Ribbon */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-stone-700">
                  2. Hand-Tied Satin Ribbon
                </span>
                <span className="text-[11px] text-stone-500 font-medium">
                  {ribbonOptions[ribbonColor].name}
                </span>
              </div>
              <div className="flex items-center gap-3">
                {(Object.keys(ribbonOptions) as Array<keyof typeof ribbonOptions>).map((col) => {
                  const opt = ribbonOptions[col];
                  return (
                    <button
                      key={col}
                      onClick={() => setRibbonColor(col)}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-medium cursor-pointer transition-colors ${
                        ribbonColor === col
                          ? 'border-stone-800 bg-white ring-2 ring-stone-800'
                          : 'border-stone-200 bg-stone-50 hover:bg-white'
                      }`}
                    >
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-black/10 shrink-0"
                        style={{ backgroundColor: opt.hex }}
                      />
                      <span>{opt.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Select up to 3 Toys */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-stone-700">
                  3. Select 1 to 3 Toys ({selectedToyIds.length}/3 selected)
                </span>
                <span className="text-xs font-medium text-emerald-700">
                  Includes 10% Bundle Discount
                </span>
              </div>

              <div className="space-y-2 max-h-52 overflow-y-auto pr-1">
                {TOY_PRODUCTS.map((toy) => {
                  const isChecked = selectedToyIds.includes(toy.id);
                  return (
                    <div
                      key={toy.id}
                      onClick={() => toggleToySelection(toy.id)}
                      className={`p-2.5 border rounded-lg flex items-center justify-between cursor-pointer transition-colors ${
                        isChecked
                          ? 'bg-amber-50/50 border-amber-300'
                          : 'bg-white border-stone-200 hover:bg-stone-50'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <img
                          src={toy.image}
                          alt={toy.title}
                          className="w-10 h-10 object-cover rounded border border-stone-200 shrink-0"
                        />
                        <div className="truncate">
                          <span className="text-xs font-semibold text-stone-900 block truncate">{toy.title}</span>
                          <span className="text-[11px] text-stone-500">Ages {toy.ageGroup}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 shrink-0 ml-2">
                        <span className="text-xs font-bold text-stone-800 tabular-nums">${toy.price}</span>
                        <div
                          className={`w-5 h-5 rounded flex items-center justify-center text-xs ${
                            isChecked ? 'bg-amber-700 text-white' : 'border border-stone-300 bg-white'
                          }`}
                        >
                          {isChecked && <Check className="w-3.5 h-3.5" />}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 4: Handwritten Gift Tag Note */}
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-stone-700 block mb-2">
                4. Personalized Calligraphy Card Note
              </span>
              <div className="space-y-2">
                <input
                  type="text"
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  placeholder="Recipient Name (e.g. Leo)"
                  className="w-full px-3 py-1.5 bg-stone-50 border border-stone-300 rounded text-xs text-stone-900 focus:outline-stone-800"
                />
                <textarea
                  value={giftMessage}
                  onChange={(e) => setGiftMessage(e.target.value)}
                  rows={2}
                  placeholder="Your handwritten note..."
                  className="w-full px-3 py-1.5 bg-stone-50 border border-stone-300 rounded text-xs text-stone-900 focus:outline-stone-800 leading-relaxed"
                />
              </div>
            </div>
          </div>

          {/* Right Column: Live Gift Box Preview & Summary */}
          <div className="lg:col-span-5 bg-[#FAF9F5] p-6 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-stone-500 block">
                Live Gift Package Preview
              </span>

              {/* Visual Keepsake Card Card */}
              <div className="bg-white border border-stone-200 rounded-lg p-4 shadow-xs relative overflow-hidden">
                <div
                  className="absolute top-0 left-0 right-0 h-2"
                  style={{ backgroundColor: ribbonOptions[ribbonColor].hex }}
                />

                <div className="flex items-center justify-between text-xs text-stone-500 mb-2 mt-1">
                  <span className="font-serif font-bold text-stone-800">{boxOptions[boxStyle].name}</span>
                  <span className="text-[11px] text-stone-400">Wax Sealed</span>
                </div>

                {/* Hand calligraphed preview note */}
                <div className="p-3 bg-amber-50/50 border border-amber-200/60 rounded italic text-xs text-stone-800 font-serif leading-relaxed">
                  <div className="font-bold not-italic font-sans text-stone-900 mb-1">
                    To: {recipientName || 'Our Special Child'}
                  </div>
                  "{giftMessage || 'A keepsake of wonder...'}"
                </div>

                {/* Included Toys List */}
                <div className="mt-3 pt-3 border-t border-stone-100 space-y-1.5">
                  <span className="text-[11px] font-semibold text-stone-600 uppercase tracking-wider block">
                    Inside The Crate:
                  </span>
                  {selectedToys.map((t) => (
                    <div key={t.id} className="flex justify-between items-center text-xs text-stone-700">
                      <span className="truncate pr-2">{t.title}</span>
                      <span className="tabular-nums font-semibold shrink-0">${t.price}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price Calculation */}
              <div className="p-4 bg-white border border-stone-200 rounded-lg space-y-2 text-xs">
                <div className="flex justify-between text-stone-500">
                  <span>Toys Subtotal ({selectedToys.length} items):</span>
                  <span className="tabular-nums">${toysSubtotal}</span>
                </div>
                <div className="flex justify-between text-stone-500">
                  <span>Keepsake Packaging & Satin Ribbon:</span>
                  <span className="tabular-nums">+${boxCost}</span>
                </div>
                <div className="flex justify-between text-emerald-700 font-medium">
                  <span>Curated Box Bundle (10% Off):</span>
                  <span className="tabular-nums">-${bundleDiscount}</span>
                </div>
                <div className="pt-2 border-t border-stone-200 flex justify-between text-stone-900 font-bold text-sm">
                  <span>Total Box Value:</span>
                  <span className="tabular-nums font-serif text-base">${totalBoxPrice}</span>
                </div>
              </div>
            </div>

            {/* Pack CTA */}
            <div className="pt-4">
              <button
                onClick={handleAddBox}
                className="w-full py-3 px-4 bg-stone-900 hover:bg-stone-800 text-white rounded-md text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs"
              >
                {addedSuccess ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Gift Box Added to Shopping Bag!</span>
                  </>
                ) : (
                  <>
                    <Gift className="w-4 h-4" />
                    <span>Pack & Add Gift Box to Bag · ${totalBoxPrice}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
