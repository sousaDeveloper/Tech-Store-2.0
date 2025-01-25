"use client";

import { Badge } from "@/components/ui/badge";
import { ProductWithTotalPrice } from "@/helpers/product";
import toCurrency from "@/helpers/toCurrency";
import { ArrowDownIcon, Loader2Icon, StarIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface ProductItemProps {
  product: ProductWithTotalPrice;
}

const ProductItem = ({ product }: ProductItemProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleRouterClick = () => {
    setIsLoading(true);
    router.push(`/product/${product.slug}`);
  };

  return (
    <div
      className="flex flex-col min-w-[8.5rem] max-w-[8.5rem] h-[15rem] relative text-secondaryColor cursor-pointer"
      onClick={handleRouterClick}
    >
      {product.discountPercentage > 0 && (
        <Badge className="absolute bg-gradient mt-2 ml-2 flex z-10">
          <ArrowDownIcon size={14} />
          {product.discountPercentage}%
        </Badge>
      )}
      <div className="bg-backgroundItem h-36 grid place-content-center rounded-lg relative">
        <Image
          src={product.imageURLs[0]}
          alt={product.slug}
          width={0}
          height={0}
          sizes="100vh"
          loading="lazy"
          className={`object-contain w-24 h-24 ${isLoading && "opacity-20"}`}
        />
        {isLoading && (
          <Loader2Icon
            className="animate-spin absolute top-[3.2rem] left-[3.2rem]"
            size={34}
          />
        )}
      </div>
      <h2 className="truncate">{product.name}</h2>
      {product.discountPercentage > 0 ? (
        <h2 className="flex items-center gap-1 truncate">
          <span>{toCurrency({ price: Number(product.totalPrice) })}</span>{" "}
          <span className="line-through text-xs opacity-70">
            {toCurrency({ price: Number(product.basePrice) })}
          </span>
        </h2>
      ) : (
        <h2>{toCurrency({ price: Number(product.basePrice) })}</h2>
      )}
      <div className="flex gap-[0.1rem] items-center mt-2">
        <StarIcon className="text-primaryColor" size={17} />
        <StarIcon className="text-primaryColor" size={17} />
        <StarIcon className="text-primaryColor" size={17} />
        <StarIcon className="text-primaryColor" size={17} />
        <StarIcon size={17} className="text-secondaryColor" />
        <span className="text-sm">(50)</span>
      </div>
    </div>
  );
};

export default ProductItem;
