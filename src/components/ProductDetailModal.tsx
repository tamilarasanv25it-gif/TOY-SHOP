import React, { useState } from 'react';
import { X, Heart, ShoppingBag, Volume2, Star, ShieldCheck, Check, Sparkles } from 'lucide-react';
import { ToyProduct, Review } from '../types/toy';
import { playToySound } from '../utils/audioSynth';

interface ProductDetailModalProps {
  toy: ToyProduct | null;
  onClose: () => void;
  onAddToCart: (toy: ToyProduct, quantity: number, giftWrap: boolean) => void;
  isWishlisted: boolean;
  onToggleWishlist: (toy: ToyProduct) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  toy,
  onClose,
  onAddToCart,
  isWishlisted,
  onToggleWishlist
}) => {
  if (!toy) return null;

  const [quantity, setQuantity] = useState(1);
  const [giftWrap, setGiftWrap] = useState(false);
  const [isPlayingSound, setIsPlayingSound] = useState(false);
  const [addedNotice, setAddedNotice] = useState(false);

  // Review submission state
  const [reviewsList, setReviewsList] = useState<Review[]>(toy.reviews);
  const [reviewAuthor, setReviewAuthor] = useState('');
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewSuccess, setReviewSuccess] = useState(false);

  const handleSoundTest = () => {
    if (toy.soundType) {
      setIsPlayingSound(true);
      playToySound(toy.soundType);
      setTimeout(() => setIsPlayingSound(false), 1400);
    }
  };

  const handleAdd = () => {
    onAddToCart(toy, quantity, giftWrap);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2000);
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewAuthor.trim() || !reviewComment.trim()) return;

    const newRev: Review = {
      id: `rev-${Date.now()}`,
      author: reviewAuthor.trim(),
      rating: reviewRating,
      date: 'Just now',
      title: reviewTitle.trim() || 'Wonderful craftsmanship',
      comment: reviewComment.trim(),
      verified: true
    };

    setReviewsList([newRev, ...reviewsList]);
    setReviewAuthor('');
    setReviewTitle('');
    setReviewComment('');
    setShowReviewForm(false);
    setReviewSuccess(true);
    setTimeout(() => setReviewSuccess(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-stone-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white rounded-xl shadow-2xl border border-stone-200 overflow-hidden my-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/90 hover:bg-stone-100 text-stone-600 hover:text-stone-900 border border-stone-200 transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 max-h-[85vh] overflow-y-auto">
          {/* Left Column: Visual Gallery & Sound Stage */}
          <div className="md:col-span-6 bg-[#F6F5F0] p-6 sm:p-8 flex flex-col justify-between border-b md:border-b-0 md:border-r border-stone-200">
            <div className="space-y-4">
              <div className="relative rounded-lg overflow-hidden border border-stone-200 bg-white aspect-4/3 shadow-2xs">
                <img
                  src={toy.image}
                  alt={toy.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center"
                />

                {toy.badge && (
                  <div className="absolute top-3 left-3 text-xs font-semibold uppercase tracking-wider text-stone-800 bg-white/95 px-2.5 py-1 rounded-sm border border-stone-200 shadow-2xs">
                    {toy.badge}
                  </div>
                )}
              </div>

              {/* Sound Test Affordance */}
              {toy.soundType && (
                <div className="p-3.5 bg-white rounded-lg border border-stone-200/90 flex items-center justify-between">
                  <div className="text-xs">
                    <span className="font-semibold text-stone-800 block">Acoustic Sound Sample</span>
                    <span className="text-stone-500">{toy.soundLabel || 'Mechanical acoustic tone'}</span>
                  </div>
                  <button
                    onClick={handleSoundTest}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold text-white transition-colors cursor-pointer ${
                      isPlayingSound ? 'bg-amber-800 ring-2 ring-amber-400' : 'bg-stone-900 hover:bg-stone-800'
                    }`}
                  >
                    <Volume2 className={`w-3.5 h-3.5 ${isPlayingSound ? 'animate-bounce text-amber-300' : ''}`} />
                    <span>{isPlayingSound ? 'Auditioning…' : 'Play Sample'}</span>
                  </button>
                </div>
              )}

              {/* Physical specifications */}
              <div className="space-y-2 text-xs text-stone-600 pt-2">
                <div className="flex justify-between py-1 border-b border-stone-200/60">
                  <span className="text-stone-500">Materials:</span>
                  <span className="font-medium text-stone-800 text-right">{toy.materials}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-stone-200/60">
                  <span className="text-stone-500">Dimensions:</span>
                  <span className="font-medium text-stone-800">{toy.dimensions}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-stone-200/60">
                  <span className="text-stone-500">Age Suitability:</span>
                  <span className="font-medium text-stone-800">{toy.ageGroup}</span>
                </div>
              </div>
            </div>

            {/* Safety certifications */}
            <div className="pt-4 mt-4 border-t border-stone-200">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-stone-800 mb-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-700" />
                <span>Certified Child-Safe Standards</span>
              </div>
              <div className="flex flex-wrap gap-x-2 gap-y-1 text-[11px] text-stone-500">
                {toy.safetyCertifications.map((cert, idx) => (
                  <span key={idx}>
                    {cert}
                    {idx < toy.safetyCertifications.length - 1 && <span aria-hidden="true" className="ml-2 text-stone-300">·</span>}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Contiguous Purchase Module & Reviews */}
          <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              {/* Quiet unboxed metadata */}
              <div className="flex items-center gap-2 text-xs text-stone-500">
                <span>{toy.category}</span>
                <span aria-hidden="true">·</span>
                <span>Ages {toy.ageGroup}</span>
                <span aria-hidden="true">·</span>
                <span className={toy.inStock ? 'text-emerald-700 font-medium' : 'text-rose-600'}>
                  {toy.inStock ? `In Stock (${toy.stockCount} left)` : 'Backordered'}
                </span>
              </div>

              {/* Title & Price */}
              <div>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 leading-tight">
                  {toy.title}
                </h2>
                <p className="text-sm text-stone-500 mt-1">{toy.subtitle}</p>

                <div className="flex items-baseline gap-3 mt-3">
                  <span className="font-serif text-2xl font-bold text-stone-900 tabular-nums">
                    ${toy.price}
                  </span>
                  {toy.originalPrice && (
                    <span className="text-sm text-stone-400 line-through tabular-nums">
                      ${toy.originalPrice}
                    </span>
                  )}
                  <div className="ml-auto flex items-center gap-1 text-xs text-stone-600">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                    <span className="font-bold tabular-nums text-stone-800">{toy.rating}</span>
                    <span className="text-stone-400">({reviewsList.length} reviews)</span>
                  </div>
                </div>
              </div>

              {/* Narrative Description */}
              <p className="text-sm text-stone-600 leading-relaxed">
                {toy.description}
              </p>

              {/* Developmental Skills (clean unboxed text with dots) */}
              <div className="pt-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-stone-500 block mb-1.5">
                  Developmental Skills Fostered
                </span>
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-stone-700">
                  {toy.developmentalSkills.map((skill, i) => (
                    <span key={i} className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-600" />
                      <span>{skill}</span>
                      {i < toy.developmentalSkills.length - 1 && <span className="ml-2 text-stone-300">·</span>}
                    </span>
                  ))}
                </div>
              </div>

              {/* Gift Wrap option checkbox */}
              <div className="p-3 bg-amber-50/60 rounded-lg border border-amber-200/60 flex items-start gap-3">
                <input
                  type="checkbox"
                  id="gift-wrap-check"
                  checked={giftWrap}
                  onChange={(e) => setGiftWrap(e.target.checked)}
                  className="mt-0.5 rounded text-amber-700 focus:ring-amber-500 cursor-pointer"
                />
                <label htmlFor="gift-wrap-check" className="text-xs text-stone-700 cursor-pointer">
                  <span className="font-semibold text-stone-900 block">Include Artisanal Gift Wrapping (+$5)</span>
                  Wrapped in embossed handmade paper with satin ribbon and calligraphy tag.
                </label>
              </div>

              {/* Purchase Controls Row */}
              <div className="pt-2 space-y-3">
                <div className="flex items-center gap-3">
                  {/* Quantity Stepper */}
                  <div className="flex items-center border border-stone-300 rounded-md bg-white">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-2 text-stone-600 hover:text-stone-900 hover:bg-stone-50 text-sm font-semibold cursor-pointer"
                    >
                      -
                    </button>
                    <span className="px-3 py-2 text-xs font-bold tabular-nums text-stone-900 min-w-8 text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(Math.min(toy.stockCount, quantity + 1))}
                      className="px-3 py-2 text-stone-600 hover:text-stone-900 hover:bg-stone-50 text-sm font-semibold cursor-pointer"
                    >
                      +
                    </button>
                  </div>

                  {/* Add to Bag CTA */}
                  <button
                    onClick={handleAdd}
                    className="flex-1 py-2.5 px-4 bg-stone-900 hover:bg-stone-800 text-white rounded-md text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs"
                  >
                    {addedNotice ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-400" />
                        <span>Added to Bag!</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4" />
                        <span>Add to Bag · ${(toy.price * quantity + (giftWrap ? 5 : 0)).toFixed(0)}</span>
                      </>
                    )}
                  </button>

                  {/* Wishlist toggle */}
                  <button
                    onClick={() => onToggleWishlist(toy)}
                    className={`p-2.5 rounded-md border transition-colors cursor-pointer ${
                      isWishlisted
                        ? 'bg-rose-50 border-rose-300 text-rose-600'
                        : 'border-stone-300 hover:bg-stone-50 text-stone-700'
                    }`}
                    aria-label="Wishlist"
                  >
                    <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-500' : ''}`} />
                  </button>
                </div>
              </div>

              {/* Reviews Accordion / Section */}
              <div className="pt-4 border-t border-stone-200">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-serif text-base font-semibold text-stone-900">
                    Customer Letters & Reviews ({reviewsList.length})
                  </h4>
                  <button
                    onClick={() => setShowReviewForm(!showReviewForm)}
                    className="text-xs font-semibold text-amber-800 hover:text-amber-900 cursor-pointer"
                  >
                    {showReviewForm ? 'Cancel' : '+ Write a Review'}
                  </button>
                </div>

                {reviewSuccess && (
                  <div className="mb-3 p-2 bg-emerald-50 border border-emerald-200 rounded text-xs text-emerald-800 flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5" />
                    <span>Thank you! Your letter of review has been published.</span>
                  </div>
                )}

                {/* Review submission form */}
                {showReviewForm && (
                  <form onSubmit={handleSubmitReview} className="mb-4 p-3 bg-stone-50 border border-stone-200 rounded-lg space-y-2 text-xs">
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        placeholder="Your Name (e.g. Margaret S.)"
                        required
                        value={reviewAuthor}
                        onChange={(e) => setReviewAuthor(e.target.value)}
                        className="px-2.5 py-1.5 bg-white border border-stone-300 rounded text-xs text-stone-900 focus:outline-stone-800"
                      />
                      <select
                        value={reviewRating}
                        onChange={(e) => setReviewRating(Number(e.target.value))}
                        className="px-2 py-1.5 bg-white border border-stone-300 rounded text-xs text-stone-900"
                      >
                        <option value={5}>★★★★★ (5/5 Stars)</option>
                        <option value={4}>★★★★☆ (4/5 Stars)</option>
                        <option value={3}>★★★☆☆ (3/5 Stars)</option>
                      </select>
                    </div>
                    <input
                      type="text"
                      placeholder="Headline (e.g. Beautiful sound and solid wood)"
                      value={reviewTitle}
                      onChange={(e) => setReviewTitle(e.target.value)}
                      className="w-full px-2.5 py-1.5 bg-white border border-stone-300 rounded text-xs text-stone-900 focus:outline-stone-800"
                    />
                    <textarea
                      placeholder="Tell other parents about play value, materials, and child response..."
                      rows={2}
                      required
                      value={reviewComment}
                      onChange={(e) => setReviewComment(e.target.value)}
                      className="w-full px-2.5 py-1.5 bg-white border border-stone-300 rounded text-xs text-stone-900 focus:outline-stone-800"
                    />
                    <button
                      type="submit"
                      className="w-full py-1.5 bg-stone-900 text-white rounded text-xs font-semibold hover:bg-stone-800 cursor-pointer"
                    >
                      Publish Review
                    </button>
                  </form>
                )}

                {/* Reviews List */}
                <div className="space-y-3 max-h-48 overflow-y-auto pr-1">
                  {reviewsList.map((rev) => (
                    <div key={rev.id} className="text-xs border-b border-stone-100 pb-2.5">
                      <div className="flex items-center justify-between text-stone-500 mb-0.5">
                        <span className="font-semibold text-stone-800">{rev.author}</span>
                        <span>{rev.date}</span>
                      </div>
                      <div className="flex items-center gap-1 mb-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3 h-3 ${
                              i < rev.rating ? 'fill-amber-400 text-amber-500' : 'text-stone-300'
                            }`}
                          />
                        ))}
                        <span className="font-medium text-stone-800 ml-1">{rev.title}</span>
                      </div>
                      <p className="text-stone-600 leading-normal">{rev.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
