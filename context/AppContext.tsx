'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, ProductVariant, CartItem, User } from '@/lib/types';
import { INITIAL_PRODUCTS } from '@/lib/data/initialData';

interface AppContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  cart: CartItem[];
  wishlist: string[];
  addToCart: (product: Product, variant?: ProductVariant | null, quantity?: number) => void;
  removeFromCart: (productId: string, variantId?: string | null) => void;
  updateQuantity: (productId: string, variantId: string | null | undefined, quantity: number) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  isScentFinderOpen: boolean;
  setIsScentFinderOpen: (open: boolean) => void;
  cartCount: number;
  cartSubtotal: number;
  login: (token: string, userData: User) => void;
  logout: () => void;
  toasts: { id: string; message: string; type?: 'success' | 'error' | 'info' }[];
  addToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  removeToast: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScentFinderOpen, setIsScentFinderOpen] = useState(false);
  const [toasts, setToasts] = useState<{ id: string; message: string; type?: 'success' | 'error' | 'info' }[]>([]);

  // Load initial cart, wishlist, and auth state from localStorage
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('aldenaire_user');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      } else {
        // Check legacy token
        const legacyToken = localStorage.getItem('token') || localStorage.getItem('AdminToken');
        const legacyType = localStorage.getItem('userType');
        if (legacyToken) {
          setUser({
            id: 'legacy-user',
            name: legacyType === 'Admin' ? 'Admin Officer' : 'Client Privilégié',
            email: 'client@aurasovereign.com',
            role: legacyType === 'Admin' ? 'ADMIN' : 'USER',
            createdAt: new Date(),
          });
        }
      }

      const savedCart = localStorage.getItem('aldenaire_cart');
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }

      const savedWishlist = localStorage.getItem('aldenaire_wishlist');
      if (savedWishlist) {
        setWishlist(JSON.parse(savedWishlist));
      }
    } catch (e) {
      console.error('Failed to load local storage state:', e);
    }
  }, []);

  // Save cart changes
  useEffect(() => {
    try {
      localStorage.setItem('aldenaire_cart', JSON.stringify(cart));
    } catch (e) {}
  }, [cart]);

  // Save wishlist changes
  useEffect(() => {
    try {
      localStorage.setItem('aldenaire_wishlist', JSON.stringify(wishlist));
    } catch (e) {}
  }, [wishlist]);

  const addToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const addToCart = (product: Product, variant: ProductVariant | null = null, quantity: number = 1) => {
    const unitPrice = variant ? variant.price : product.price;

    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(
        (item) => item.productId === product.id && item.variantId === (variant?.id || null)
      );

      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        const newItem: CartItem = {
          id: `item-${Date.now()}-${Math.random()}`,
          productId: product.id,
          product,
          variantId: variant?.id || null,
          variant,
          quantity,
          price: unitPrice,
        };
        return [...prevCart, newItem];
      }
    });

    addToast(`Added "${product.name}" to your shopping bag.`, 'success');
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string, variantId: string | null = null) => {
    setCart((prev) => prev.filter((item) => !(item.productId === productId && item.variantId === (variantId || null))));
    addToast('Item removed from your bag.', 'info');
  };

  const updateQuantity = (productId: string, variantId: string | null | undefined, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, variantId);
      return;
    }

    setCart((prev) =>
      prev.map((item) => {
        if (item.productId === productId && item.variantId === (variantId || null)) {
          return { ...item, quantity };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCart([]);
    try {
      localStorage.removeItem('aldenaire_cart');
    } catch (e) {}
  };

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        addToast('Removed from your wishlist.', 'info');
        return prev.filter((id) => id !== productId);
      } else {
        addToast('Added to your wishlist.', 'success');
        return [...prev, productId];
      }
    });
  };

  const isWishlisted = (productId: string) => wishlist.includes(productId);

  const login = (token: string, userData: User) => {
    setUser(userData);
    localStorage.setItem('token', token);
    localStorage.setItem('aldenaire_user', JSON.stringify(userData));
    localStorage.setItem('userType', userData.role === 'ADMIN' ? 'Admin' : 'User');
    addToast(`Welcome back, ${userData.name}.`, 'success');
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('AdminToken');
    localStorage.removeItem('userType');
    localStorage.removeItem('aldenaire_user');
    addToast('You have signed out.', 'info');
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartSubtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        cart,
        wishlist,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleWishlist,
        isWishlisted,
        isCartOpen,
        setIsCartOpen,
        isSearchOpen,
        setIsSearchOpen,
        isScentFinderOpen,
        setIsScentFinderOpen,
        cartCount,
        cartSubtotal,
        login,
        logout,
        toasts,
        addToast,
        removeToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
