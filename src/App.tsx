import React, { useState, useMemo } from 'react';
import { PRODUCTS } from './data/products';
import { Product, Category, CartItem, ColorTheme, ProductSize } from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { ScentFinderModal } from './components/ScentFinderModal';
import { ScentRitualSection } from './components/ScentRitualSection';
import { Footer } from './components/Footer';
import { Search, SlidersHorizontal, Sparkles, X, Check, Phone, MessageCircle } from 'lucide-react';
import { formatUGX, CALL_NUMBER, WHATSAPP_NUMBER, getWhatsAppGeneralUrl } from './utils/format';

export default function App() {
  const [currentTheme, setCurrentTheme] = useState<ColorTheme>('emerald');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');
  const [selectedFamily, setSelectedFamily] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating'>('featured');
  const [inspectedProduct, setInspectedProduct] = useState<Product | null>(null);

  // Drawers & Modals
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  const toggleTheme = () => {
    setCurrentTheme((prev) => {
      if (prev === 'emerald') return 'obsidian';
      if (prev === 'obsidian') return 'sapphire';
      return 'emerald';
    });
    showToast(`Switched color palette.`);
  };

  const showToast = (message: string) => {
    setNotification(message);
    setTimeout(() => {
      setNotification((curr) => (curr === message ? null : curr));
    }, 2400);
  };

  // Cart operations
  const handleAddToCart = (product: Product, size: ProductSize = product.sizes[0], quantity = 1) => {
    setCart((prev) => {
      const existingIdx = prev.findIndex(
        (item) => item.product.id === product.id && item.selectedSize.label === size.label
      );
      if (existingIdx > -1) {
        const next = [...prev];
        next[existingIdx].quantity += quantity;
        return next;
      }
      return [...prev, { product, selectedSize: size, quantity }];
    });
    showToast(`Added ${product.name} (${size.volume}) to your shopping bag.`);
  };

  const handleUpdateCartQuantity = (index: number, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveCartItem(index);
      return;
    }
    setCart((prev) => {
      const next = [...prev];
      next[index].quantity = quantity;
      return next;
    });
  };

  const handleRemoveCartItem = (index: number) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // Wishlist operations
  const handleToggleWishlist = (product: Product) => {
    setWishlist((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) {
        showToast(`Removed ${product.name} from wishlist.`);
        return prev.filter((p) => p.id !== product.id);
      }
      showToast(`Saved ${product.name} to your wishlist.`);
      return [...prev, product];
    });
  };

  const handleMoveToCart = (product: Product) => {
    handleAddToCart(product);
    setWishlist((prev) => prev.filter((p) => p.id !== product.id));
  };

  // Filter & Search Logic
  const filteredProducts = useMemo(() => {
    let result = PRODUCTS.filter((item) => {
      // Category filter (including decants and affordable budget items)
      if (selectedCategory === 'affordable-budget') {
        const hasUnder100kSize = item.sizes.some((s) => s.priceUGX <= 100000);
        const basePriceUnder100k = item.priceUGX <= 100000;
        if (!hasUnder100kSize && !basePriceUnder100k) return false;
      } else if (selectedCategory === 'decants') {
        if (!item.decantsAvailable) return false;
      } else if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }

      // Olfactory Family filter
      if (selectedFamily !== 'all' && item.family !== selectedFamily) {
        return false;
      }

      // Search Query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesSubtitle = item.subtitle.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        const matchesCategory = item.category.toLowerCase().includes(query);
        const matchesNotes = [
          ...item.topNotes,
          ...item.heartNotes,
          ...item.baseNotes,
        ].some((n) => n.toLowerCase().includes(query));

        return matchesName || matchesSubtitle || matchesDesc || matchesCategory || matchesNotes;
      }

      return true;
    });

    // Sorting
    if (sortBy === 'price-low') {
      result.sort((a, b) => a.priceUGX - b.priceUGX);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.priceUGX - a.priceUGX);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [selectedCategory, selectedFamily, searchQuery, sortBy]);

  const categoriesList: { id: Category; label: string }[] = [
    { id: 'all', label: 'All Creations' },
    { id: 'affordable-budget', label: 'Under UGX 100,000 (Affordable Gems)' },
    { id: 'decants', label: 'Decants (5ml / 10ml)' },
    { id: 'perfumes', label: 'Full Perfumes' },
    { id: 'body-oil-perfumes', label: 'Body Oil Attars (from 15k)' },
    { id: 'body-mists', label: 'Body Mists' },
    { id: 'deodorants', label: 'Deodorants' },
    { id: 'lip-gloss', label: 'Lip Gloss' },
  ];

  const familiesList = ['all', 'Floral', 'Woody', 'Oriental', 'Gourmand', 'Aquatic', 'Aromatic', 'Fruity'];

  // Theme-dependent root container background
  const themeBgClass =
    currentTheme === 'emerald'
      ? 'bg-[#03140D] text-slate-100'
      : currentTheme === 'obsidian'
      ? 'bg-[#0B0B0C] text-slate-100'
      : 'bg-[#070D1E] text-slate-100';

  return (
    <div className={`min-h-screen ${themeBgClass} flex flex-col font-sans transition-colors duration-300`}>
      
      {/* Toast Notification */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#062117] border border-[#E6C665] text-white px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2.5 text-xs animate-slideUp">
          <Check className="w-4 h-4 text-[#E6C665] shrink-0" />
          <span>{notification}</span>
        </div>
      )}

      {/* Floating Direct Call & WhatsApp Action for Uganda Customers */}
      <div className="fixed bottom-6 left-6 z-40 flex flex-col gap-2">
        <a
          href={getWhatsAppGeneralUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-3.5 py-2.5 bg-[#25D366] text-[#03140D] font-bold text-xs rounded-full shadow-2xl hover:bg-[#20ba59] transition-transform hover:scale-105"
          title="Chat with Hot Ice on WhatsApp (0747239895)"
        >
          <MessageCircle className="w-4 h-4" />
          <span className="hidden sm:inline">WhatsApp {WHATSAPP_NUMBER}</span>
        </a>
        <a
          href={`tel:${CALL_NUMBER}`}
          className="flex items-center gap-2 px-3.5 py-2.5 bg-[#E6C665] text-[#03140D] font-bold text-xs rounded-full shadow-2xl hover:bg-[#d4b455] transition-transform hover:scale-105"
          title="Call Hot Ice Concierge (0701994557)"
        >
          <Phone className="w-4 h-4" />
          <span className="hidden sm:inline">Call {CALL_NUMBER}</span>
        </a>
      </div>

      {/* Top Navbar */}
      <Navbar
        cartCount={cart.reduce((s, i) => s + i.quantity, 0)}
        wishlistCount={wishlist.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenQuiz={() => setIsQuizOpen(true)}
        onSelectCategory={(cat) => {
          setSelectedCategory(cat as Category);
          const el = document.getElementById('catalog');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        currentTheme={currentTheme}
        onToggleTheme={toggleTheme}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        
        {/* Hero Campaign */}
        <Hero
          onExplore={() => {
            const el = document.getElementById('catalog');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          onOpenQuiz={() => setIsQuizOpen(true)}
          onSelectDecants={() => {
            setSelectedCategory('decants');
            const el = document.getElementById('catalog');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* Catalog Section */}
        <section id="catalog" className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#143D2B]">
            <div>
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#E6C665] font-medium">
                <Sparkles className="w-3.5 h-3.5 text-[#E6C665]" />
                <span>Affordable Quality Fragrances · Uganda</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl text-white font-normal tracking-tight mt-1">
                Luxury Perfumes, Body Oils &amp; Decants
              </h2>
              <p className="text-slate-400 text-xs sm:text-sm mt-1">
                Affordable quality fragrances priced in Ugandan Shillings (UGX). Authentic bottles &amp; travel decants of My Way, Pure Seduction, Stronger With You, Bora Bora, Perfect Man, 9 PM &amp; Brown Orchid.
              </p>
            </div>

            {/* Direct WhatsApp Concierge Button */}
            <div className="flex flex-wrap items-center gap-2 self-start md:self-auto">
              <a
                href={getWhatsAppGeneralUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-lg bg-[#072B1A] border border-[#25D366]/40 hover:border-[#25D366] text-[#25D366] text-xs font-semibold uppercase tracking-wider flex items-center gap-2 transition-colors whitespace-nowrap"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp: {WHATSAPP_NUMBER}</span>
              </a>

              <a
                href={`tel:${CALL_NUMBER}`}
                className="px-4 py-2.5 rounded-lg bg-[#0A2619] border border-[#E6C665]/40 hover:border-[#E6C665] text-[#E6C665] text-xs font-semibold uppercase tracking-wider flex items-center gap-2 transition-colors whitespace-nowrap"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call: {CALL_NUMBER}</span>
              </a>
            </div>
          </div>

          {/* Decants Spotlight Strip */}
          <div className="my-6 p-4 rounded-xl bg-gradient-to-r from-[#072418] via-[#0D3825] to-[#072418] border border-[#143D2B] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-left">
              <div className="w-10 h-10 rounded-lg bg-[#03140D] border border-[#E6C665]/40 flex items-center justify-center text-[#E6C665] shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-display text-sm font-bold text-white">
                  Sample Before You Commit with Genuine Glass Decants
                </h4>
                <p className="text-xs text-slate-300">
                  5ml decants from <strong className="text-[#E6C665]">UGX 25,000</strong> · 10ml luxury atomizers from <strong className="text-[#E6C665]">UGX 45,000</strong>. Available for all designer extraits and oils.
                </p>
              </div>
            </div>
            <button
              onClick={() => setSelectedCategory('decants')}
              className="px-4 py-2 bg-[#E6C665] text-[#03140D] font-bold text-xs uppercase tracking-wider rounded-lg hover:bg-[#D4AF37] transition-colors whitespace-nowrap shrink-0"
            >
              Filter Only Decants
            </button>
          </div>

          {/* Interactive Filter & Search Bar */}
          <div className="py-4 space-y-4">
            
            {/* Category Filter Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
              {categoriesList.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 text-xs font-semibold rounded-lg tracking-wider uppercase transition-all whitespace-nowrap shrink-0 ${
                    selectedCategory === cat.id
                      ? 'bg-gradient-to-r from-[#C29E37] via-[#E6C665] to-[#D4AF37] text-[#04120B] shadow-md font-bold'
                      : 'bg-[#072116] text-slate-300 hover:text-white border border-[#143D2B] hover:border-slate-500'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Search + Olfactory Family + Sort Row */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
              {/* Search input */}
              <div className="sm:col-span-6 relative">
                <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by perfume name (e.g. My Way, 9 PM, Stronger With You)..."
                  className="w-full pl-10 pr-9 py-2.5 bg-[#072116] border border-[#143D2B] rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#E6C665]"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-3 text-slate-500 hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Family Selector */}
              <div className="sm:col-span-3 flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-slate-500 shrink-0" />
                <select
                  value={selectedFamily}
                  onChange={(e) => setSelectedFamily(e.target.value)}
                  className="w-full py-2.5 px-3 bg-[#072116] border border-[#143D2B] rounded-lg text-xs text-slate-200 focus:outline-none focus:border-[#E6C665]"
                >
                  <option value="all">All Olfactory Families</option>
                  {familiesList.filter((f) => f !== 'all').map((f) => (
                    <option key={f} value={f}>{f}</option>
                  ))}
                </select>
              </div>

              {/* Sort Selector */}
              <div className="sm:col-span-3">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="w-full py-2.5 px-3 bg-[#072116] border border-[#143D2B] rounded-lg text-xs text-slate-200 focus:outline-none focus:border-[#E6C665]"
                >
                  <option value="featured">Featured Curations</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
            </div>

            {/* Active search/filter status */}
            <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-white tabular-nums">{filteredProducts.length}</span>
                <span>Creations Available</span>
                {(selectedCategory !== 'all' || selectedFamily !== 'all' || searchQuery) && (
                  <button
                    onClick={() => {
                      setSelectedCategory('all');
                      setSelectedFamily('all');
                      setSearchQuery('');
                    }}
                    className="text-[#E6C665] hover:underline ml-2"
                  >
                    Reset Filters
                  </button>
                )}
              </div>
              <div className="text-[11px] text-emerald-200/70 hidden sm:block">
                All orders include leak-proof packaging &amp; doorstep delivery
              </div>
            </div>

          </div>

          {/* Product Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 pt-4">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onQuickAdd={(p) => handleAddToCart(p)}
                  onInspect={(p) => setInspectedProduct(p)}
                  isWishlisted={wishlist.some((w) => w.id === product.id)}
                  onToggleWishlist={handleToggleWishlist}
                />
              ))}
            </div>
          ) : (
            /* Empty Filter State */
            <div className="py-20 text-center space-y-4 bg-[#072116]/50 rounded-2xl border border-[#143D2B]">
              <Sparkles className="w-12 h-12 text-[#E6C665]/40 mx-auto" />
              <h3 className="font-display text-xl text-white font-semibold">
                No Fragrance Formulations Match Your Criteria
              </h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Try searching for &quot;My Way&quot;, &quot;Stronger With You&quot;, &quot;9 PM&quot;, &quot;Brown Orchid&quot;, or call us directly at <strong>{CALL_NUMBER}</strong>.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSelectedFamily('all');
                  setSearchQuery('');
                }}
                className="px-6 py-2.5 bg-[#E6C665] text-[#04120B] font-bold text-xs uppercase tracking-wider rounded-lg hover:bg-[#D4AF37] transition-colors"
              >
                Reset All Filters
              </button>
            </div>
          )}

        </section>

        {/* 4-Step Scent Ritual Section */}
        <ScentRitualSection />

      </main>

      {/* Footer with direct phone & WhatsApp */}
      <Footer />

      {/* Product Detail Modal (PDP) */}
      <ProductDetailModal
        product={inspectedProduct}
        onClose={() => setInspectedProduct(null)}
        onAddToCart={(prod, size, qty) => handleAddToCart(prod, size, qty)}
        isWishlisted={inspectedProduct ? wishlist.some((w) => w.id === inspectedProduct.id) : false}
        onToggleWishlist={(p) => handleToggleWishlist(p)}
      />

      {/* Slide-out Cart Drawer with 2-step Checkout */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
      />

      {/* Wishlist Drawer */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlist={wishlist}
        onRemoveFromWishlist={handleToggleWishlist}
        onMoveToCart={handleMoveToCart}
        onInspect={(p) => setInspectedProduct(p)}
      />

      {/* Scent Finder Quiz Modal */}
      <ScentFinderModal
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
        onSelectProduct={(p) => setInspectedProduct(p)}
        onQuickAdd={(p) => handleAddToCart(p)}
      />

    </div>
  );
}
