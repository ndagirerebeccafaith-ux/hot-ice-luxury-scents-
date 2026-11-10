import React, { useState } from 'react';
import { Mail, Sparkles, Check, MapPin, Phone, MessageCircle, Shield } from 'lucide-react';
import { CALL_NUMBER, WHATSAPP_NUMBER, getWhatsAppGeneralUrl } from '../utils/format';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => {
        setEmail('');
      }, 3000);
    }
  };

  return (
    <footer className="bg-[#020C07] border-t border-[#143D2B] text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Top Newsletter & Brand Banner */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-12 border-b border-[#143D2B]/80 items-center">
          <div className="lg:col-span-6 space-y-2 text-left">
            <span className="font-cinzel text-xl text-[#E6C665] font-bold tracking-[0.2em] block">
              HOT ICE LUXURY SCENTS
            </span>
            <p className="text-slate-300 text-sm font-light max-w-md">
              Kampala&apos;s premier destination for original luxury perfumes, travel decants, shimmer body mists, deodorants, and pure perfume oils.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href={`tel:${CALL_NUMBER}`}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#072418] border border-[#143D2B] text-white hover:text-[#E6C665] transition-colors font-medium"
              >
                <Phone className="w-3.5 h-3.5 text-[#E6C665]" />
                <span>Call: {CALL_NUMBER}</span>
              </a>
              <a
                href={getWhatsAppGeneralUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#072B1A] border border-[#25D366]/40 text-[#25D366] hover:bg-[#0A3822] transition-colors font-medium"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp: {WHATSAPP_NUMBER}</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-6">
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 max-w-md ml-auto">
              <div className="relative flex-1">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email for new arrivals"
                  className="w-full pl-10 pr-4 py-3 bg-[#072116] border border-[#143D2B] rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#E6C665]"
                />
              </div>
              <button
                type="submit"
                className="px-6 py-3 bg-gradient-to-r from-[#C29E37] to-[#E6C665] text-[#04120B] font-bold text-xs uppercase tracking-wider rounded-lg hover:from-[#B18E29] hover:to-[#C29E37] transition-all flex items-center justify-center gap-1.5 shrink-0"
              >
                {subscribed ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Enrolled</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Join VIP Circle</span>
                  </>
                )}
              </button>
            </form>
            {subscribed && (
              <p className="text-[11px] text-[#E6C665] mt-2 text-right">
                Welcome to the Hot Ice Private Olfactory Salon.
              </p>
            )}
          </div>
        </div>

        {/* 4 Column Directory */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 text-left">
          <div>
            <h4 className="text-white font-semibold uppercase tracking-wider text-xs mb-3">
              The Collections
            </h4>
            <ul className="space-y-2">
              <li><a href="#catalog" className="hover:text-[#E6C665] transition-colors">Affordable Decants (5ml/10ml)</a></li>
              <li><a href="#catalog" className="hover:text-[#E6C665] transition-colors">Extrait de Parfum Flacons</a></li>
              <li><a href="#catalog" className="hover:text-[#E6C665] transition-colors">Fine Shimmer Body Mists</a></li>
              <li><a href="#catalog" className="hover:text-[#E6C665] transition-colors">Pure Body Oil Attars</a></li>
              <li><a href="#catalog" className="hover:text-[#E6C665] transition-colors">Luxury Deodorant Sticks</a></li>
              <li><a href="#catalog" className="hover:text-[#E6C665] transition-colors">24K Gold Lip Glazes</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold uppercase tracking-wider text-xs mb-3">
              Featured Scents
            </h4>
            <ul className="space-y-2">
              <li><a href="#catalog" className="hover:text-[#E6C665] transition-colors">My Way (Floral Woody)</a></li>
              <li><a href="#catalog" className="hover:text-[#E6C665] transition-colors">Pure Seduction (Plum &amp; Freesia)</a></li>
              <li><a href="#catalog" className="hover:text-[#E6C665] transition-colors">Stronger With You (Chestnut Amber)</a></li>
              <li><a href="#catalog" className="hover:text-[#E6C665] transition-colors">Bora Bora (Tropical Aquatic)</a></li>
              <li><a href="#catalog" className="hover:text-[#E6C665] transition-colors">9 PM (Nocturnal Spice)</a></li>
              <li><a href="#catalog" className="hover:text-[#E6C665] transition-colors">Brown Orchid &amp; Perfect Man</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold uppercase tracking-wider text-xs mb-3">
              Direct Contact
            </h4>
            <ul className="space-y-2.5">
              <li>
                <a href={`tel:${CALL_NUMBER}`} className="flex items-center gap-2 hover:text-[#E6C665] transition-colors font-medium">
                  <Phone className="w-3.5 h-3.5 text-[#E6C665]" />
                  <span>Call: {CALL_NUMBER}</span>
                </a>
              </li>
              <li>
                <a href={getWhatsAppGeneralUrl()} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[#25D366] hover:underline font-medium">
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp: {WHATSAPP_NUMBER}</span>
                </a>
              </li>
              <li className="flex items-center gap-1.5 text-slate-300">
                <Shield className="w-3.5 h-3.5 text-[#E6C665]" />
                <span>100% Authentic Guaranteed</span>
              </li>
              <li><span className="text-slate-400">Doorstep Delivery in Kampala</span></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold uppercase tracking-wider text-xs mb-3">
              Delivery Coverage
            </h4>
            <div className="space-y-2 text-slate-300">
              <div className="flex items-start gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#E6C665] shrink-0 mt-0.5" />
                <span>Kampala: Kololo, Naguru, Nakasero, Ntinda, Bugolobi</span>
              </div>
              <div className="flex items-start gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#E6C665] shrink-0 mt-0.5" />
                <span>Greater Kampala: Entebbe, Kira, Wakiso, Mukono</span>
              </div>
              <div className="flex items-start gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#E6C665] shrink-0 mt-0.5" />
                <span>Upcountry Uganda: Jinja, Mbarara, Gulu, Mbale</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Legal bar */}
        <div className="pt-8 border-t border-[#143D2B]/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © {new Date().getFullYear()} Hot Ice Luxury Scents Uganda. Direct calls: {CALL_NUMBER} | WhatsApp: {WHATSAPP_NUMBER}
          </div>
          <div className="flex items-center gap-4">
            <span className="hover:text-slate-400">Authentic Perfumery</span>
            <span>·</span>
            <span className="hover:text-slate-400">Same Day Delivery</span>
            <span>·</span>
            <span className="hover:text-slate-400">Decants Available</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
