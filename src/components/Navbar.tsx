import React from 'react';
import { ShoppingBag, Sparkles, Heart, Phone, MessageCircle, Palette } from 'lucide-react';
import { CALL_NUMBER, WHATSAPP_NUMBER, getWhatsAppGeneralUrl } from '../utils/format';
import { ColorTheme } from '../types';

interface NavbarProps {
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenQuiz: () => void;
  onSelectCategory: (category: string) => void;
  currentTheme: ColorTheme;
  onToggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenQuiz,
  onSelectCategory,
  currentTheme,
  onToggleTheme,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#04120B]/95 backdrop-blur-md border-b border-[#143D2B]">
      {/* Top micro-announcement featuring the contact numbers and UGX delivery */}
      <div className="bg-gradient-to-r from-[#03140D] via-[#0A2E1D] to-[#03140D] text-center py-1.5 px-4 text-xs font-medium tracking-wider text-[#E6C665] border-b border-[#143D2B]/50 flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
        <div className="flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-[#E6C665]" />
          <span>KAMPALA &amp; UGANDA-WIDE DOORSTEP DELIVERY · AUTHENTIC FLACONS &amp; DECANTS</span>
        </div>
        <span className="hidden md:inline" aria-hidden="true">·</span>
        <div className="flex items-center gap-3">
          <a
            href={`tel:${CALL_NUMBER}`}
            className="flex items-center gap-1 text-white hover:text-[#E6C665] transition-colors font-semibold"
          >
            <Phone className="w-3 h-3 text-[#E6C665]" />
            <span>Call: {CALL_NUMBER}</span>
          </a>
          <span aria-hidden="true">·</span>
          <a
            href={getWhatsAppGeneralUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-[#25D366] hover:text-emerald-300 transition-colors font-semibold"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>WhatsApp: {WHATSAPP_NUMBER}</span>
          </a>
        </div>
      </div>

      {/* Main Top Bar strictly obeying the 3-zone contract */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-6">
        {/* Zone 1: Brand title, single line wordmark */}
        <a
          href="#"
          className="font-cinzel text-xl sm:text-2xl font-bold tracking-[0.22em] text-[#E6C665] hover:text-[#F3D78A] transition-colors whitespace-nowrap shrink-0 flex items-center gap-2"
        >
          <span>HOT ICE</span>
          <span className="text-[10px] font-sans font-medium tracking-[0.2em] uppercase text-emerald-200/90 border-l border-emerald-500/40 pl-2">
            Affordable Quality Fragrances · UG
          </span>
        </a>

        {/* Zone 2: 4–5 single-line clean navigation links */}
        <nav className="hidden lg:flex items-center gap-5 text-xs tracking-[0.14em] uppercase font-medium text-slate-300">
          <button
            onClick={() => onSelectCategory('affordable-budget')}
            className="text-[#E6C665] hover:text-[#F3D78A] transition-colors whitespace-nowrap shrink-0 pb-0.5 border-b border-transparent hover:border-[#E6C665] font-bold flex items-center gap-1"
          >
            <Sparkles className="w-3 h-3 text-[#E6C665]" />
            <span>Under UGX 100k</span>
          </button>
          <button
            onClick={() => onSelectCategory('decants')}
            className="hover:text-[#E6C665] transition-colors whitespace-nowrap shrink-0 pb-0.5 border-b border-transparent hover:border-[#E6C665]"
          >
            Decants &amp; Samples
          </button>
          <button
            onClick={() => onSelectCategory('perfumes')}
            className="hover:text-[#E6C665] transition-colors whitespace-nowrap shrink-0 pb-0.5 border-b border-transparent hover:border-[#E6C665]"
          >
            Perfumes
          </button>
          <button
            onClick={() => onSelectCategory('body-mists')}
            className="hover:text-[#E6C665] transition-colors whitespace-nowrap shrink-0 pb-0.5 border-b border-transparent hover:border-[#E6C665]"
          >
            Body Mists
          </button>
          <button
            onClick={() => onSelectCategory('body-oil-perfumes')}
            className="hover:text-[#E6C665] transition-colors whitespace-nowrap shrink-0 pb-0.5 border-b border-transparent hover:border-[#E6C665]"
          >
            Body Oils
          </button>
          <button
            onClick={() => onSelectCategory('deodorants')}
            className="hover:text-[#E6C665] transition-colors whitespace-nowrap shrink-0 pb-0.5 border-b border-transparent hover:border-[#E6C665]"
          >
            Deos &amp; Gloss
          </button>
          <button
            onClick={onOpenQuiz}
            className="flex items-center gap-1.5 text-slate-200 hover:text-[#E6C665] transition-colors whitespace-nowrap shrink-0"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#E6C665]" />
            <span>Scent Matcher</span>
          </button>
        </nav>

        {/* Zone 3: 1 primary action area */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Quick Call Action */}
          <a
            href={`tel:${CALL_NUMBER}`}
            aria-label="Call Hot Ice Concierge"
            className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#0A2619] border border-[#143D2B] text-slate-200 hover:text-[#E6C665] hover:border-[#E6C665]/40 transition-colors text-xs"
          >
            <Phone className="w-3.5 h-3.5 text-[#E6C665]" />
            <span className="tabular-nums font-medium">{CALL_NUMBER}</span>
          </a>

          {/* Quick WhatsApp Action */}
          <a
            href={getWhatsAppGeneralUrl()}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp Hot Ice Concierge"
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#072417] border border-[#25D366]/40 text-[#25D366] hover:bg-[#0C3523] transition-colors text-xs font-semibold"
          >
            <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
            <span className="hidden sm:inline">WhatsApp</span>
          </a>

          {/* Theme Palette Toggle Button */}
          <button
            onClick={onToggleTheme}
            aria-label="Switch Theme Palette"
            title={`Current palette: ${currentTheme}. Click to switch theme.`}
            className="p-2.5 rounded-lg text-slate-300 hover:text-[#E6C665] hover:bg-[#0A2619] border border-[#143D2B] transition-colors"
          >
            <Palette className="w-4 h-4" />
          </button>

          {/* Wishlist Button */}
          <button
            onClick={onOpenWishlist}
            aria-label="Wishlist"
            className="p-2.5 rounded-lg text-slate-300 hover:text-[#E6C665] hover:bg-[#0A2619] transition-colors relative"
          >
            <Heart className="w-5 h-5" />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#E6C665] text-[#04120B] rounded-full text-[10px] font-bold flex items-center justify-center tabular-nums">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Primary Shopping Bag */}
          <button
            onClick={onOpenCart}
            className="flex items-center gap-2 px-3.5 py-2.5 bg-gradient-to-r from-[#C29E37] via-[#E6C665] to-[#D4AF37] hover:from-[#B18E29] hover:to-[#C29E37] text-[#04120B] font-bold text-xs tracking-wider uppercase rounded-lg shadow-md transition-all active:scale-[0.98] whitespace-nowrap shrink-0"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline">Bag</span>
            <span className="bg-[#04120B] text-[#E6C665] rounded-full px-2 py-0.5 text-[11px] font-bold tabular-nums">
              {cartCount}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
