export type ToyCategory =
  | 'All'
  | 'Wooden & Montessori'
  | 'STEM & Science'
  | 'Plush Companions'
  | 'Creative Arts'
  | 'Mechanical & Music';

export type AgeGroup = 'All' | '0-2 Years' | '3-5 Years' | '6-8 Years' | '9+ Years';

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
}

export interface ToyProduct {
  id: string;
  title: string;
  subtitle: string;
  price: number;
  originalPrice?: number;
  category: Exclude<ToyCategory, 'All'>;
  ageGroup: Exclude<AgeGroup, 'All'>;
  image: string;
  fallbackGradient?: string;
  rating: number;
  reviewCount: number;
  badge?: string;
  inStock: boolean;
  stockCount: number;
  description: string;
  developmentalSkills: string[];
  materials: string;
  dimensions: string;
  safetyCertifications: string[];
  soundType?: 'musicbox' | 'train' | 'chime' | 'rattle' | 'robot';
  soundLabel?: string;
  featured?: boolean;
  reviews: Review[];
}

export interface CartItem {
  product: ToyProduct;
  quantity: number;
  giftWrap?: boolean;
  giftNote?: string;
}

export interface GiftBoxConfig {
  boxStyle: 'pinewood' | 'hatbox' | 'linen';
  ribbonColor: 'sage' | 'amber' | 'crimson' | 'navy';
  selectedToys: ToyProduct[];
  recipientName: string;
  giftMessage: string;
}

export interface OrderConfirmation {
  orderNumber: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  shippingAddress: {
    fullName: string;
    street: string;
    city: string;
    postalCode: string;
    country: string;
  };
  deliveryEstimate: string;
}
