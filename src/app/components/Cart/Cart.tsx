"use client";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { CartContext, CartProduct } from "@/providers/cart";
import { DialogTitle } from "@radix-ui/react-dialog";
import { ChevronDownIcon, ShoppingCartIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { useContext } from "react";
import CartItem from "./CartItem";
import { computeProductTotalPrice } from "@/helpers/product";
import toCurrency from "@/helpers/toCurrency";
import Separator from "../Separator";
import { toast } from "sonner";

const Cart = () => {
  const pathname = usePathname();
  const {
    products,
    total,
    totalDiscount,
    subtotal,
    removeProductToCart,
    increasedQuantity,
    decreasedQuantity,
  } = useContext(CartContext);

  const totalItems = products.reduce(
    (acc, product) => acc + product.quantity,
    0
  );

  const handleDeleteItemClick = (product: CartProduct) => {
    toast("Item excluído com sucesso");
    removeProductToCart(product);
  };

  return (
    <Sheet>
      <SheetTrigger
        className={`fixed z-50 cursor-pointer ${
          pathname === "/" ? "bottom-5 right-5" : "bottom-24 left-5"
        } rounded-full bg-gradient h-12 w-12 grid place-content-center text-secondaryColor animate-bounce ${
          products.length <= 0 || pathname === "/user-profile"
            ? "flex-none hidden"
            : ""
        }`}
      >
        <div className="relative">
          <div className="bg-blur-purple absolute top-0 left-0 w-full h-full z-[-1]"></div>
          <ShoppingCartIcon />
          <p className="absolute bottom-4 left-4 bg-backgroundItem rounded-full px-2">
            {totalItems}
          </p>
        </div>
      </SheetTrigger>
      <SheetContent
        className="bg-[#131313] border-none rounded-tr-3xl rounded-tl-3xl h-[30rem] text-secondaryColor px-5 py-2 flex flex-col"
        side={"bottom"}
        aria-describedby={undefined}
      >
        <div className="flex justify-between items-center mb-1">
          <DialogTitle className="text-2xl">
            Meu <span className="text-primaryColor">carrinho</span>
          </DialogTitle>
          <SheetClose className="select-none">
            <ChevronDownIcon size={36} />
          </SheetClose>
        </div>
        <div className="max-h-[13rem] overflow-y-scroll w-full flex flex-col">
          {products.map((product) => (
            <CartItem
              product={{
                ...product,
                totalPrice: computeProductTotalPrice(product),
              }}
              handleDeleteItem={handleDeleteItemClick}
              handleIncreasedQuantity={increasedQuantity}
              handleDecreasedQuantity={decreasedQuantity}
              key={product.id}
            />
          ))}
        </div>
        <div className="flex flex-col mt-auto mb-2 gap-2">
          <Separator />
          <div className="flex items-center justify-between">
            <h2 className="opacity-70">Sub-Total</h2>
            <span>{toCurrency({ price: subtotal })}</span>
          </div>
          <div className="flex items-center justify-between">
            <h2 className="opacity-70">Desconto</h2>
            <span className="text-green-400">
              -{toCurrency({ price: totalDiscount })}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <h2 className="opacity-70">Preço final</h2>
            <span>{toCurrency({ price: total })}</span>
          </div>
          <button className="w-full bg-gradient rounded-md py-2">
            Ir para o checkout
          </button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Cart;
