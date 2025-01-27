"use client";

import { ProductWithTotalPrice } from "@/helpers/product";
import { createContext, ReactNode, useState } from "react";

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
});

const CartContextProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<CartProduct[]>([]);

  const addProductToCart = (product: CartProduct) => {
    const productIsAlreadyOnCart = products.some(
      (cartProduct) => cartProduct.id === product.id
    );

    if (productIsAlreadyOnCart) {
      setProducts((prev) =>
        prev.map((cartProduct) => {
          if (cartProduct.id === product.id) {
            return {
              ...cartProduct,
              quantity: cartProduct.quantity + product.quantity,
            };
          }

          return cartProduct;
        })
      );

      return;
    }

    setProducts((prev) => [...prev, product]);
  };

  const subtotal = products.reduce((accum, p) => {
    return accum + Number(p.basePrice) * p.quantity;
  }, 0);

  const total = products.reduce((accum, p) => {
    return accum + Number(p.totalPrice) * p.quantity;
  }, 0);

  const totalDiscount = subtotal - total;

  const removeProductToCart = (product: CartProduct) => {
    return setProducts((prev) => prev.filter((p) => p.id !== product.id));
  };

  const decreasedQuantity = (productId: string) => {
    setProducts((prev) =>
      prev.map((product) => {
        if (product.id === productId) {
          const newQuantity = product.quantity > 1 ? product.quantity - 1 : 1;
          return {
            ...product,
            quantity: newQuantity,
          };
        }
        return product;
      })
    );
  };

  const increasedQuantity = (productId: string) => {
    setProducts((prev) =>
      prev.map((product) => {
        if (product.id === productId) {
          return {
            ...product,
            quantity: product.quantity + 1,
          };
        }
        return product;
      })
    );
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
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
