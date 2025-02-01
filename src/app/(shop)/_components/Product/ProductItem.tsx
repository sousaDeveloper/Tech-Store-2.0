"use client";

import { Badge } from "@/components/ui/badge";
import { ProductWithTotalPrice } from "@/helpers/product";
import toCurrency from "@/helpers/toCurrency";
import { ArrowDownIcon, LoaderIcon, StarIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import FavoriteButton from "./FavoriteButton";

interface ProductItemProps {
  product: ProductWithTotalPrice;
  dataAosDelay: number;
  className?: string;
}

const ProductItem = ({
  product,
  dataAosDelay,
  className,
}: ProductItemProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleRouterClick = () => {
    setIsLoading(true);
    router.push(`/product/${product.slug}`);
  };

  return (
    <div
      className={`flex flex-col min-w-[8.5rem] max-w-[8.5rem] sm:min-w-[10rem] sm:max-w-[10rem] lg:min-w-[11rem] lg:max-w-[11rem] xl:min-w-[13rem] xl:max-w-[13rem] h-[15rem] xl:h-[17rem] ${className} relative text-secondaryColor`}
      data-aos="fade-up"
      data-aos-delay={dataAosDelay}
    >
      <div className="flex justify-end items-center absolute w-full">
        {product.discountPercentage > 0 && (
          <Badge className="bg-gradient ml-2 mr-auto flex z-10">
            <ArrowDownIcon size={14} />
            {product.discountPercentage}%
          </Badge>
        )}
        <FavoriteButton product={product} />
      </div>

      <div className="bg-backgroundItem h-36 sm:h-40 xl:h-[17rem] grid place-content-center rounded-lg relative shadow-xl">
        <Image
          src={product.imageURLs[0]}
          alt={product.slug}
          width={0}
          height={0}
          sizes="100vh"
          loading="lazy"
          className={`object-contain w-24 h-24 sm:w-28 sm:h-28 xl:w-32 xl:h-32 ${
            isLoading && "opacity-20"
          }`}
        />
        {isLoading && (
          <LoaderIcon
            className="animate-spin absolute top-[3.2rem] left-[3.2rem] sm:top-[4rem] sm:left-[4rem] lg:left-[4.5rem] xl:top-[5rem] xl:left-[5.5rem]"
            size={34}
          />
        )}
      </div>
      <div
        onClick={handleRouterClick}
        className={`${
          isLoading ? "pointer-events-none" : ""
        }cursor-pointer duration-300 hover:text-gray-400`}
      >
        <h2 className="truncate sm:text-lg lg:text-xl">{product.name}</h2>
        {product.discountPercentage > 0 ? (
          <h2 className="flex items-center gap-1 truncate sm:text-lg lg:text-xl">
            <span>{toCurrency({ price: Number(product.totalPrice) })}</span>{" "}
            <span className="line-through text-xs opacity-70">
              {toCurrency({ price: Number(product.basePrice) })}
            </span>
          </h2>
        ) : (
          <h2 className="lg:text-xl">
            {toCurrency({ price: Number(product.basePrice) })}
          </h2>
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
    </div>
  );
};

export default ProductItem;
