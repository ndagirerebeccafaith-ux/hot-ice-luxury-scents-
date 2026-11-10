import React, { useState } from 'react';
import { Product } from '../types';
import { Heart, Plus, Eye, Sparkles, MessageCircle, Star } from 'lucide-react';
import { formatUGX, getWhatsAppOrderUrl } from '../utils/format';

interface ProductCardProps {
  product: Product;
  onQuickAdd: (product: Product) => void;
  onInspect: (product: Product) => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onQuickAdd,
  onInspect,
  isWishlisted,
  onToggleWishlist,
}) => {
  const [imageError, setImageError] = useState(false);
  const [isAddedFeedback, setIsAddedFeedback] = useState(false);

  const decantVariant = product.sizes.find((s) => s.isDecant);
  const minPrice = Math.min(...product.sizes.map((s) => s.priceUGX));

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onQuickAdd(product);
    setIsAddedFeedback(true);
    setTimeout(() => setIsAddedFeedback(false), 1200);
  };

  const handleInspect = (e: React.MouseEvent) => {
    e.stopPropagation();
    onInspect(product);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleWishlist(product);
  };

  return (
    <div
      onClick={() => onInspect(product)}
      className="group cursor-pointer flex flex-col bg-[#072116] border border-[#143D2B] rounded-xl overflow-hidden hover:border-[#E6C665]/60 hover:shadow-xl hover:shadow-[#04150D]/60 transition-all duration-300 hover:-translate-y-1"
    >
      {/* Product Image Slot */}
      <div className="relative aspect-[4/3] bg-gradient-to-b from-[#0A2E1F] to-[#04120B] overflow-hidden flex items-center justify-center p-3">
        {!imageError ? (
          <img
            src={product.image}
            alt={`${product.name} - ${product.subtitle}`}
            referrerPolicy="no-referrer"
            onError={() => setImageError(true)}
            className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-500 ease-out"
          />
        ) : (
          <div className={`w-full h-full rounded-lg bg-gradient-to-br ${product.fallbackGradient} flex flex-col items-center justify-center p-4 text-center border border-[#143D2B]`}>
            <Sparkles className="w-8 h-8 text-[#E6C665] mb-2" />
            <span className="font-display text-lg text-white font-semibold">{product.name}</span>
            <span className="text-xs text-emerald-200/70 tracking-wider uppercase mt-1">{product.subtitle}</span>
          </div>
        )}

        {/* Badge or Decant notice */}
        <div className="absolute top-3 left-3 flex flex-col gap-1 items-start">
          {product.badge && (
            <div className="bg-[#04120B]/90 backdrop-blur-md border border-[#E6C665]/40 text-[#E6C665] text-[10px] tracking-widest uppercase font-semibold px-2.5 py-0.5 rounded">
              {product.badge}
            </div>
          )}
          {decantVariant && (
            <div className="bg-[#0A2E1F]/90 backdrop-blur-md border border-emerald-500/40 text-emerald-300 text-[10px] tracking-wider uppercase font-semibold px-2 py-0.5 rounded">
              Decants from {formatUGX(decantVariant.priceUGX)}
            </div>
          )}
        </div>

        {/* Wishlist toggle action */}
        <button
          onClick={handleWishlist}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          className={`absolute top-3 right-3 p-2 rounded-lg backdrop-blur-md transition-all ${
            isWishlisted
              ? 'bg-[#E6C665] text-[#04120B]'
              : 'bg-[#04120B]/80 text-slate-300 hover:text-[#E6C665] hover:bg-[#04120B]'
          }`}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>

        {/* Quick hover action bar */}
        <div className="absolute inset-x-3 bottom-3 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={handleInspect}
            className="flex-1 py-2 px-2.5 bg-[#04120B]/90 hover:bg-[#04120B] text-slate-200 text-xs font-medium tracking-wider uppercase rounded-lg border border-[#143D2B] hover:border-[#E6C665]/50 flex items-center justify-center gap-1.5 transition-colors"
          >
            <Eye className="w-3.5 h-3.5 text-[#E6C665]" />
            <span>Sizes &amp; Notes</span>
          </button>

          <a
            href={getWhatsAppOrderUrl(product.name, product.sizes[0].label, product.sizes[0].priceUGX)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="p-2 bg-[#0A331F] hover:bg-[#0F4229] border border-[#25D366]/50 text-[#25D366] rounded-lg transition-colors flex items-center justify-center"
            title="Order directly on WhatsApp"
          >
            <MessageCircle className="w-4 h-4" />
          </a>

          <button
            onClick={handleAdd}
            className={`flex-1 py-2 px-2.5 text-xs font-bold tracking-wider uppercase rounded-lg flex items-center justify-center gap-1.5 transition-all ${
              isAddedFeedback
                ? 'bg-emerald-500 text-white'
                : 'bg-gradient-to-r from-[#C29E37] via-[#E6C665] to-[#D4AF37] hover:from-[#B18E29] hover:to-[#C29E37] text-[#04120B]'
            }`}
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{isAddedFeedback ? 'Added' : 'Add to Bag'}</span>
          </button>
        </div>
      </div>

      {/* Card Content & Metadata */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between gap-3 text-left">
        <div>
          {/* Unboxed metadata per design rules */}
          <div className="flex items-center gap-2 text-[11px] tracking-widest uppercase text-[#E6C665] font-medium">
            <span>{product.category.replace(/-/g, ' ')}</span>
            <span aria-hidden="true">·</span>
            <span className="text-slate-400">{product.family}</span>
            <span aria-hidden="true">·</span>
            <span className="text-slate-400">{product.concentration}</span>
          </div>

          {/* Product Name */}
          <h3 className="font-display text-lg sm:text-xl text-white font-semibold tracking-tight mt-1 group-hover:text-[#E6C665] transition-colors">
            {product.name}
          </h3>

          <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">
            {product.subtitle}
          </p>

          {/* Customer Rating & Reviews Badge */}
          <div className="flex items-center gap-2 mt-2 pt-1">
            <div className="flex items-center gap-1 bg-[#04120B] border border-[#143D2B] px-2 py-0.5 rounded text-xs">
              <div className="flex items-center text-[#E6C665]">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3 h-3 ${
                      i < Math.floor(product.rating)
                        ? 'fill-current text-[#E6C665]'
                        : i < product.rating
                        ? 'fill-current text-[#E6C665]/60'
                        : 'text-slate-600'
                    }`}
                  />
                ))}
              </div>
              <span className="font-bold text-white text-xs tabular-nums ml-0.5">
                {product.rating.toFixed(1)}
              </span>
            </div>
            <span className="text-[11px] text-slate-400 tabular-nums">
              ({product.reviewCount} reviews)
            </span>
          </div>

          {/* Decant options preview */}
          {product.sizes.length > 1 && (
            <div className="mt-2.5 flex flex-wrap gap-1 text-[10px] text-emerald-300">
              {product.sizes.slice(0, 3).map((s) => (
                <span key={s.label} className="bg-[#051910] border border-[#143D2B] px-1.5 py-0.5 rounded">
                  {s.volume}: {formatUGX(s.priceUGX)}
                </span>
              ))}
            </div>
          )}

          {/* Top Olfactory Notes */}
          <div className="mt-2 pt-2 border-t border-[#143D2B]/60 flex items-center gap-1.5 text-xs text-slate-400 overflow-hidden">
            <span className="text-[10px] uppercase tracking-wider text-slate-500 shrink-0">Notes:</span>
            <span className="truncate text-slate-300">
              {product.topNotes.slice(0, 2).join(', ')}, {product.heartNotes[0]}
            </span>
          </div>
        </div>

        {/* Price & Action Row */}
        <div className="pt-2 border-t border-[#143D2B] flex items-center justify-between">
          <div>
            <div className="font-sans text-base sm:text-lg font-bold text-white tabular-nums">
              {formatUGX(product.priceUGX)}
            </div>
            {decantVariant && (
              <div className="text-[10px] text-[#E6C665] font-medium">
                Decant: {formatUGX(decantVariant.priceUGX)}
              </div>
            )}
          </div>

          <span className="text-[11px] font-medium text-emerald-200/70">
            {product.sizes[0]?.volume || product.volume}
          </span>
        </div>
      </div>
    </div>
  );
};
