"use client";

import { computeProductTotalPrice } from "@/helpers/product";
import toCurrency from "@/helpers/toCurrency";
import { Prisma } from "@prisma/client";
import { Loader2Icon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface OrderProductItemProps {
  orderProduct: Prisma.OrderProductGetPayload<{
    include: { product: true };
  }>;
}
const OrderProductItem = ({ orderProduct }: OrderProductItemProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const productTotalPrice = computeProductTotalPrice(orderProduct.product);

  const handleRouterClick = () => {
    setIsLoading(true);
    router.push(`/product/${orderProduct.product.slug}`);
  };

  useEffect(() => {
    setIsLoading(false);
  }, []);

  return (
    <div
      className={`relative flex w-full items-center gap-4 shadow-xl ${
        isLoading ? "pointer-events-none" : "cursor-pointer hover:underline"
      }`}
      onClick={handleRouterClick}
    >
      <div className="flex h-[77px] w-[100px] items-center justify-center rounded-lg bg-accent lg:h-[130px] lg:w-[150px]">
        {isLoading ? (
          <Loader2Icon className="animate-spin" />
        ) : (
          <Image
            src={orderProduct.product.imageURLs[0]}
            width={0}
            height={0}
            sizes="100vw"
            className="h-auto max-h-[80%] w-auto max-w-[80%] object-contain"
            alt={orderProduct.product.name}
          />
        )}
      </div>

      <div className="flex w-full flex-col gap-1 lg:gap-2">
        <p className="text-xs lg:text-sm">{orderProduct.product.name}</p>
        <div className="flex w-full items-center justify-between gap-1 ">
          <div className="bottom-0 flex items-center justify-center gap-1 text-right lg:absolute lg:right-0 lg:top-0 lg:my-auto lg:flex-col lg:items-end">
            {orderProduct.discountPercentage > 0 && (
              <p className="text-xs line-through opacity-60 lg:text-sm">
                {toCurrency(Number(orderProduct.basePrice))}
              </p>
            )}
            <p className="text-base font-bold lg:text-xl">
              {toCurrency(productTotalPrice)}
            </p>
          </div>

          <p className="text-xs opacity-60 lg:hidden">
            Qntd: {orderProduct.quantity}
          </p>
          <p className="hidden text-sm opacity-60 lg:block">
            Quantidade: {orderProduct.quantity}
          </p>
        </div>
      </div>
    </div>
  );
};
export default OrderProductItem;
