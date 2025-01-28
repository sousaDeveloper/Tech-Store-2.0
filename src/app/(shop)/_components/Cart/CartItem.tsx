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
          className="w-20 h-20 object-contain bg-backgroundItem rounded-lg p-2"
        />
        <div className="flex flex-col">
          <h2>{product.name}</h2>
          {product.discountPercentage > 0 ? (
            <div className="flex flex-col">
              <h3 className="flex gap-1 items-center">
                <span className="text-lg">
                  {toCurrency({ price: +product.totalPrice })}
                </span>
                <span className="line-through opacity-60 text-xs">
                  {toCurrency({ price: +product.basePrice })}
                </span>
              </h3>
            </div>
          ) : (
            <h1 className="text-lg">
              {toCurrency({ price: +product.basePrice })}
            </h1>
          )}
          <div className="flex items-center">
            <h2 className="text-sm">Quantidade:</h2>
            <ChevronLeft
              size={30}
              className="cursor-pointer"
              onClick={() => handleDecreasedQuantity(product.id)}
            />
            <span className="text-md">{product.quantity}</span>
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
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Tem certeza que deseja excluir o produto [
              {product.name.split(" ")[0]}] do carrinho?
            </DialogTitle>
            <DialogDescription className="text-sm">
              Não será possível reverter essa ação.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-around w-full gap-4">
            <DialogClose className="w-full bg-gray-400 rounded-lg">
              Voltar
            </DialogClose>
            <button
              className=" w-full bg-red-500 rounded-lg py-1"
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
