import React from 'react';
import { Product } from '../types';
import { X, Heart, ShoppingBag, Trash2, MessageCircle } from 'lucide-react';
import { formatUGX, getWhatsAppOrderUrl } from '../utils/format';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlist: Product[];
  onRemoveFromWishlist: (product: Product) => void;
  onMoveToCart: (product: Product) => void;
  onInspect: (product: Product) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlist,
  onRemoveFromWishlist,
  onMoveToCart,
  onInspect,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/85 backdrop-blur-sm animate-fadeIn">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#061D13] border-l border-[#174A33] text-white flex flex-col shadow-2xl relative">
          
          {/* Header */}
          <div className="p-5 border-b border-[#143D2B] flex items-center justify-between bg-[#03140D]/90">
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-[#E6C665] fill-current" />
              <span className="font-cinzel text-base font-bold tracking-widest text-[#E6C665]">
                Saved Favorites ({wishlist.length})
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-[#0A2619] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {wishlist.length === 0 ? (
              <div className="py-16 text-center space-y-3">
                <Heart className="w-12 h-12 text-slate-600 mx-auto" />
                <h4 className="font-display text-lg text-white font-semibold">Your Wishlist is Empty</h4>
                <p className="text-xs text-slate-400 max-w-xs mx-auto">
                  Click the heart icon on any perfume or decant to save your favorites.
                </p>
              </div>
            ) : (
              wishlist.map((product) => (
                <div
                  key={product.id}
                  className="flex gap-3 p-3 rounded-xl bg-[#092619]/70 border border-[#143D2B] items-center text-left"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    referrerPolicy="no-referrer"
                    className="w-16 h-16 object-cover rounded-lg border border-[#143D2B] shrink-0 cursor-pointer"
                    onClick={() => {
                      onInspect(product);
                      onClose();
                    }}
                  />

                  <div className="flex-1 min-w-0">
                    <h4
                      onClick={() => {
                        onInspect(product);
                        onClose();
                      }}
                      className="font-display text-sm font-semibold text-white truncate hover:text-[#E6C665] cursor-pointer"
                    >
                      {product.name}
                    </h4>
                    <p className="text-[11px] text-slate-400">
                      {product.category.replace(/-/g, ' ')} · {product.family}
                    </p>
                    <div className="text-xs font-bold text-[#E6C665] mt-0.5 tabular-nums">
                      {formatUGX(product.priceUGX)}
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    <a
                      href={getWhatsAppOrderUrl(product.name, product.sizes[0].label, product.sizes[0].priceUGX)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-[#0A3822] text-[#25D366] rounded-lg hover:bg-[#0E4A2E] transition-colors"
                      title="WhatsApp Order"
                    >
                      <MessageCircle className="w-4 h-4" />
                    </a>
                    <button
                      onClick={() => onMoveToCart(product)}
                      className="p-2 bg-[#E6C665] text-[#04120B] rounded-lg hover:bg-[#D4AF37] transition-colors"
                      title="Add to Shopping Bag"
                    >
                      <ShoppingBag className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onRemoveFromWishlist(product)}
                      className="p-2 text-slate-500 hover:text-rose-400 transition-colors"
                      title="Remove"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

        </div>
      </div>
    </div>
  );
};
