import React from 'react';
import { Droplet, Sparkles, Wind, ShieldCheck } from 'lucide-react';

export const ScentRitualSection: React.FC = () => {
  const steps = [
    {
      step: '01',
      title: 'Foundation & Freshness',
      medium: 'Luxury Deodorants',
      description: 'Begin on cleansed skin with Perfect Man or Hot Ice Imperial Deodorant. 48-hour aluminum-free botanical protection neutralizes odor while releasing crisp bergamot and cedarwood as your body warms.',
      icon: ShieldCheck,
      recommended: 'Perfect Man Deodorant Stick',
    },
    {
      step: '02',
      title: 'Warm Pulse Point Attar',
      medium: 'Pure Body Oil Perfumes',
      description: 'Using the golden pipette, apply 2 drops of Brown Orchid pure concentrated perfume oil to your inner wrists and neck. The alcohol-free jojoba base melts into pores, creating an intimate, long-lasting anchor.',
      icon: Droplet,
      recommended: 'Brown Orchid Pure Oil (UGX 160,000)',
    },
    {
      step: '03',
      title: 'The Haute Parfumerie Veil',
      medium: 'Full Flacons & Decants',
      description: 'Crown your aura with 2-3 sprays of My Way, Stronger With You, 9 PM, or Bora Bora fine mist. Also available in 5ml/10ml travel decants to refresh your scent anytime throughout the day.',
      icon: Wind,
      recommended: 'My Way / 9 PM / Bora Bora Decants',
    },
    {
      step: '04',
      title: 'The Golden Glaze Finish',
      medium: '24K Lip Glaze',
      description: 'Complete the look with Hot Ice Glaze or Pure Seduction lip treatment. Infused with genuine gold leaf mica and soothing Madagascar vanilla orchid essence for mirror-shine hydration and subtle gourmand fragrance.',
      icon: Sparkles,
      recommended: 'Hot Ice 24K Glaze Wand (UGX 45,000)',
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-[#031109] border-t border-b border-[#143D2B] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <div className="inline-flex items-center gap-2 text-xs tracking-[0.25em] uppercase text-[#E6C665] font-semibold">
            <span className="w-6 h-[1px] bg-[#E6C665]" />
            <span>Maison Layering Artistry</span>
            <span className="w-6 h-[1px] bg-[#E6C665]" />
          </div>

          <h2 className="font-display text-3xl sm:text-4xl text-white font-normal tracking-tight">
            The Hot Ice 4-Step Scent Ritual
          </h2>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-light">
            True luxury fragrance is not sprayed once and forgotten. Learn how master perfumers harmonize deodorants, body mists, concentrated pure oils, extraits, and lip glazes for an enchanting 18+ hour sillage.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="bg-[#072116] border border-[#143D2B] rounded-xl p-6 flex flex-col justify-between hover:border-[#E6C665]/50 transition-colors group text-left"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-display text-2xl font-bold text-[#E6C665]">
                      {item.step}
                    </span>
                    <div className="w-10 h-10 rounded-lg bg-[#0A2E1F] border border-[#143D2B] flex items-center justify-center text-[#E6C665] group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <div className="text-xs uppercase tracking-widest text-emerald-200/70 font-semibold mb-1">
                    {item.medium}
                  </div>

                  <h3 className="font-display text-lg text-white font-semibold mb-2">
                    {item.title}
                  </h3>

                  <p className="text-xs text-slate-300 leading-relaxed font-light">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-[#143D2B]/70 text-[11px] text-[#E6C665] font-medium flex items-center gap-1.5">
                  <span className="text-slate-500 uppercase tracking-wider text-[10px]">Pairs with:</span>
                  <span className="truncate">{item.recommended}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Affordable Quality Fragrances Pillar Banner */}
        <div className="mt-14 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#072418] via-[#0A3322] to-[#072418] border border-[#143D2B] relative overflow-hidden">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-[#143D2B]/80">
            <div>
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#E6C665] font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Our Core Promise</span>
              </div>
              <h3 className="font-display text-2xl sm:text-3xl text-white font-normal mt-1">
                Affordable Quality Fragrances for Everyone
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm font-light max-w-2xl mt-1">
                Luxury perfumery should be personal and accessible. We eliminate unnecessary markups by offering travel decants, pocket perfumes, and pure roll-on attars directly in Uganda.
              </p>
            </div>
            <a
              href="#catalog"
              className="px-5 py-2.5 bg-gradient-to-r from-[#C29E37] via-[#E6C665] to-[#D4AF37] text-[#04120B] font-bold text-xs uppercase tracking-wider rounded-lg hover:from-[#B18E29] hover:to-[#C29E37] transition-all whitespace-nowrap self-start lg:self-auto shrink-0"
            >
              Explore Affordable Gems
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-6 text-left">
            <div className="p-3.5 rounded-xl bg-[#03140D]/70 border border-[#143D2B]">
              <span className="text-[#E6C665] font-bold text-xs block uppercase tracking-wider">From UGX 15,000</span>
              <h4 className="font-semibold text-white text-sm mt-0.5">Pure Roll-On Attars</h4>
              <p className="text-slate-400 text-xs mt-1 font-light">Concentrated perfume oils that stay active on skin up to 24 hours.</p>
            </div>
            <div className="p-3.5 rounded-xl bg-[#03140D]/70 border border-[#143D2B]">
              <span className="text-[#E6C665] font-bold text-xs block uppercase tracking-wider">From UGX 18,000</span>
              <h4 className="font-semibold text-white text-sm mt-0.5">Pocket 15ml Sprays</h4>
              <p className="text-slate-400 text-xs mt-1 font-light">Smart collection travel sprays: 212 VIP, Cool Water, Bombshell &amp; Good Girl.</p>
            </div>
            <div className="p-3.5 rounded-xl bg-[#03140D]/70 border border-[#143D2B]">
              <span className="text-[#E6C665] font-bold text-xs block uppercase tracking-wider">From UGX 25,000</span>
              <h4 className="font-semibold text-white text-sm mt-0.5">Glass Decants (5ml / 10ml)</h4>
              <p className="text-slate-400 text-xs mt-1 font-light">Decanted from original flacons into travel atomizers. Test before buying full bottles.</p>
            </div>
            <div className="p-3.5 rounded-xl bg-[#03140D]/70 border border-[#143D2B]">
              <span className="text-[#E6C665] font-bold text-xs block uppercase tracking-wider">100% Authentic</span>
              <h4 className="font-semibold text-white text-sm mt-0.5">Full Presentation Bottles</h4>
              <p className="text-slate-400 text-xs mt-1 font-light">Original sealed designer &amp; Middle Eastern masterpieces delivered across Uganda.</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
