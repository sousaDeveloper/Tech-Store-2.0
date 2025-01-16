import { Badge } from "@/components/ui/badge";
import { ProductWithTotalPrice } from "@/helpers/product";
import toCurrency from "@/helpers/toCurrency";
import { ArrowDownIcon, StarIcon } from "lucide-react";
import Image from "next/image";

interface ProductItemProps {
  product: ProductWithTotalPrice;
}

const ProductItem = ({ product }: ProductItemProps) => {
  return (
    <div className="flex flex-col w-[8.5rem] h-[15rem] relative text-secondaryColor">
      {product.discountPercentage > 0 && (
        <Badge className="absolute bg-gradient mt-2 ml-2 flex">
          <ArrowDownIcon size={14} />
          {product.discountPercentage}%
        </Badge>
      )}
      <div className="bg-[#333739] h-36 grid place-content-center rounded-lg">
        <Image
          src={product.imageURLs[0]}
          alt={product.slug}
          width={0}
          height={0}
          sizes="100vh"
          loading="lazy"
          className="object-contain w-24 h-24"
        />
      </div>
      <h2 className="truncate">{product.name}</h2>
      {product.discountPercentage > 0 ? (
        <h2 className="flex items-center gap-1 truncate">
          <span>{toCurrency({ price: Number(product.totalPrice) })}</span>{" "}
          <span className="line-through text-xs opacity-70">
            {toCurrency({ price: Number(product.basePrice) })}
          </span>{" "}
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
