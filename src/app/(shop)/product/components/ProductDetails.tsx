"use client";

import { ChevronLeft, Loader2Icon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ProductInfo from "./ProductInfo";
import { ProductWithTotalPrice } from "@/helpers/product";
import PriceDetails from "./PriceDetails";

interface ProductDetailsProps {
  product: ProductWithTotalPrice;
}

const ProductDetails = ({ product }: ProductDetailsProps) => {
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [imageUrl, setImageUrl] = useState(product.imageURLs[0] || "");
  const router = useRouter();

  const handleRouterBackClick = () => {
    setLoading(true);
    router.back();
  };

  const handleImageLoad = () => {
    setLoading(false);
  };

  const handleImageClick = (url: string) => {
    if (url !== imageUrl) {
      setLoading(true);
      setImageUrl(url);
    }
  };

  return (
    <section className="text-secondaryColor">
      <div className="flex flex-col lg:grid lg:grid-cols-2 lg:gap-5">
        <div className="bg-backgroundItem relative sm:absolute px-5 pt-3 w-full grid place-content-center h-[20rem] sm:h-[28rem] lg:w-[33rem] lg:rounded-br-xl">
          {loading ? (
            <div className="flex justify-between items-center">
              <ChevronLeft
                size={36}
                onClick={handleRouterBackClick}
                className="cursor-pointer bg-background sm:top-6 sm:left-6 top-3 left-5 rounded-xl absolute"
              />
              <h1 className="left-1/2 transform -translate-x-1/2 top-4 sm:top-7 absolute text-center sm:text-xl">
                Detalhes do Produto
              </h1>
              <Loader2Icon
                className="animate-spin top-3 right-5 sm:left-5 sm:top-[22rem] lg:top-[24rem] absolute"
                size={36}
              />
            </div>
          ) : (
            <div className="flex items-center">
              <ChevronLeft
                size={36}
                onClick={handleRouterBackClick}
                className={`cursor-pointer absolute top-3 sm:top-6 sm:left-6 left-5 bg-background rounded-xl ${
                  loading && "flex-none hidden"
                }`}
              />
              <h1 className="left-1/2 transform -translate-x-1/2 sm:top-7 top-4 absolute text-center sm:text-xl">
                Detalhes do Produto
              </h1>
            </div>
          )}

          <Image
            src={imageUrl}
            alt={product.slug}
            width={0}
            height={0}
            sizes="100vw"
            loading="lazy"
            className="w-[15rem] h-[15rem] sm:w-[20rem] sm:h-[20rem] object-contain"
            onLoad={handleImageLoad}
          />

          <ChevronLeft
            size={36}
            onClick={handleRouterBackClick}
            className={`cursor-pointer absolute top-3 left-5 sm:top-6 sm:left-6 bg-background rounded-lg ${
              loading && "hidden"
            }`}
          />
        </div>
        <div className="hidden flex-none relative sm:ml-auto sm:flex-col sm:flex sm:w-[80px] lg:hidden lg:flex-none gap-4 mx-6 top-6">
          {product.imageURLs.map((url, index) => (
            <div
              key={index}
              className="cursor-pointer bg-background rounded-xl sm:w-fit"
              onClick={() => handleImageClick(url)}
              data-aos="zoom-in"
              data-aos-delay={index * 100}
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

        <div className="flex justify-center gap-4 mt-2 sm:flex-none sm:hidden lg:h-[6rem] lg:flex lg:mt-0 lg:top-[29rem] lg:left-8 lg:relative lg:justify-start">
          {product.imageURLs.map((url, index) => (
            <div
              key={index}
              className="cursor-pointer bg-backgroundItem rounded-xl"
              onClick={() => handleImageClick(url)}
              data-aos="zoom-in"
              data-aos-delay={index * 100}
            >
              <Image
                src={url}
                alt={`${product.slug}`}
                width={70}
                height={70}
                loading="lazy"
                className="w-[5rem] h-[5rem] lg:w-[6rem] lg:h-[6rem] object-contain"
              />
            </div>
          ))}
        </div>

        <ProductInfo product={product} setQuantity={setQuantity} />
      </div>

      <PriceDetails
        product={product}
        className="fixed bottom-0 rounded-tl-3xl rounded-tr-3xl lg:flex-none lg:hidden bg-[#131313] p-4 px-5 sm:px-10 gap-2"
        buttonClassName="sm:p-4 sm:px-10"
      />
    </section>
  );
};

export default ProductDetails;
