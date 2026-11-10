export type Category = 'all' | 'affordable-budget' | 'decants' | 'perfumes' | 'body-mists' | 'deodorants' | 'lip-gloss' | 'body-oil-perfumes';

export type OlfactoryFamily = 'Floral' | 'Woody' | 'Oriental' | 'Fruity' | 'Gourmand' | 'Aquatic' | 'Aromatic';

export interface ProductSize {
  label: string;
  priceUGX: number;
  volume: string;
  isDecant?: boolean;
}

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  category: 'perfumes' | 'body-mists' | 'deodorants' | 'lip-gloss' | 'body-oil-perfumes' | 'decants';
  family: OlfactoryFamily;
  priceUGX: number;
  originalPriceUGX?: number;
  rating: number;
  reviewCount: number;
  image: string;
  fallbackGradient: string;
  badge?: string;
  description: string;
  volume: string;
  concentration: string;
  longevity: string;
  sillage: 'Intimate' | 'Moderate' | 'Enormous' | 'Radiant';
  topNotes: string[];
  heartNotes: string[];
  baseNotes: string[];
  story: string;
  ritualTip: string;
  sizes: ProductSize[];
  decantsAvailable?: boolean;
  isFeatured?: boolean;
  isBudgetFriendly?: boolean;
}

export interface CartItem {
  product: Product;
  selectedSize: ProductSize;
  quantity: number;
}

export type ColorTheme = 'emerald' | 'amber-gold' | 'sapphire' | 'obsidian';
