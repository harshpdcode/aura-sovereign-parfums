export type Role = 'USER' | 'ADMIN';

export type ProductStatus = 'ACTIVE' | 'DRAFT' | 'ARCHIVED';

export type FragranceNoteType = 'TOP' | 'HEART' | 'BASE';

export type OrderStatus = 'PENDING' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';

export type PaymentStatus = 'PENDING' | 'PAID' | 'FAILED' | 'REFUNDED';

export type InquiryStatus = 'NEW' | 'IN_PROGRESS' | 'RESOLVED';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  phone?: string | null;
  avatar?: string | null;
  createdAt: string | Date;
}

export interface FragranceNote {
  id: string;
  name: string;
  type: FragranceNoteType;
  description?: string | null;
  icon?: string | null;
}

export interface ProductVariant {
  id: string;
  productId: string;
  size: string;
  price: number;
  sku: string;
  stock: number;
}

export interface ProductImage {
  id: string;
  productId: string;
  imageUrl: string;
  altText?: string | null;
  sortOrder: number;
  isPrimary: boolean;
}

export interface Product {
  id: string;
  legacyId?: number | null;
  name: string;
  slug: string;
  description: string;
  shortDescription?: string | null;
  brand: string;
  categoryId?: string | null;
  category?: {
    id: string;
    name: string;
    slug: string;
  } | null;
  price: number;
  compareAtPrice?: number | null;
  stock: number;
  sku: string;
  status: ProductStatus;
  featured: boolean;
  is3DSupported: boolean;
  modelUrl?: string | null;
  fragranceFamily: string;
  intensity: string;
  gender: string;
  volume: string;
  bottleColor: string;
  createdAt: string | Date;
  images: ProductImage[];
  variants?: ProductVariant[];
  notes?: {
    note: FragranceNote;
  }[];
  reviews?: Review[];
}

export interface CartItem {
  id: string;
  cartId?: string;
  productId: string;
  product: Product;
  variantId?: string | null;
  variant?: ProductVariant | null;
  quantity: number;
  price: number;
}

export interface Cart {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
}

export interface Wishlist {
  id: string;
  userId: string;
  productId: string;
  product: Product;
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId?: string | null;
  variantId?: string | null;
  productNameSnapshot: string;
  productImgSnapshot: string;
  priceSnapshot: number;
  quantity: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  userId?: string | null;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: string;
  status: OrderStatus;
  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  total: number;
  paymentStatus: PaymentStatus;
  paymentMethod: string;
  paymentReference?: string | null;
  notes?: string | null;
  createdAt: string | Date;
  updatedAt: string | Date;
  items: OrderItem[];
}

export interface Review {
  id: string;
  userId: string;
  user?: {
    name: string;
    avatar?: string | null;
  };
  productId: string;
  rating: number;
  title?: string | null;
  comment: string;
  verifiedPurchase: boolean;
  createdAt: string | Date;
}

export interface ContactQuery {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  status: InquiryStatus;
  createdAt: string | Date;
}

export interface Feedback {
  id: string;
  name: string;
  email: string;
  rating: number;
  suggestion: string;
  createdAt: string | Date;
}

export interface ScentProfile {
  id: string;
  mood: string;
  season: string;
  occasion: string;
  intensity: string;
  recommendedFragranceIds: string[];
}
