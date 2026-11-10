import React, { useState } from 'react';
import { CartItem } from '../types';
import { X, Trash2, Gift, ShieldCheck, CheckCircle2, Sparkles, ArrowRight, MessageCircle, Phone } from 'lucide-react';
import { formatUGX, CALL_NUMBER, WHATSAPP_NUMBER, WHATSAPP_INTERNATIONAL } from '../utils/format';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (index: number, quantity: number) => void;
  onRemoveItem: (index: number) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  if (!isOpen) return null;

  const [includeGiftWrap, setIncludeGiftWrap] = useState(true);
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState('');

  // Checkout flow state
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState('');

  // Form fields
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'momo' | 'cod' | 'card'>('momo');

  const subtotal = items.reduce(
    (sum, item) => sum + item.selectedSize.priceUGX * item.quantity,
    0
  );

  const freeShippingThreshold = 250000; // Free shipping for orders above UGX 250,000
  const isFreeShipping = subtotal >= freeShippingThreshold;
  const shippingCost = isFreeShipping || subtotal === 0 ? 0 : 15000;
  const discountAmount = Math.round((subtotal * discountPercent) / 100);
  const finalTotal = subtotal - discountAmount + shippingCost;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'HOTICE15') {
      setDiscountPercent(15);
      setPromoSuccess('15% VIP Maison discount applied!');
      setPromoError('');
    } else {
      setPromoError('Invalid code. Try "HOTICE15"');
      setPromoSuccess('');
    }
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerAddress || !customerPhone) {
      alert('Please fill in your name, delivery address, and phone number.');
      return;
    }
    const generatedId = `UG-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderId(generatedId);
    setIsOrderPlaced(true);
    onClearCart();
  };

  // Generate WhatsApp order text
  const getFullCartWhatsAppUrl = () => {
    let text = `*New Order from Hot Ice Luxury Scents Website*\n\n`;
    text += `*Items Ordered:*\n`;
    items.forEach((item, idx) => {
      text += `${idx + 1}. ${item.product.name} - ${item.selectedSize.label} (${item.selectedSize.volume}) x ${item.quantity} = ${formatUGX(item.selectedSize.priceUGX * item.quantity)}\n`;
    });
    text += `\n*Subtotal:* ${formatUGX(subtotal)}`;
    if (discountAmount > 0) {
      text += `\n*VIP Discount (15%):* -${formatUGX(discountAmount)}`;
    }
    text += `\n*Delivery:* ${shippingCost === 0 ? 'FREE' : formatUGX(shippingCost)}`;
    text += `\n*Total Payable:* *${formatUGX(finalTotal)}*\n`;
    if (customerName) text += `\n*Name:* ${customerName}`;
    if (customerPhone) text += `\n*Phone:* ${customerPhone}`;
    if (customerAddress) text += `\n*Location:* ${customerAddress}`;
    text += `\n\nPlease confirm availability and delivery time.`;

    return `https://wa.me/${WHATSAPP_INTERNATIONAL}?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/85 backdrop-blur-sm animate-fadeIn">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#061D13] border-l border-[#174A33] text-white flex flex-col shadow-2xl relative">
          
          {/* Header */}
          <div className="p-5 border-b border-[#143D2B] flex items-center justify-between bg-[#03140D]/90">
            <div className="flex items-center gap-2">
              <span className="font-cinzel text-lg font-bold tracking-widest text-[#E6C665]">
                HOT ICE
              </span>
              <span className="text-xs tracking-wider uppercase text-slate-300">
                · {isOrderPlaced ? 'Order Confirmed' : isCheckingOut ? 'Kampala Checkout' : `Bag (${items.length})`}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-[#0A2619] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick direct contact bar */}
          <div className="px-5 py-2.5 bg-[#082619] border-b border-[#143D2B] flex items-center justify-between text-xs">
            <a href={`tel:${CALL_NUMBER}`} className="flex items-center gap-1.5 text-white hover:text-[#E6C665]">
              <Phone className="w-3.5 h-3.5 text-[#E6C665]" />
              <span className="tabular-nums font-semibold">{CALL_NUMBER}</span>
            </a>
            <span className="text-slate-500">|</span>
            <a href={getFullCartWhatsAppUrl()} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-[#25D366] hover:underline font-semibold">
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp Order</span>
            </a>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-5 space-y-5">
            {isOrderPlaced ? (
              /* Order Confirmation State */
              <div className="py-8 text-center space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-[#E6C665]/20 border border-[#E6C665] flex items-center justify-center text-[#E6C665]">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <div>
                  <h3 className="font-display text-2xl font-bold text-white">Order {orderId} Confirmed</h3>
                  <p className="text-xs uppercase tracking-widest text-[#E6C665] mt-1 font-semibold">
                    Preparing In Hot Ice Flacon Vault
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#092619] border border-[#143D2B] text-left text-xs space-y-2 text-slate-300">
                  <div className="flex justify-between border-b border-[#143D2B] pb-2">
                    <span className="text-slate-400">Recipient:</span>
                    <span className="font-semibold text-white">{customerName}</span>
                  </div>
                  <div className="flex justify-between border-b border-[#143D2B] pb-2">
                    <span className="text-slate-400">Delivery Address:</span>
                    <span className="font-semibold text-white text-right max-w-[180px] truncate">{customerAddress}</span>
                  </div>
                  <div className="flex justify-between border-b border-[#143D2B] pb-2">
                    <span className="text-slate-400">Payment:</span>
                    <span className="font-semibold text-[#E6C665] uppercase">
                      {paymentMethod === 'momo' ? 'Mobile Money (MTN / Airtel)' : paymentMethod === 'cod' ? 'Cash On Delivery' : 'Credit Card'}
                    </span>
                  </div>
                  <div className="flex justify-between pt-1 font-bold text-sm text-white">
                    <span>Total Amount:</span>
                    <span className="text-[#E6C665]">{formatUGX(finalTotal)}</span>
                  </div>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed font-light">
                  A verification SMS/WhatsApp will be sent to your phone. Our rider will deliver your fragrance package safely to your doorstep.
                </p>

                <div className="space-y-2 pt-2">
                  <a
                    href={getFullCartWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 bg-[#0A3822] text-[#25D366] border border-[#25D366]/50 font-bold text-xs uppercase tracking-wider rounded-lg flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Follow Up on WhatsApp</span>
                  </a>

                  <button
                    onClick={() => {
                      setIsOrderPlaced(false);
                      setIsCheckingOut(false);
                      onClose();
                    }}
                    className="w-full py-3 bg-[#E6C665] text-[#04120B] font-bold text-xs uppercase tracking-widest rounded-lg hover:bg-[#D4AF37] transition-colors"
                  >
                    Continue Shopping
                  </button>
                </div>
              </div>
            ) : isCheckingOut ? (
              /* Checkout Form */
              <form onSubmit={handlePlaceOrder} className="space-y-4 text-left">
                <div className="border-b border-[#143D2B] pb-3">
                  <h3 className="font-display text-lg text-white font-semibold">Kampala &amp; Uganda Delivery</h3>
                  <p className="text-xs text-slate-400">Doorstep delivery for flacons and decants.</p>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block uppercase tracking-wider font-semibold text-slate-300 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Grace Nakato"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#092619] border border-[#143D2B] text-white focus:outline-none focus:border-[#E6C665]"
                    />
                  </div>

                  <div>
                    <label className="block uppercase tracking-wider font-semibold text-slate-300 mb-1">
                      Phone Number (Calls &amp; Mobile Money) *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 0701994557 or 0747239895"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#092619] border border-[#143D2B] text-white focus:outline-none focus:border-[#E6C665]"
                    />
                  </div>

                  <div>
                    <label className="block uppercase tracking-wider font-semibold text-slate-300 mb-1">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      placeholder="grace@example.com"
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#092619] border border-[#143D2B] text-white focus:outline-none focus:border-[#E6C665]"
                    />
                  </div>

                  <div>
                    <label className="block uppercase tracking-wider font-semibold text-slate-300 mb-1">
                      Delivery Address / Landmark *
                    </label>
                    <textarea
                      required
                      rows={2}
                      placeholder="e.g. Kololo / Naguru / Ntinda / Entebbe / Kampala CBD"
                      value={customerAddress}
                      onChange={(e) => setCustomerAddress(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#092619] border border-[#143D2B] text-white focus:outline-none focus:border-[#E6C665]"
                    />
                  </div>

                  <div>
                    <label className="block uppercase tracking-wider font-semibold text-slate-300 mb-1.5">
                      Payment Method
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('momo')}
                        className={`p-2.5 rounded-lg border text-[10px] font-semibold tracking-wider uppercase transition-colors ${
                          paymentMethod === 'momo'
                            ? 'border-[#E6C665] bg-[#E6C665]/15 text-[#E6C665]'
                            : 'border-[#143D2B] bg-[#092619] text-slate-400'
                        }`}
                      >
                        MTN/Airtel MoMo
                      </button>
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('cod')}
                        className={`p-2.5 rounded-lg border text-[10px] font-semibold tracking-wider uppercase transition-colors ${
                          paymentMethod === 'cod'
                            ? 'border-[#E6C665] bg-[#E6C665]/15 text-[#E6C665]'
                            : 'border-[#143D2B] bg-[#092619] text-slate-400'
                        }`}
                      >
                        Cash on Delivery
                      </button>
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('card')}
                        className={`p-2.5 rounded-lg border text-[10px] font-semibold tracking-wider uppercase transition-colors ${
                          paymentMethod === 'card'
                            ? 'border-[#E6C665] bg-[#E6C665]/15 text-[#E6C665]'
                            : 'border-[#143D2B] bg-[#092619] text-slate-400'
                        }`}
                      >
                        Debit / Visa
                      </button>
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsCheckingOut(false)}
                    className="w-1/3 py-3 border border-[#143D2B] rounded-lg text-xs font-semibold text-slate-300 uppercase hover:text-white"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="w-2/3 py-3 bg-gradient-to-r from-[#C29E37] via-[#E6C665] to-[#D4AF37] text-[#04120B] font-bold text-xs uppercase tracking-widest rounded-lg hover:from-[#B18E29] hover:to-[#C29E37] shadow-lg"
                  >
                    Confirm Order · {formatUGX(finalTotal)}
                  </button>
                </div>
              </form>
            ) : items.length === 0 ? (
              /* Empty Cart State */
              <div className="py-16 text-center space-y-3">
                <Sparkles className="w-12 h-12 text-[#E6C665]/40 mx-auto" />
                <h4 className="font-display text-lg text-white font-semibold">Your Shopping Bag is Empty</h4>
                <p className="text-xs text-slate-400 max-w-xs mx-auto">
                  Explore full flacons and travel decants starting at just UGX 25,000.
                </p>
                <button
                  onClick={onClose}
                  className="mt-4 px-6 py-2.5 bg-[#E6C665] text-[#04120B] font-bold text-xs uppercase tracking-wider rounded-lg hover:bg-[#D4AF37] transition-colors"
                >
                  Browse Fragrances
                </button>
              </div>
            ) : (
              /* Cart Items List */
              <>
                {/* Free shipping progress bar for UGX */}
                <div className="p-3 rounded-lg bg-[#092619] border border-[#143D2B] text-xs">
                  {isFreeShipping ? (
                    <div className="flex items-center gap-1.5 text-[#E6C665] font-medium">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Congratulations! You qualify for Free Kampala Delivery.</span>
                    </div>
                  ) : (
                    <div>
                      <div className="flex justify-between text-slate-300 mb-1.5">
                        <span>Free Delivery Threshold (UGX 250k)</span>
                        <span className="font-semibold text-[#E6C665]">
                          Add {formatUGX(freeShippingThreshold - subtotal)} more
                        </span>
                      </div>
                      <div className="w-full h-1.5 bg-[#04120B] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-[#C29E37] to-[#E6C665] rounded-full transition-all duration-300"
                          style={{ width: `${Math.min(100, (subtotal / freeShippingThreshold) * 100)}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Items */}
                <div className="space-y-3">
                  {items.map((item, idx) => (
                    <div
                      key={`${item.product.id}-${item.selectedSize.label}`}
                      className="flex gap-3 p-3 rounded-xl bg-[#092619]/70 border border-[#143D2B] items-center"
                    >
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        referrerPolicy="no-referrer"
                        className="w-16 h-16 object-cover rounded-lg border border-[#143D2B] shrink-0"
                      />

                      <div className="flex-1 min-w-0 text-left">
                        <div className="flex items-center gap-1.5">
                          <h4 className="font-display text-sm font-semibold text-white truncate">
                            {item.product.name}
                          </h4>
                          {item.selectedSize.isDecant && (
                            <span className="text-[9px] uppercase font-bold px-1.5 py-0.5 rounded bg-emerald-900/80 text-emerald-300 border border-emerald-600/40">
                              Decant
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-400">
                          {item.selectedSize.label} · {item.selectedSize.volume}
                        </p>
                        <div className="text-xs font-bold text-[#E6C665] mt-0.5 tabular-nums">
                          {formatUGX(item.selectedSize.priceUGX)}
                        </div>
                      </div>

                      {/* Quantity Stepper */}
                      <div className="flex items-center border border-[#143D2B] rounded bg-[#04120B]">
                        <button
                          onClick={() => onUpdateQuantity(idx, item.quantity - 1)}
                          className="px-2 py-1 text-slate-400 hover:text-white text-xs"
                        >
                          -
                        </button>
                        <span className="px-2 py-1 text-xs font-semibold tabular-nums text-white">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(idx, item.quantity + 1)}
                          className="px-2 py-1 text-slate-400 hover:text-white text-xs"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => onRemoveItem(idx)}
                        className="p-1.5 text-slate-500 hover:text-rose-400 transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Gift packaging toggle */}
                <div
                  onClick={() => setIncludeGiftWrap(!includeGiftWrap)}
                  className="flex items-center justify-between p-3 rounded-xl bg-[#092619]/40 border border-[#143D2B] cursor-pointer hover:border-[#E6C665]/40 transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <Gift className="w-4 h-4 text-[#E6C665]" />
                    <div className="text-xs text-left">
                      <div className="font-semibold text-white">Complimentary Golden Gift Box</div>
                      <div className="text-[10px] text-slate-400">Velvet cushioning &amp; sealed ribbon</div>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={includeGiftWrap}
                    onChange={() => {}}
                    className="accent-[#E6C665] w-4 h-4"
                  />
                </div>

                {/* Promo Code Box */}
                <form onSubmit={handleApplyPromo} className="flex gap-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="VIP Code (use: HOTICE15)"
                    className="flex-1 px-3 py-2 bg-[#092619] border border-[#143D2B] text-xs text-white rounded-lg focus:outline-none focus:border-[#E6C665]"
                  />
                  <button
                    type="submit"
                    className="px-3.5 py-2 bg-[#0C3523] hover:bg-[#114B31] border border-[#174A33] text-[#E6C665] text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors"
                  >
                    Apply
                  </button>
                </form>
                {promoError && <p className="text-[11px] text-rose-400 text-left">{promoError}</p>}
                {promoSuccess && <p className="text-[11px] text-emerald-400 text-left">{promoSuccess}</p>}
              </>
            )}
          </div>

          {/* Footer Totals & Checkout Button */}
          {!isOrderPlaced && items.length > 0 && (
            <div className="p-5 border-t border-[#143D2B] bg-[#03140D] space-y-3">
              <div className="space-y-1.5 text-xs text-slate-300">
                <div className="flex justify-between">
                  <span className="text-slate-400">Subtotal:</span>
                  <span className="font-semibold text-white tabular-nums">{formatUGX(subtotal)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>VIP Discount ({discountPercent}%):</span>
                    <span className="tabular-nums">-{formatUGX(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-slate-400">Delivery:</span>
                  <span className="font-semibold text-white tabular-nums">
                    {shippingCost === 0 ? 'FREE' : formatUGX(shippingCost)}
                  </span>
                </div>
                <div className="flex justify-between pt-2 border-t border-[#143D2B] font-bold text-base text-white">
                  <span>Grand Total:</span>
                  <span className="text-[#E6C665] tabular-nums">{formatUGX(finalTotal)}</span>
                </div>
              </div>

              {!isCheckingOut ? (
                <div className="space-y-2">
                  {/* Direct WhatsApp Instant Checkout */}
                  <a
                    href={getFullCartWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 bg-[#0A3822] hover:bg-[#0E4A2E] border border-[#25D366]/50 text-[#25D366] font-bold text-xs uppercase tracking-wider rounded-lg transition-colors flex items-center justify-center gap-2 shadow-md"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Instant Order on WhatsApp</span>
                  </a>

                  <button
                    onClick={() => setIsCheckingOut(true)}
                    className="w-full py-3.5 bg-gradient-to-r from-[#C29E37] via-[#E6C665] to-[#D4AF37] text-[#04120B] font-bold text-xs uppercase tracking-[0.18em] rounded-lg hover:from-[#B18E29] hover:to-[#C29E37] transition-all flex items-center justify-center gap-2 shadow-lg"
                  >
                    <span>Proceed to Delivery Details</span>
                    <ArrowRight className="w-4 h-4 text-[#04120B]" />
                  </button>
                </div>
              ) : null}

              <div className="flex items-center justify-center gap-3 text-[10px] text-slate-400">
                <div className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#E6C665]" />
                  <span>Doorstep Delivery in Uganda</span>
                </div>
                <span>·</span>
                <span>Payment on Delivery</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
