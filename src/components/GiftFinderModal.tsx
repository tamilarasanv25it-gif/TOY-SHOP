import React, { useState, useMemo } from 'react';
import { X, Sparkles, ArrowRight, RotateCcw, ShoppingBag, Check } from 'lucide-react';
import { TOY_PRODUCTS } from '../data/toys';
import { ToyProduct, AgeGroup } from '../types/toy';

interface GiftFinderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectToy: (toy: ToyProduct) => void;
  onAddToCart: (toy: ToyProduct) => void;
}

export const GiftFinderModal: React.FC<GiftFinderModalProps> = ({
  isOpen,
  onClose,
  onSelectToy,
  onAddToCart
}) => {
  if (!isOpen) return null;

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedAge, setSelectedAge] = useState<AgeGroup>('3-5 Years');
  const [selectedInterest, setSelectedInterest] = useState<string>('all');
  const [selectedBudget, setSelectedBudget] = useState<'any' | 'under60' | 'under100' | 'luxury'>('any');
  const [addedIds, setAddedIds] = useState<Record<string, boolean>>({});

  const matchedToys = useMemo(() => {
    return TOY_PRODUCTS.filter((toy) => {
      // Age matching
      if (selectedAge !== 'All' && toy.ageGroup !== selectedAge) {
        return false;
      }
      // Interest matching
      if (selectedInterest !== 'all') {
        if (selectedInterest === 'building' && toy.category !== 'Wooden & Montessori') return false;
        if (selectedInterest === 'science' && toy.category !== 'STEM & Science') return false;
        if (selectedInterest === 'creative' && toy.category !== 'Creative Arts') return false;
        if (selectedInterest === 'comfort' && toy.category !== 'Plush Companions' && toy.category !== 'Mechanical & Music') return false;
      }
      // Budget matching
      if (selectedBudget === 'under60' && toy.price > 60) return false;
      if (selectedBudget === 'under100' && toy.price > 100) return false;
      if (selectedBudget === 'luxury' && toy.price < 80) return false;

      return true;
    });
  }, [selectedAge, selectedInterest, selectedBudget]);

  const handleAddFromFinder = (toy: ToyProduct) => {
    onAddToCart(toy);
    setAddedIds((prev) => ({ ...prev, [toy.id]: true }));
    setTimeout(() => {
      setAddedIds((prev) => ({ ...prev, [toy.id]: false }));
    }, 1500);
  };

  const handleReset = () => {
    setStep(1);
    setSelectedAge('3-5 Years');
    setSelectedInterest('all');
    setSelectedBudget('any');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-stone-900/60 backdrop-blur-xs">
      <div className="relative w-full max-w-2xl bg-white rounded-xl shadow-2xl border border-stone-200 overflow-hidden">
        {/* Top Header */}
        <div className="px-6 py-4 bg-[#FAF9F5] border-b border-stone-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-700" />
            <span className="font-serif text-lg font-bold text-stone-900">
              The Wunderkind Gift Advisor
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-stone-200 text-stone-500 hover:text-stone-900 cursor-pointer"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Wizard Progress Steps */}
        <div className="px-6 py-2 bg-stone-50 border-b border-stone-200/70 flex items-center justify-between text-xs text-stone-500">
          <span className={step === 1 ? 'font-semibold text-amber-900' : ''}>1. Age Bracket</span>
          <span>·</span>
          <span className={step === 2 ? 'font-semibold text-amber-900' : ''}>2. Spark of Interest</span>
          <span>·</span>
          <span className={step === 3 ? 'font-semibold text-amber-900' : ''}>3. Curated Matches</span>
        </div>

        {/* Step Content */}
        <div className="p-6">
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="font-serif text-xl font-bold text-stone-900 text-center">
                Who are we choosing a wonder for?
              </h3>
              <p className="text-xs text-stone-500 text-center max-w-md mx-auto">
                Select the child's developmental milestone stage to ensure ideal motor ergonomics and safety.
              </p>

              <div className="grid grid-cols-2 gap-3 pt-2">
                {[
                  { age: '0-2 Years', label: 'Infant & Toddler', desc: 'Tactile plush, soft rattles & gentle discovery' },
                  { age: '3-5 Years', label: 'Curious Explorer', desc: 'Wooden trains, music carousels & balance blocks' },
                  { age: '6-8 Years', label: 'Junior Builder', desc: 'Gothic architecture & tabletop telescopes' },
                  { age: '9+ Years', label: 'Inquisitive Mind', desc: 'Kinetic solar rovers & mechanical automatons' }
                ].map((item) => (
                  <button
                    key={item.age}
                    onClick={() => {
                      setSelectedAge(item.age as AgeGroup);
                      setStep(2);
                    }}
                    className={`p-4 text-left border rounded-lg transition-all cursor-pointer ${
                      selectedAge === item.age
                        ? 'border-amber-800 bg-amber-50/60 ring-1 ring-amber-700'
                        : 'border-stone-200 hover:border-stone-300 hover:bg-stone-50'
                    }`}
                  >
                    <span className="font-serif text-base font-bold text-stone-900 block">{item.label}</span>
                    <span className="text-xs font-semibold text-amber-800 block mt-0.5">Ages {item.age}</span>
                    <p className="text-[11px] text-stone-500 mt-1 leading-normal">{item.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h3 className="font-serif text-xl font-bold text-stone-900 text-center">
                What sparks their imagination most?
              </h3>
              <p className="text-xs text-stone-500 text-center max-w-md mx-auto">
                Match their play inclination to foster genuine long-term engagement.
              </p>

              <div className="grid grid-cols-2 gap-3 pt-2">
                {[
                  { id: 'building', label: 'Crafting & Construction', desc: 'Tactile wooden tracks, arches, and stacking' },
                  { id: 'science', label: 'Cosmos & Discovery', desc: 'Stargazing optics, solar energy & gears' },
                  { id: 'comfort', label: 'Soothing & Companionship', desc: 'Heirloom Belgian linen bears & music boxes' },
                  { id: 'creative', label: 'Art & Expression', desc: 'Botanical pigments & open sensory play' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setSelectedInterest(item.id);
                      setStep(3);
                    }}
                    className={`p-4 text-left border rounded-lg transition-all cursor-pointer ${
                      selectedInterest === item.id
                        ? 'border-amber-800 bg-amber-50/60 ring-1 ring-amber-700'
                        : 'border-stone-200 hover:border-stone-300 hover:bg-stone-50'
                    }`}
                  >
                    <span className="font-serif text-base font-bold text-stone-900 block">{item.label}</span>
                    <p className="text-[11px] text-stone-500 mt-1 leading-normal">{item.desc}</p>
                  </button>
                ))}
              </div>

              <div className="flex justify-between items-center pt-3 border-t border-stone-200 text-xs">
                <button
                  onClick={() => setStep(1)}
                  className="text-stone-500 hover:text-stone-800 cursor-pointer"
                >
                  &larr; Back to Age
                </button>
                <button
                  onClick={() => {
                    setSelectedInterest('all');
                    setStep(3);
                  }}
                  className="font-semibold text-amber-800 hover:text-amber-900 cursor-pointer"
                >
                  Skip to All Recommendations &rarr;
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-stone-200 pb-2">
                <div>
                  <h3 className="font-serif text-lg font-bold text-stone-900">
                    Hand-Curated Recommendations
                  </h3>
                  <span className="text-xs text-stone-500">
                    Matched for Ages {selectedAge} · {matchedToys.length} heirloom gifts found
                  </span>
                </div>
                <button
                  onClick={handleReset}
                  className="flex items-center gap-1 text-xs text-stone-500 hover:text-stone-800 cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Restart</span>
                </button>
              </div>

              {matchedToys.length === 0 ? (
                <div className="py-8 text-center space-y-2">
                  <p className="text-sm text-stone-600">No exact matches with these specific filters.</p>
                  <button
                    onClick={() => {
                      setSelectedInterest('all');
                      setSelectedAge('All');
                    }}
                    className="text-xs text-amber-800 font-semibold hover:underline"
                  >
                    View All Available Playthings
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-80 overflow-y-auto pr-1">
                  {matchedToys.map((toy) => (
                    <div
                      key={toy.id}
                      className="p-3 border border-stone-200 rounded-lg flex flex-col justify-between bg-stone-50/50 hover:bg-stone-50 transition-colors"
                    >
                      <div className="flex gap-3">
                        <img
                          src={toy.image}
                          alt={toy.title}
                          className="w-16 h-16 object-cover rounded border border-stone-200 shrink-0"
                        />
                        <div className="min-w-0">
                          <span className="text-[10px] text-stone-400 block uppercase tracking-wider">{toy.category}</span>
                          <h4 className="font-serif text-sm font-bold text-stone-900 truncate">{toy.title}</h4>
                          <span className="text-xs font-semibold text-stone-800 mt-1 block tabular-nums">${toy.price}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 mt-3 pt-2 border-t border-stone-200/60">
                        <button
                          onClick={() => {
                            onClose();
                            onSelectToy(toy);
                          }}
                          className="flex-1 py-1 px-2 text-xs font-medium text-stone-700 bg-white border border-stone-300 rounded hover:bg-stone-100 cursor-pointer"
                        >
                          View Details
                        </button>
                        <button
                          onClick={() => handleAddFromFinder(toy)}
                          className="py-1 px-3 text-xs font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded flex items-center gap-1 cursor-pointer"
                        >
                          {addedIds[toy.id] ? (
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                          ) : (
                            <ShoppingBag className="w-3.5 h-3.5" />
                          )}
                          <span>{addedIds[toy.id] ? 'Added' : 'Add'}</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
