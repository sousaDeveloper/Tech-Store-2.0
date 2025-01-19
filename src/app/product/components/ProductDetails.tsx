"use client";

import { ChevronLeft, Loader2Icon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ProductInfo from "./ProductInfo";
import { ProductWithTotalPrice } from "@/helpers/product";

interface ProductDetailsProps {
  product: ProductWithTotalPrice;
}

const ProductDetails = ({ product }: ProductDetailsProps) => {
  const [imageUrl, setImageUrl] = useState(product.imageURLs[1] || "");
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const handleRouterBackClick = () => {
    setLoading(true);
    router.back();
  };

  const handleImageLoad = () => {
    setLoading(false);
  };

  const handleImageClick = (url: string) => {
    setLoading(true);
    setImageUrl(url);
  };

  return (
    <section className="text-secondaryColor">
      <div className="bg-backgroundItem relative px-5 pt-3 w-full grid place-content-center h-[20rem]">
        <ChevronLeft
          size={36}
          onClick={handleRouterBackClick}
          className={`cursor-pointer absolute top-3 left-5 bg-background rounded-xl ${
            loading && "flex-none hidden"
          }`}
        />
        {loading && (
          <div className="flex justify-between">
            <ChevronLeft
              size={36}
              onClick={handleRouterBackClick}
              className="cursor-pointer bg-background top-3 left-5 rounded-xl absolute"
            />
            <Loader2Icon
              className="animate-spin top-3 right-5 absolute"
              size={36}
            />
          </div>
        )}

        <Image
          src={imageUrl}
          alt={product.slug}
          width={0}
          height={0}
          sizes="100vw"
          loading="lazy"
          className="w-[15rem] h-[15rem] object-contain"
          onLoad={handleImageLoad}
        />

        <ChevronLeft
          size={36}
          onClick={handleRouterBackClick}
          className={`cursor-pointer absolute top-3 left-5 bg-background rounded-lg ${
            loading && "hidden"
          }`}
        />
      </div>

      <div className="flex justify-center gap-4 mt-2">
        {product.imageURLs.map((url, index) => (
          <div
            key={index}
            className="cursor-pointer bg-backgroundItem rounded-xl"
            onClick={() => handleImageClick(url)}
          >
            <Image
              src={url}
              alt={`${product.slug}`}
              width={70}
              height={70}
              loading="lazy"
              className="w-[5rem] h-[5rem] object-contain"
            />
          </div>
        ))}
      </div>

      <ProductInfo product={product} />
    </section>
  );
};

export default ProductDetails;
