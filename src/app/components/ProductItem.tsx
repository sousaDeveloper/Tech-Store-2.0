import { Badge } from "@/components/ui/badge";
import toCurrency from "@/helpers/toCurrency";
import { Product } from "@prisma/client";
import { StarIcon } from "lucide-react";
import Image from "next/image";

interface ProductItemProps {
  product: Product;
}

const ProductItem = ({ product }: ProductItemProps) => {
  const basePrice = +product.basePrice;

  const formattedPrice = toCurrency({ price: basePrice });

  const discountedPrice =
    product.discountPercentage > 0
      ? basePrice - (basePrice * product.discountPercentage) / 100
      : basePrice;

  const formattedDiscountedPrice = toCurrency({ price: discountedPrice });

  return (
    <div className="flex flex-col w-[8.5rem] h-[15rem] relative">
      {product.discountPercentage > 0 && (
        <Badge className="absolute bg-gradient mt-2 ml-2">
          -{product.discountPercentage}%
        </Badge>
      )}
      <div className="bg-[#333739] h-36 grid place-content-center rounded-lg text-secondaryColor">
        <Image
          src={product.imageURLs[1]}
          alt={product.slug}
          width={0}
          height={0}
          sizes="100vh"
          loading="lazy"
          className="object-cover w-24 h-24"
        />
      </div>
      <h2 className="truncate">{product.name}</h2>
      {product.discountPercentage > 0 && (
        <h2 className="flex items-center gap-1 truncate">
          <span className="font-bold">{formattedDiscountedPrice}</span>{" "}
          <span className="line-through text-xs opacity-70">
            {formattedPrice}
          </span>{" "}
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
  );
};

export default ProductItem;
