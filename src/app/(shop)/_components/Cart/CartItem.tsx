import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import toCurrency from "@/helpers/toCurrency";
import { CartProduct } from "@/providers/cart";
import { DialogDescription } from "@radix-ui/react-dialog";
import { ChevronLeft, ChevronRight, TrashIcon } from "lucide-react";
import Image from "next/image";

interface CartItemProps {
  product: CartProduct;
  handleDeleteItem: (product: CartProduct) => void;
  handleIncreasedQuantity: (productId: string) => void;
  handleDecreasedQuantity: (productId: string) => void;
}

const CartItem = ({
  product,
  handleDeleteItem,
  handleIncreasedQuantity,
  handleDecreasedQuantity,
}: CartItemProps) => {
  return (
    <div className="flex justify-between mt-2 text-secondaryColor">
      <div className="flex gap-2">
        <Image
          src={product.imageURLs[1]}
          alt={product.slug}
          width={0}
          height={0}
          sizes="100vw"
          loading="lazy"
          className="w-20 h-20 sm:w-28 sm:h-28 object-contain bg-backgroundItem rounded-lg p-2"
        />
        <div className="flex flex-col sm:gap-1">
          <h2 className="sm:text-xl truncate">{product.name}</h2>
          {product.discountPercentage > 0 ? (
            <div className="flex flex-col">
              <h3 className="flex gap-1 items-center">
                <span className="text-lg sm:text-xl">
                  {toCurrency(product.totalPrice)}
                </span>
                <span className="line-through opacity-60 text-xs sm:text-sm">
                  {toCurrency(Number(product.basePrice))}
                </span>
              </h3>
            </div>
          ) : (
            <h1 className="text-lg sm:text-xl">
              {toCurrency(Number(product.basePrice))}
            </h1>
          )}
          <div className="flex items-center">
            <h2 className="text-sm sm:text-base">Quantidade:</h2>
            <ChevronLeft
              size={30}
              className="cursor-pointer"
              onClick={() => handleDecreasedQuantity(product.id)}
            />
            <span className="text-base sm:text-lg">{product.quantity}</span>
            <ChevronRight
              size={30}
              className="cursor-pointer"
              onClick={() => handleIncreasedQuantity(product.id)}
            />
          </div>
        </div>
      </div>
      <Dialog>
        <DialogTrigger>
          <TrashIcon size={22} className="mr-2" />
        </DialogTrigger>
        <DialogContent className="lg:w-[45%] xl:w-[35%] 2xl:w-[30%] 3xl:w-[25%]">
          <DialogHeader>
            <DialogTitle className="sm:text-xl mt-2 sm:w-[90%]">
              Tem certeza que deseja excluir o produto{" "}
              <span className="text-primaryColor">{product.name}</span> do
              carrinho?
            </DialogTitle>
            <DialogDescription className="text-sm opacity-70">
              Não será possível reverter essa ação.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-around sm:justify-end w-full gap-4">
            <DialogClose className="w-full sm:w-fit sm:px-7 text-black bg-gray-400 rounded-lg">
              Voltar
            </DialogClose>
            <button
              className="w-full sm:w-fit sm:px-7 bg-red-500 rounded-lg py-1"
              onClick={() => handleDeleteItem(product)}
            >
              Excluir
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CartItem;
