import React, { useState } from 'react';
import { Product } from '../types';
import { PRODUCTS } from '../data/products';
import { X, Sparkles, ArrowRight, RotateCcw, Check, ShoppingBag, MessageCircle, Phone, Star } from 'lucide-react';
import { formatUGX, CALL_NUMBER, WHATSAPP_NUMBER, getWhatsAppOrderUrl } from '../utils/format';

interface ScentFinderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
  onQuickAdd: (product: Product) => void;
}

export const ScentFinderModal: React.FC<ScentFinderModalProps> = ({
  isOpen,
  onClose,
  onSelectProduct,
  onQuickAdd,
}) => {
  if (!isOpen) return null;

  const [step, setStep] = useState(1);
  const [occasion, setOccasion] = useState<string>('evening');
  const [scentMood, setScentMood] = useState<string>('amber');
  const [texture, setTexture] = useState<string>('parfum');
  const [matchedProduct, setMatchedProduct] = useState<Product | null>(null);

  const calculateMatch = () => {
    let matchId = 'my-way';

    if (texture === 'decant' || texture === 'oil' || scentMood === 'woody') {
      matchId = 'brown-orchid';
    } else if (occasion === 'tropical' || scentMood === 'aquatic') {
      matchId = 'bora-bora';
    } else if (occasion === 'evening' && (scentMood === 'spicy' || scentMood === 'amber')) {
      matchId = '9-pm';
    } else if (occasion === 'date' || scentMood === 'gourmand') {
      matchId = 'stronger-with-you';
    } else if (texture === 'mist' || scentMood === 'fruity') {
      matchId = 'pure-seduction';
    } else if (texture === 'deo' || occasion === 'active') {
      matchId = 'perfect-man';
    } else if (texture === 'gloss') {
      matchId = 'hot-ice-golden-lip-gloss';
    } else {
      matchId = 'my-way';
    }

    const found = PRODUCTS.find((p) => p.id === matchId) || PRODUCTS[0];
    setMatchedProduct(found);
    setStep(4);
  };

  const resetQuiz = () => {
    setStep(1);
    setMatchedProduct(null);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div 
        className="relative w-full max-w-2xl bg-[#061D13] border border-[#174A33] rounded-2xl shadow-2xl overflow-hidden p-6 sm:p-8 text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#143D2B] pb-4 mb-6">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#E6C665]" />
            <h3 className="font-cinzel text-lg tracking-wider text-white">
              Hot Ice Scent Matcher (Flacons &amp; Decants)
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-[#0A2619]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center justify-between text-xs text-slate-400 mb-6">
          <span>{step < 4 ? `Step ${step} of 3` : 'Your Scent Match Found'}</span>
          <div className="flex items-center gap-1.5">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className={`h-1.5 rounded-full transition-all ${
                  i === step
                    ? 'w-6 bg-[#E6C665]'
                    : i < step
                    ? 'w-3 bg-emerald-500'
                    : 'w-3 bg-slate-700'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Step 1: Occasion */}
        {step === 1 && (
          <div className="space-y-5 text-left">
            <div>
              <h4 className="font-display text-xl text-white font-semibold">
                Where will you wear your signature scent?
              </h4>
              <p className="text-xs text-slate-400 mt-1">Select the atmosphere you want to command.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {[
                { id: 'evening', title: 'Midnight Gala & Lounge', desc: 'Seductive, mysterious projection after sunset.' },
                { id: 'date', title: 'Intimate Romance & Dining', desc: 'Warm, addictive embrace with unforgettable trail.' },
                { id: 'tropical', title: 'Island Escape & Sun', desc: 'Effervescent tiare flower, solar warmth and sea breeze.' },
                { id: 'daytime', title: 'Executive & Signature Presence', desc: 'Radiant white florals and sophisticated woods.' },
                { id: 'active', title: 'Daily Grooming & High Freshness', desc: 'Crisp aromatic botanicals with 48h protection.' },
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setOccasion(opt.id)}
                  className={`p-4 rounded-xl border text-left transition-all ${
                    occasion === opt.id
                      ? 'border-[#E6C665] bg-[#E6C665]/10 text-white'
                      : 'border-[#143D2B] bg-[#092619] text-slate-300 hover:border-slate-500'
                  }`}
                >
                  <div className="font-semibold text-white flex items-center justify-between">
                    <span>{opt.title}</span>
                    {occasion === opt.id && <Check className="w-4 h-4 text-[#E6C665]" />}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">{opt.desc}</div>
                </button>
              ))}
            </div>

            <div className="pt-3 flex justify-end">
              <button
                onClick={() => setStep(2)}
                className="px-6 py-2.5 bg-gradient-to-r from-[#C29E37] to-[#E6C665] text-[#04120B] font-bold text-xs uppercase tracking-wider rounded-lg flex items-center gap-2"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Olfactory Mood */}
        {step === 2 && (
          <div className="space-y-5 text-left">
            <div>
              <h4 className="font-display text-xl text-white font-semibold">
                Which aromatic notes gravitate toward your soul?
              </h4>
              <p className="text-xs text-slate-400 mt-1">Select your preferred olfactory family.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {[
                { id: 'floral', title: 'Luminous White Florals', notes: 'Orange blossom, tuberose, jasmine & neroli' },
                { id: 'gourmand', title: 'Warm Chestnut & Vanilla', notes: 'Candied chestnut, cardamom, bourbon vanilla' },
                { id: 'amber', title: 'Magnetic Night Amber', notes: 'Cinnamon, apple, ambergris & lavender' },
                { id: 'woody', title: 'Smoked Orchid & Dark Oud', notes: 'Black orchid, truffles, aged oud, sandalwood' },
                { id: 'aquatic', title: 'Solar Coconut & Sea Salt', notes: 'Tahitian tiare, chilled coconut, ocean minerals' },
                { id: 'fruity', title: 'Juiced Plum & Freesia', notes: 'Red cassis plum, sweet melon, whipped sugar' },
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setScentMood(opt.id)}
                  className={`p-4 rounded-xl border text-left transition-all ${
                    scentMood === opt.id
                      ? 'border-[#E6C665] bg-[#E6C665]/10 text-white'
                      : 'border-[#143D2B] bg-[#092619] text-slate-300 hover:border-slate-500'
                  }`}
                >
                  <div className="font-semibold text-white flex items-center justify-between">
                    <span>{opt.title}</span>
                    {scentMood === opt.id && <Check className="w-4 h-4 text-[#E6C665]" />}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">{opt.notes}</div>
                </button>
              ))}
            </div>

            <div className="pt-3 flex justify-between">
              <button
                onClick={() => setStep(1)}
                className="px-5 py-2.5 border border-[#143D2B] rounded-lg text-xs uppercase tracking-wider text-slate-300 hover:text-white"
              >
                Back
              </button>
              <button
                onClick={() => setStep(3)}
                className="px-6 py-2.5 bg-gradient-to-r from-[#C29E37] to-[#E6C665] text-[#04120B] font-bold text-xs uppercase tracking-wider rounded-lg flex items-center gap-2"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Texture & Medium (including decants) */}
        {step === 3 && (
          <div className="space-y-5 text-left">
            <div>
              <h4 className="font-display text-xl text-white font-semibold">
                What format or size fits your routine?
              </h4>
              <p className="text-xs text-slate-400 mt-1">Choose between full flacons, pocket decants, body mist, or oils.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {[
                { id: 'decant', title: 'Pocket Decant (5ml / 10ml)', desc: 'Pocket-friendly glass atomizer to test or carry on the go.' },
                { id: 'parfum', title: 'Full Flacon Bottle (100ml)', desc: 'Architectural luxury display bottle for your vanity table.' },
                { id: 'oil', title: 'Pure Body Oil Perfume (Attar)', desc: 'Alcohol-free concentrated oil drops with 24h skin longevity.' },
                { id: 'mist', title: 'Hydrating Body Mist', desc: 'Airy, refreshing all-over body mist with micro-shimmer.' },
                { id: 'deo', title: 'Luxury Deodorant Stick', desc: '48h aluminum-free protection with noble woods & citrus.' },
                { id: 'gloss', title: '24K Gold Lip Glaze', desc: 'High-shine plumping lacquer with vanilla orchid essence.' },
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setTexture(opt.id)}
                  className={`p-4 rounded-xl border text-left transition-all ${
                    texture === opt.id
                      ? 'border-[#E6C665] bg-[#E6C665]/10 text-white'
                      : 'border-[#143D2B] bg-[#092619] text-slate-300 hover:border-slate-500'
                  }`}
                >
                  <div className="font-semibold text-white flex items-center justify-between">
                    <span>{opt.title}</span>
                    {texture === opt.id && <Check className="w-4 h-4 text-[#E6C665]" />}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">{opt.desc}</div>
                </button>
              ))}
            </div>

            <div className="pt-3 flex justify-between">
              <button
                onClick={() => setStep(2)}
                className="px-5 py-2.5 border border-[#143D2B] rounded-lg text-xs uppercase tracking-wider text-slate-300 hover:text-white"
              >
                Back
              </button>
              <button
                onClick={calculateMatch}
                className="px-6 py-2.5 bg-gradient-to-r from-[#C29E37] via-[#E6C665] to-[#D4AF37] text-[#04120B] font-bold text-xs uppercase tracking-wider rounded-lg flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Reveal My Match</span>
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Matched Product Result */}
        {step === 4 && matchedProduct && (
          <div className="space-y-6 text-left">
            <div className="text-center">
              <span className="text-xs uppercase tracking-[0.25em] text-[#E6C665] font-semibold">
                Your Ideal Hot Ice Signature Scent
              </span>
              <h3 className="font-display text-3xl font-bold text-white mt-1">
                {matchedProduct.name}
              </h3>
              <p className="text-xs text-emerald-200/80 mt-0.5">
                {matchedProduct.subtitle} · {matchedProduct.concentration}
              </p>
              <div className="flex items-center justify-center gap-2 mt-2">
                <div className="flex items-center text-[#E6C665]">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i < Math.floor(matchedProduct.rating)
                          ? 'fill-current text-[#E6C665]'
                          : 'text-slate-600'
                      }`}
                    />
                  ))}
                  <span className="font-bold text-white text-xs tabular-nums ml-1">
                    {matchedProduct.rating.toFixed(1)} / 5.0
                  </span>
                </div>
                <span className="text-xs text-slate-500">·</span>
                <span className="text-xs text-slate-400 tabular-nums">
                  {matchedProduct.reviewCount} customer reviews
                </span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#092619] border border-[#143D2B] flex flex-col sm:flex-row gap-5 items-center">
              <img
                src={matchedProduct.image}
                alt={matchedProduct.name}
                referrerPolicy="no-referrer"
                className="w-36 h-36 object-cover rounded-lg border border-[#143D2B] shrink-0"
              />
              <div className="space-y-2 text-xs">
                <p className="text-slate-300 leading-relaxed font-light">
                  {matchedProduct.description}
                </p>
                <div className="flex flex-wrap gap-x-2 gap-y-1 text-[#E6C665] font-medium pt-1">
                  <span>Top: {matchedProduct.topNotes[0]}</span>
                  <span>·</span>
                  <span>Heart: {matchedProduct.heartNotes[0]}</span>
                  <span>·</span>
                  <span>Base: {matchedProduct.baseNotes[0]}</span>
                </div>
                <div className="text-base font-bold text-white pt-1 tabular-nums">
                  Full Bottle: {formatUGX(matchedProduct.priceUGX)}
                  {matchedProduct.sizes.find(s => s.isDecant) && (
                    <span className="text-sm font-normal text-emerald-300 block mt-0.5">
                      Decants starting from {formatUGX(matchedProduct.sizes.find(s => s.isDecant)!.priceUGX)}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2.5 pt-2">
              <button
                onClick={() => {
                  onSelectProduct(matchedProduct);
                  onClose();
                }}
                className="flex-1 py-3 px-4 bg-[#092619] hover:bg-[#0E3523] border border-[#E6C665]/50 text-white font-semibold text-xs uppercase tracking-wider rounded-lg text-center"
              >
                View Sizes &amp; Decants
              </button>
              <a
                href={getWhatsAppOrderUrl(matchedProduct.name, matchedProduct.sizes[0].label, matchedProduct.sizes[0].priceUGX)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 px-4 bg-[#072B1A] hover:bg-[#0A3822] border border-[#25D366]/50 text-[#25D366] font-bold text-xs uppercase tracking-wider rounded-lg flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Order on WhatsApp</span>
              </a>
              <button
                onClick={() => {
                  onQuickAdd(matchedProduct);
                  onClose();
                }}
                className="flex-1 py-3 px-4 bg-gradient-to-r from-[#C29E37] via-[#E6C665] to-[#D4AF37] text-[#04120B] font-bold text-xs uppercase tracking-wider rounded-lg flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add To Bag</span>
              </button>
            </div>

            <div className="pt-2 flex items-center justify-between text-xs text-slate-400">
              <a href={`tel:${CALL_NUMBER}`} className="flex items-center gap-1.5 text-[#E6C665] hover:underline font-semibold">
                <Phone className="w-3.5 h-3.5" />
                <span>Call to Order: {CALL_NUMBER}</span>
              </a>
              <button
                onClick={resetQuiz}
                className="inline-flex items-center gap-1.5 hover:text-[#E6C665] transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Retake Quiz</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
