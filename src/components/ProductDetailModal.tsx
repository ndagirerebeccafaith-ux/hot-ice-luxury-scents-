import React, { useState } from 'react';
import { Product, ProductSize } from '../types';
import { X, Sparkles, ShoppingBag, ShieldCheck, Clock, Wind, Check, Heart, Star, Phone, MessageCircle } from 'lucide-react';
import { formatUGX, CALL_NUMBER, WHATSAPP_NUMBER, getWhatsAppOrderUrl } from '../utils/format';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, size: ProductSize, quantity: number) => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
  isWishlisted,
  onToggleWishlist,
}) => {
  if (!product) return null;

  const [selectedSize, setSelectedSize] = useState<ProductSize>(
    product.sizes[0] || { label: 'Standard', priceUGX: product.priceUGX, volume: product.volume }
  );
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleAdd = () => {
    onAddToCart(product, selectedSize, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  };

  const whatsappUrl = getWhatsAppOrderUrl(
    product.name,
    `${selectedSize.label} (${selectedSize.volume}) x ${quantity}`,
    selectedSize.priceUGX * quantity
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div 
        className="relative w-full max-w-4xl bg-[#061D13] border border-[#174A33] rounded-2xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#143D2B] bg-[#03140D]/90">
          <div className="flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-[#E6C665] font-medium">
            <Sparkles className="w-3.5 h-3.5 text-[#E6C665]" />
            <span>Hot Ice Luxury Flacon &amp; Decant Archive</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleWishlist(product)}
              aria-label="Wishlist"
              className={`p-2 rounded-lg transition-colors ${
                isWishlisted ? 'text-[#E6C665]' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-[#0A2619] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto p-6 sm:p-8 grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Left Column: Image and Specs */}
          <div className="md:col-span-5 space-y-4">
            <div className="relative aspect-[4/3] sm:aspect-square rounded-xl overflow-hidden border border-[#143D2B] bg-[#04120B] p-2">
              {!imageError ? (
                <img
                  src={product.image}
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  onError={() => setImageError(true)}
                  className="w-full h-full object-cover rounded-lg"
                />
              ) : (
                <div className={`w-full h-full rounded-lg bg-gradient-to-br ${product.fallbackGradient} flex flex-col items-center justify-center p-6 text-center`}>
                  <Sparkles className="w-10 h-10 text-[#E6C665] mb-3" />
                  <span className="font-display text-xl text-white font-bold">{product.name}</span>
                  <span className="text-xs text-emerald-200 uppercase tracking-widest mt-1">{product.subtitle}</span>
                </div>
              )}

              {product.badge && (
                <div className="absolute top-4 left-4 bg-[#04120B]/90 text-[#E6C665] border border-[#E6C665]/40 text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 rounded">
                  {product.badge}
                </div>
              )}
            </div>

            {/* Performance Indicators */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-lg bg-[#092619] border border-[#143D2B] flex items-center gap-2.5 text-slate-300">
                <Clock className="w-4 h-4 text-[#E6C665] shrink-0" />
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-slate-400">Longevity</div>
                  <div className="font-semibold text-white">{product.longevity}</div>
                </div>
              </div>
              <div className="p-3 rounded-lg bg-[#092619] border border-[#143D2B] flex items-center gap-2.5 text-slate-300">
                <Wind className="w-4 h-4 text-[#E6C665] shrink-0" />
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-slate-400">Sillage</div>
                  <div className="font-semibold text-white">{product.sillage}</div>
                </div>
              </div>
            </div>

            {/* Quick Contact Box for Immediate Orders */}
            <div className="p-3.5 rounded-xl bg-[#082417] border border-[#143D2B] text-xs space-y-2">
              <div className="text-[11px] font-semibold text-[#E6C665] uppercase tracking-wider">
                Direct Kampala Delivery Concierge
              </div>
              <div className="flex flex-col gap-1.5">
                <a
                  href={`tel:${CALL_NUMBER}`}
                  className="flex items-center justify-between p-2 rounded bg-[#04150D] hover:bg-[#0A2E1D] text-white border border-[#143D2B] transition-colors"
                >
                  <span className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-[#E6C665]" /> Call Concierge</span>
                  <span className="font-bold text-[#E6C665] tabular-nums">{CALL_NUMBER}</span>
                </a>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-2 rounded bg-[#04150D] hover:bg-[#0A2E1D] text-[#25D366] border border-[#25D366]/30 transition-colors"
                >
                  <span className="flex items-center gap-1.5"><MessageCircle className="w-3.5 h-3.5" /> Order on WhatsApp</span>
                  <span className="font-bold tabular-nums">{WHATSAPP_NUMBER}</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Contiguous Purchase Module & Decants */}
          <div className="md:col-span-7 space-y-5 text-left">
            <div>
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#E6C665]">
                <span>{product.category.replace(/-/g, ' ')}</span>
                <span>·</span>
                <span>{product.family} Olfactory Family</span>
              </div>

              <h2 className="font-display text-2xl sm:text-3xl text-white font-bold tracking-tight mt-1">
                {product.name}
              </h2>
              <p className="text-sm text-emerald-200/80 font-light mt-0.5">
                {product.subtitle} · {product.concentration}
              </p>

              {/* Star Rating & Verified Reviews */}
              <div className="flex items-center gap-3 mt-2">
                <div className="flex items-center text-[#E6C665]">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating)
                          ? 'fill-current text-[#E6C665]'
                          : i < product.rating
                          ? 'fill-current text-[#E6C665]/60'
                          : 'text-slate-600'
                      }`}
                    />
                  ))}
                  <span className="font-bold text-white text-sm tabular-nums ml-1.5">
                    {product.rating.toFixed(1)} / 5.0
                  </span>
                </div>
                <span className="text-xs text-slate-400">·</span>
                <span className="text-xs text-emerald-300 font-medium tabular-nums">
                  {product.reviewCount} Verified Buyer Ratings
                </span>
                <span className="text-xs text-slate-400">·</span>
                <span className="text-xs text-[#E6C665] font-medium">98% Recommendation Rate</span>
              </div>

              {/* Price display in UGX */}
              <div className="mt-3 flex items-baseline gap-3">
                <span className="text-2xl sm:text-3xl font-bold text-white tabular-nums">
                  {formatUGX(selectedSize.priceUGX)}
                </span>
                {selectedSize.isDecant && (
                  <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 uppercase tracking-wider">
                    Travel Decant
                  </span>
                )}
                <span className="text-xs text-[#E6C665] font-medium ml-1">In Stock in Kampala</span>
              </div>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed font-light">
              {product.description}
            </p>

            {/* Size & Decants Selector */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs uppercase tracking-wider font-semibold text-slate-300">
                  Select Decant or Full Flacon
                </label>
                <span className="text-[11px] text-[#E6C665]">
                  Decants: 5ml · 10ml · 15ml
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s.label}
                    onClick={() => setSelectedSize(s)}
                    className={`p-3 rounded-lg text-xs font-medium text-left border transition-all ${
                      selectedSize.label === s.label
                        ? 'border-[#E6C665] bg-[#E6C665]/15 text-white shadow-md'
                        : 'border-[#143D2B] bg-[#092619] text-slate-300 hover:border-slate-500'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-white">{s.label}</span>
                      {s.isDecant && (
                        <span className="text-[9px] uppercase font-bold tracking-wider px-1.5 py-0.2 rounded bg-emerald-900/80 text-emerald-300 border border-emerald-600/40">
                          Decant
                        </span>
                      )}
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-[#E6C665] mt-1 font-semibold">
                      <span>{s.volume}</span>
                      <span className="tabular-nums text-sm font-bold">{formatUGX(s.priceUGX)}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Olfactory Pyramid (Top, Heart, Base) */}
            <div className="space-y-2.5 p-4 rounded-xl bg-[#04120B]/80 border border-[#143D2B]">
              <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#E6C665] flex items-center gap-2">
                <span>The Olfactory Architecture</span>
              </h4>

              <div className="space-y-1.5 text-xs">
                <div className="flex items-start gap-3">
                  <span className="w-20 uppercase tracking-wider text-slate-400 shrink-0 font-medium pt-0.5">Top:</span>
                  <span className="text-white font-medium">{product.topNotes.join(' · ')}</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-20 uppercase tracking-wider text-slate-400 shrink-0 font-medium pt-0.5">Heart:</span>
                  <span className="text-[#E6C665] font-medium">{product.heartNotes.join(' · ')}</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-20 uppercase tracking-wider text-slate-400 shrink-0 font-medium pt-0.5">Base:</span>
                  <span className="text-slate-300 font-medium">{product.baseNotes.join(' · ')}</span>
                </div>
              </div>
            </div>

            {/* Dual Purchase Actions: Shopping Bag + Direct WhatsApp */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-[#143D2B] rounded-lg bg-[#092619] text-white">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 text-slate-400 hover:text-white transition-colors text-sm font-bold"
                  >
                    -
                  </button>
                  <span className="px-3 py-2 text-sm font-semibold tabular-nums min-w-[2.5rem] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 text-slate-400 hover:text-white transition-colors text-sm font-bold"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAdd}
                  className={`flex-1 py-3 px-5 rounded-lg font-bold text-xs tracking-[0.16em] uppercase flex items-center justify-center gap-2 transition-all shadow-lg ${
                    added
                      ? 'bg-emerald-500 text-white'
                      : 'bg-gradient-to-r from-[#C29E37] via-[#E6C665] to-[#D4AF37] text-[#04120B] hover:from-[#B18E29] hover:to-[#C29E37]'
                  }`}
                >
                  {added ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added to Bag</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add to Bag · {formatUGX(selectedSize.priceUGX * quantity)}</span>
                    </>
                  )}
                </button>
              </div>

              {/* Direct WhatsApp Order Button */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-lg bg-[#0A3822] hover:bg-[#0E4A2E] border border-[#25D366]/50 text-[#25D366] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors shadow-md"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Order Directly on WhatsApp ({formatUGX(selectedSize.priceUGX * quantity)})</span>
              </a>

              {/* Ritual Application Tip */}
              <div className="p-3 rounded-lg bg-[#092619]/40 border border-[#143D2B]/60 text-xs text-slate-300">
                <strong className="text-[#E6C665] block mb-0.5">Maison Application Ritual:</strong>
                {product.ritualTip}
              </div>
            </div>

            {/* Trust badge */}
            <div className="flex items-center gap-4 text-[11px] text-slate-400 pt-1">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#E6C665]" />
                <span>100% Authentic Imported Oils &amp; Flacons</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#E6C665]" />
                <span>Leak-Proof Glass Decants</span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
