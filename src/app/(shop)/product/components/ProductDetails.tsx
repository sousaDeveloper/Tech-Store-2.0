"use client";

import { ChevronLeft, Loader2Icon, ShoppingCartIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import ProductInfo from "./ProductInfo";
import { ProductWithTotalPrice } from "@/helpers/product";
import toCurrency from "@/helpers/toCurrency";
import { CartContext } from "@/providers/cart";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

interface ProductDetailsProps {
  product: ProductWithTotalPrice;
}

const ProductDetails = ({ product }: ProductDetailsProps) => {
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [imageUrl, setImageUrl] = useState(product.imageURLs[0] || "");
  const { status } = useSession();
  const { addProductToCart } = useContext(CartContext);
  const router = useRouter();

  const handleRouterBackClick = () => {
    setLoading(true);
    router.back();
  };

  const handleImageLoad = () => {
    setLoading(false);
  };

  const handleImageClick = (url: string) => {
    // Só altera a imagem se a URL for diferente da imagem atual
    if (url !== imageUrl) {
      setLoading(true);
      setImageUrl(url);
    }
  };

  const handleAddProductToCart = () => {
    if (status === "unauthenticated") {
      toast("Primeiro realize seu login.");
      router.push("/api/auth/signin");
    } else {
      toast("Produto adicionado ao carrinho.", {
        description: "Clique no ícone e veja os itens do seu carrinho.",
      });
      addProductToCart({ ...product, quantity });
    }
  };

  return (
    <section className="text-secondaryColor">
      <div className="bg-backgroundItem relative sm:absolute px-5 pt-3 w-full grid place-content-center h-[20rem] sm:h-[26rem]">
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
              className="animate-spin top-3 right-5 sm:left-5 sm:top-[22rem] absolute"
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
      <div className="hidden flex-none relative sm:ml-auto sm:flex-col sm:flex sm:w-[80px] gap-4 mx-6 top-6">
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

      <div className="flex justify-center gap-4 mt-2 sm:flex-none sm:hidden">
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
              className="w-[5rem] h-[5rem] object-contain"
            />
          </div>
        ))}
      </div>

      <ProductInfo product={product} setQuantity={setQuantity} />
      <div className="w-full fixed bottom-0 rounded-tl-3xl rounded-tr-3xl bg-[#131313] p-4 px-5 sm:px-10 flex gap-2 justify-between items-center z-50">
        {product.discountPercentage > 0 ? (
          <div className="flex flex-col">
            <h3 className="text-sm opacity-60 sm:text-lg">
              De:{" "}
              <span className="line-through">
                {toCurrency({ price: +product.basePrice })}
              </span>
            </h3>
            <div className="flex items-center gap-2">
              <h3 className="text-lg sm:text-2xl">
                Por:{" "}
                <span className="text-xl sm:text-2xl">
                  {toCurrency({ price: product.totalPrice })}
                </span>
              </h3>
            </div>
          </div>
        ) : (
          <h1 className="text-xl sm:text-2xl">
            {toCurrency({ price: +product.basePrice })}
          </h1>
        )}
        <button
          className="bg-gradient w-fit p-2 sm:p-4 sm:px-10 sm:text-xl rounded-lg flex items-center justify-center gap-1"
          onClick={handleAddProductToCart}
        >
          <ShoppingCartIcon size={18} />
          Adicionar ao carrinho
        </button>
      </div>
    </section>
  );
};

export default ProductDetails;
