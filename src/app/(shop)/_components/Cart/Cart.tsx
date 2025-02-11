"use client";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { CartContext, CartProduct } from "@/providers/cart";
import { DialogTitle } from "@radix-ui/react-dialog";
import {
  ChevronDownIcon,
  ChevronRightIcon,
  Loader2Icon,
  ShoppingCartIcon,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { useContext, useState } from "react";
import CartItem from "./CartItem";
import { computeProductTotalPrice } from "@/helpers/product";
import toCurrency from "@/helpers/toCurrency";
import Separator from "../Separator";
import { toast } from "sonner";
import { handleFinishPurchaseClick } from "@/lib/checkout";
import { useSession } from "next-auth/react";

const Cart = () => {
  const { data } = useSession();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);
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

  const handleDeleteItemClick = (product: CartProduct): void => {
    toast("Item excluído com sucesso");
    removeProductToCart(product);
  };

  const isCartVisible =
    products.length > 0 &&
    pathname !== "/user-profile" &&
    pathname !== "/user-profile/wishlist" &&
    pathname !== "/user-profile/orders";

  const localCart = pathname === "/";

  const handleCheckoutClick = async (products: CartProduct[]) => {
    setIsLoading(true);
    await handleFinishPurchaseClick(data?.user.id as string, products);
    setIsLoading(false);
  };

  return (
    <>
      <div className="lg:flex hidden flex-none">
        <Sheet>
          <SheetTrigger
            className={`fixed z-50 cursor-pointer ${
              localCart
                ? "bottom-5 right-5 lg:right-14 xl:right-24 2xl:right-28 lg:bottom-14"
                : "bottom-24 right-5 lg:right-14 xl:right-24 2xl:right-56"
            } rounded-full bg-gradient h-12 w-12 sm:w-16 sm:h-16 grid place-content-center text-secondaryColor animate-bounce ${
              !isCartVisible ? "flex-none hidden" : ""
            }`}
          >
            <div className="relative">
              <div className="bg-blur-purple absolute top-0 left-0 w-full h-full z-[-1]"></div>
              <ShoppingCartIcon />
              <p className="absolute bottom-4 left-4 bg-backgroundItem rounded-full sm:text-lg px-2">
                {totalItems}
              </p>
            </div>
          </SheetTrigger>
          <SheetContent
            className="border-none rounded-tl-3xl text-secondaryColor px-8 py-3 hidden flex-none lg:flex lg:flex-col"
            side={"right"}
            aria-describedby={undefined}
          >
            <div className="flex items-center mb-1 my-3">
              <SheetClose className="outline-none">
                <ChevronRightIcon size={36} />
              </SheetClose>
              <DialogTitle className="text-3xl mx-auto">
                Meu <span className="text-primaryColor">carrinho</span>
              </DialogTitle>
            </div>
            <div className="max-h-[40rem] overflow-y-scroll w-full flex flex-col gap-2">
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
              <div className="flex items-center justify-between text-lg">
                <h2 className="opacity-70">Sub-Total</h2>
                <span>{toCurrency(subtotal)}</span>
              </div>
              <div className="flex items-center justify-between text-lg">
                <h2 className="opacity-70">Desconto</h2>
                <span className="text-green-400">
                  -{toCurrency(totalDiscount)}
                </span>
              </div>
              <div className="flex items-center justify-between text-xl">
                <h2 className="opacity-70">Valor total</h2>
                <span>{toCurrency(total)}</span>
              </div>
              <button
                className="w-full bg-gradient rounded-md py-3 text-lg flex items-center justify-center gap-1"
                onClick={() => handleCheckoutClick(products)}
                disabled={products.length === 0 || isLoading}
              >
                Ir para o checkout
                {isLoading && <Loader2Icon className="animate-spin" />}
              </button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
      <div className="flex lg:hidden lg:flex-none">
        <Sheet>
          <SheetTrigger
            className={`fixed z-50 cursor-pointer ${
              localCart
                ? "bottom-5 right-5 lg:right-24 lg:bottom-14"
                : "bottom-24 right-5 lg:right-24"
            } rounded-full bg-gradient h-12 w-12 sm:w-16 sm:h-16 grid place-content-center text-secondaryColor animate-bounce ${
              !isCartVisible ? "flex-none hidden" : ""
            }`}
          >
            <div className="relative">
              <div className="bg-blur-purple absolute top-0 left-0 w-full h-full z-[-1]"></div>
              <ShoppingCartIcon />
              <p className="absolute bottom-4 left-4 bg-backgroundItem rounded-full sm:text-lg px-2">
                {totalItems}
              </p>
            </div>
          </SheetTrigger>
          <SheetContent
            className="bg-[#131313] border-none rounded-tr-3xl rounded-tl-3xl h-[30rem] sm:h-[35rem] text-secondaryColor px-5 sm:px-8 sm:py-3 py-2 flex flex-col lg:flex-none lg:hidden"
            side={"bottom"}
            aria-describedby={undefined}
          >
            <div className="flex justify-between items-center mb-1">
              <DialogTitle className="text-2xl sm:text-3xl">
                Meu <span className="text-primaryColor">carrinho</span>
              </DialogTitle>
              <SheetClose className="outline-none">
                <ChevronDownIcon size={36} />
              </SheetClose>
            </div>
            <div className="max-h-[13rem] sm:max-h-[18rem] overflow-y-scroll w-full flex flex-col sm:gap-2 [&::-webkit-scrollbar]:hidden">
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
              <div className="flex items-center justify-between sm:text-lg">
                <h2 className="opacity-70">Sub-Total</h2>
                <span>{toCurrency(subtotal)}</span>
              </div>
              <div className="flex items-center justify-between sm:text-lg">
                <h2 className="opacity-70">Desconto</h2>
                <span className="text-green-400">
                  -{toCurrency(totalDiscount)}
                </span>
              </div>
              <div className="flex items-center justify-between sm:text-xl">
                <h2 className="opacity-70">Valor total</h2>
                <span>{toCurrency(total)}</span>
              </div>
              <button
                className="w-full bg-gradient flex items-center justify-center gap-1 rounded-md py-2 sm:py-3 sm:text-lg"
                onClick={() => handleCheckoutClick(products)}
                disabled={products.length === 0 || isLoading}
              >
                Ir para o checkout
                {isLoading && <Loader2Icon className="animate-spin" />}
              </button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
};

export default Cart;
