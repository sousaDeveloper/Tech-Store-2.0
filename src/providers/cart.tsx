"use client";

import { ProductWithTotalPrice } from "@/helpers/product";
import { createContext, ReactNode, useEffect, useState } from "react";
import { useSession } from "next-auth/react"; // Para obter o usuário autenticado

export interface CartProduct extends ProductWithTotalPrice {
  quantity: number;
}

interface ICartContext {
  products: CartProduct[];
  cartTotalPrice: number;
  cartBasePrice: number;
  cartTotalDiscount: number;
  subtotal: number;
  total: number;
  totalDiscount: number;
  addProductToCart: (product: CartProduct) => void;
  removeProductToCart: (product: CartProduct) => void;
  increasedQuantity: (productId: string) => void;
  decreasedQuantity: (productId: string) => void;
  setProducts: React.Dispatch<React.SetStateAction<CartProduct[]>>;
  clearCart: () => void;
}

export const CartContext = createContext<ICartContext>({
  products: [],
  cartTotalPrice: 0,
  cartBasePrice: 0,
  cartTotalDiscount: 0,
  subtotal: 0,
  total: 0,
  totalDiscount: 0,
  addProductToCart: () => {},
  removeProductToCart: () => {},
  increasedQuantity: () => {},
  decreasedQuantity: () => {},
  setProducts: () => {},
  clearCart: () => {},
});

const CartContextProvider = ({ children }: { children: ReactNode }) => {
  const { data: session } = useSession();
  const userId = session?.user?.email;

  const [products, setProducts] = useState<CartProduct[]>([]);

  useEffect(() => {
    if (typeof window !== "undefined" && userId) {
      const storedCart = localStorage.getItem(`cartProducts_${userId}`);
      setProducts(storedCart ? JSON.parse(storedCart) : []);
    }
  }, [userId]);

  useEffect(() => {
    if (typeof window !== "undefined" && userId) {
      localStorage.setItem(`cartProducts_${userId}`, JSON.stringify(products));
    }
  }, [products, userId]);

  const addProductToCart = (product: CartProduct) => {
    setProducts((prev) => {
      const productExists = prev.some((p) => p.id === product.id);

      if (productExists) {
        return prev.map((p) =>
          p.id === product.id
            ? { ...p, quantity: p.quantity + product.quantity }
            : p
        );
      }

      return [...prev, product];
    });
  };

  const removeProductToCart = (product: CartProduct) => {
    setProducts((prev) => prev.filter((p) => p.id !== product.id));
  };

  const increasedQuantity = (productId: string) => {
    setProducts((prev) =>
      prev.map((product) =>
        product.id === productId
          ? { ...product, quantity: product.quantity + 1 }
          : product
      )
    );
  };

  const decreasedQuantity = (productId: string) => {
    setProducts((prev) =>
      prev.map((product) =>
        product.id === productId && product.quantity > 1
          ? { ...product, quantity: product.quantity - 1 }
          : product
      )
    );
  };

  const subtotal = products.reduce(
    (accum, p) => accum + Number(p.basePrice) * p.quantity,
    0
  );
  const total = products.reduce(
    (accum, p) => accum + Number(p.totalPrice) * p.quantity,
    0
  );
  const totalDiscount = subtotal - total;

  const clearCart = () => {
    setProducts([]);
    localStorage.removeItem("cart");
  };

  return (
    <CartContext.Provider
      value={{
        products,
        subtotal,
        totalDiscount,
        total,
        removeProductToCart,
        increasedQuantity,
        decreasedQuantity,
        cartTotalPrice: 0,
        cartBasePrice: 0,
        cartTotalDiscount: 0,
        addProductToCart,
        setProducts,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
