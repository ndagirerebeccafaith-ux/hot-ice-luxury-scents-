import React from 'react';
import { Sparkles, ArrowRight, Compass, ShieldCheck, Phone, MessageCircle } from 'lucide-react';
import { CALL_NUMBER, WHATSAPP_NUMBER, getWhatsAppGeneralUrl } from '../utils/format';

interface HeroProps {
  onExplore: () => void;
  onOpenQuiz: () => void;
  onSelectDecants: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExplore, onOpenQuiz, onSelectDecants }) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#03140D] via-[#072418] to-[#04120B] pt-8 pb-14 lg:pt-12 lg:pb-20 border-b border-[#143D2B]/70">
      {/* Subtle luxury emerald & gold glow accents */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#0E4A32]/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#E6C665]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Hero Story Content */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#E6C665] font-semibold">
              <span className="w-6 h-[1px] bg-[#E6C665]" />
              <span>Affordable Quality Fragrances · Kampala, Uganda</span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-white font-normal tracking-tight leading-[1.15]" style={{ textWrap: 'balance' }}>
              Affordable Quality Fragrances, <span className="italic font-display text-[#E6C665]">Unmatched Luxury</span>
            </h1>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-xl font-light">
              Welcome to <strong className="text-white font-medium">Hot Ice Luxury Scents</strong>. Experience high-end designer perfumes without the designer markup. From 100% pure concentrated oil attars starting at <span className="text-[#E6C665] font-semibold">UGX 15,000</span>, authentic 15ml pocket sprays from <span className="text-[#E6C665] font-semibold">UGX 18,000</span>, and 5ml/10ml travel decants, to full flacons of My Way, 9 PM, Stronger With You, and Yara.
            </p>

            {/* Price kicker for decants and full bottles */}
            <div className="p-3.5 rounded-xl bg-[#092619] border border-[#143D2B] flex flex-wrap items-center justify-between gap-3 text-xs">
              <div>
                <span className="text-slate-400 block text-[11px] uppercase tracking-wider">Roll-On Oils &amp; Sprays:</span>
                <span className="font-bold text-[#E6C665] text-sm tabular-nums">From UGX 15,000</span>
              </div>
              <div className="h-8 w-[1px] bg-[#143D2B] hidden sm:block" />
              <div>
                <span className="text-slate-400 block text-[11px] uppercase tracking-wider">Travel Decants:</span>
                <span className="font-bold text-[#E6C665] text-sm tabular-nums">From UGX 25,000</span>
              </div>
              <div className="h-8 w-[1px] bg-[#143D2B] hidden sm:block" />
              <div>
                <span className="text-slate-400 block text-[11px] uppercase tracking-wider">Full Bottles:</span>
                <span className="font-bold text-white text-sm tabular-nums">From UGX 115,000</span>
              </div>
              <div className="h-8 w-[1px] bg-[#143D2B] hidden sm:block" />
              <div>
                <span className="text-slate-400 block text-[11px] uppercase tracking-wider">Fast Delivery:</span>
                <span className="font-medium text-emerald-400">Kampala &amp; Environs</span>
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                onClick={onExplore}
                className="flex items-center justify-center gap-2.5 px-6 py-3.5 bg-gradient-to-r from-[#C29E37] via-[#E6C665] to-[#D4AF37] text-[#04120B] font-bold text-xs tracking-[0.16em] uppercase rounded-lg shadow-lg hover:shadow-[#E6C665]/20 transition-all hover:translate-y-[-1px] active:translate-y-[0px] whitespace-nowrap"
              >
                <span>Shop All Fragrances</span>
                <ArrowRight className="w-4 h-4 text-[#04120B]" />
              </button>

              <button
                onClick={() => {
                  onSelectDecants();
                }}
                className="flex items-center justify-center gap-2 px-5 py-3.5 bg-[#0A2619] hover:bg-[#103825] border border-[#E6C665]/40 hover:border-[#E6C665] text-[#E6C665] font-semibold text-xs tracking-[0.16em] uppercase rounded-lg transition-colors whitespace-nowrap"
              >
                <Sparkles className="w-4 h-4" />
                <span>Affordable Decants</span>
              </button>

              <a
                href={getWhatsAppGeneralUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-5 py-3.5 bg-[#072B1A] hover:bg-[#0A3822] border border-[#25D366]/50 text-[#25D366] font-semibold text-xs tracking-[0.14em] uppercase rounded-lg transition-colors whitespace-nowrap"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366]" />
                <span>WhatsApp Order</span>
              </a>
            </div>

            {/* Direct Calling strip */}
            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-slate-300">
              <span className="text-slate-400">Instant Concierge Assistance:</span>
              <a
                href={`tel:${CALL_NUMBER}`}
                className="text-[#E6C665] hover:underline font-semibold flex items-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call {CALL_NUMBER}</span>
              </a>
              <span aria-hidden="true">·</span>
              <a
                href={getWhatsAppGeneralUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#25D366] hover:underline font-semibold flex items-center gap-1.5"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Chat {WHATSAPP_NUMBER}</span>
              </a>
            </div>
          </div>

          {/* Right Hero Visual Banner */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden border border-[#174A33] shadow-2xl bg-[#061D13] aspect-[16/10] sm:aspect-[16/9] lg:aspect-[4/3] group">
              <img
                src="/assets/aistudio/IMG_20261110_103024_c34f070e.png"
                alt="Hot Ice Luxury Scents Boutique Vault - Genuine Luxury Perfumes and Travel Decants in Kampala"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              />

              {/* Contrast subtle vignette scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#03140D]/85 via-transparent to-transparent pointer-events-none" />

              {/* Floating campaign badge */}
              <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 p-4 rounded-xl bg-[#04120B]/90 backdrop-blur-md border border-[#E6C665]/30 flex items-center justify-between">
                <div>
                  <p className="text-[11px] tracking-[0.2em] uppercase text-[#E6C665] font-medium">Hot Ice Luxury Scents</p>
                  <p className="text-sm font-display text-white font-medium">Full Flacons &amp; Decants in Kampala</p>
                </div>
                <a
                  href={`tel:${CALL_NUMBER}`}
                  className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#E6C665] text-[#04120B] text-xs font-bold rounded tracking-wider uppercase"
                >
                  <Phone className="w-3 h-3" />
                  <span>Call Us</span>
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
