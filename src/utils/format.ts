export const CALL_NUMBER = '0701994557';
export const WHATSAPP_NUMBER = '0747239895';
export const WHATSAPP_INTERNATIONAL = '256747239895';

export const formatUGX = (amount: number): string => {
  return `UGX ${amount.toLocaleString()}`;
};

export const getWhatsAppOrderUrl = (
  productName?: string,
  variant?: string,
  priceUGX?: number
): string => {
  let message = 'Hello Hot Ice Luxury Scents! I would like to place an order.';
  if (productName) {
    message = `Hello Hot Ice Luxury Scents! I would like to order: *${productName}*`;
    if (variant) {
      message += ` (${variant})`;
    }
    if (priceUGX) {
      message += ` at *${formatUGX(priceUGX)}*`;
    }
    message += `. Please let me know how soon you can deliver in Kampala/Uganda.`;
  }
  return `https://wa.me/${WHATSAPP_INTERNATIONAL}?text=${encodeURIComponent(message)}`;
};

export const getWhatsAppGeneralUrl = (): string => {
  const message = 'Hello Hot Ice Luxury Scents! I have an inquiry about your luxury perfumes and decants.';
  return `https://wa.me/${WHATSAPP_INTERNATIONAL}?text=${encodeURIComponent(message)}`;
};
