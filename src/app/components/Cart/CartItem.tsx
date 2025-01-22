import toCurrency from "@/helpers/toCurrency";
import { CartProduct } from "@/providers/cart";
import { TrashIcon } from "lucide-react";
import Image from "next/image";

interface CartItemProps {
  product: CartProduct;
}

const CartItem = ({ product }: CartItemProps) => {
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
          <h2 className="text-sm">
            Quantidade: <span>{product.quantity}</span>
          </h2>
        </div>
      </div>
      <button className="mr-2">
        <TrashIcon size={22} />
      </button>
    </div>
  );
};

export default CartItem;
