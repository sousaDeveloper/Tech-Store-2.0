"use client";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { CartContext } from "@/providers/cart";
import { DialogTitle } from "@radix-ui/react-dialog";
import { ChevronDownIcon, ShoppingCartIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { useContext } from "react";

const Cart = () => {
  const pathname = usePathname();
  const { products } = useContext(CartContext);

  const totalItems = products.reduce(
    (acc, product) => acc + product.quantity,
    0
  );

  return (
    <Sheet>
      <SheetTrigger
        className={`fixed z-50 cursor-pointer ${
          pathname === "/" ? "bottom-5 right-5" : "bottom-24 left-5"
        } rounded-full bg-gradient h-12 w-12 grid place-content-center text-secondaryColor animate-bounce ${
          products.length <= 0 && "flex-none hidden"
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
        className="bg-[#131313] border-none rounded-tr-3xl rounded-tl-3xl h-[30rem] text-secondaryColor px-5 py-2"
        side={"bottom"}
        aria-describedby={undefined}
      >
        <div className="flex justify-between items-center">
          <DialogTitle className="text-2xl">
            Meu <span className="text-primaryColor">carrinho</span>
          </DialogTitle>
          <SheetClose className="select-none">
            <ChevronDownIcon size={36} />
          </SheetClose>
        </div>
        {products.map((product) => (
          <>
            <h1 key={product.id}>{product.name}</h1>
            <p>{product.quantity}</p>
          </>
        ))}
      </SheetContent>
    </Sheet>
  );
};

export default Cart;
