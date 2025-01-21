"use client";

import { ChevronLeft, Loader2Icon, ShoppingCartIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import ProductInfo from "./ProductInfo";
import { ProductWithTotalPrice } from "@/helpers/product";
import toCurrency from "@/helpers/toCurrency";
import { CartContext } from "@/providers/cart";
import { useToast } from "@/hooks/use-toast";
import { useSession } from "next-auth/react";
import UserSheet from "@/app/components/user/UserSheet";

interface ProductDetailsProps {
  product: ProductWithTotalPrice;
}

const ProductDetails = ({ product }: ProductDetailsProps) => {
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [imageUrl, setImageUrl] = useState(product.imageURLs[1] || "");
  const [showUserSheet, setShowUserSheet] = useState(false);
  const { status } = useSession();
  const { addProductToCart } = useContext(CartContext);
  const router = useRouter();
  const { toast } = useToast();

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

  const handleAddProductToCart = () => {
    if (status === "authenticated") {
      toast({
        title: "Primeiro realize seu login.",
        description: "Clique no ícone acima e faça seu login.",
      });
      setShowUserSheet(true);
    } else {
      setShowUserSheet(false);
      toast({
        title: "Produto adicionado ao carrinho.",
        description: "Clique no ícone e veja os itens do seu carrinho.",
      });
      addProductToCart({ ...product, quantity });
    }
  };

  return (
    <section className="text-secondaryColor">
      <div className="bg-backgroundItem relative px-5 pt-3 w-full grid place-content-center h-[20rem]">
        {loading ? (
          <div className="flex justify-between items-center">
            <ChevronLeft
              size={36}
              onClick={handleRouterBackClick}
              className="cursor-pointer bg-background top-3 left-5 rounded-xl absolute"
            />
            <h1 className="top-5 right-28 text-center absolute">
              Detalhes do Produto
            </h1>
            <Loader2Icon
              className="animate-spin top-3 right-5 absolute"
              size={36}
            />
          </div>
        ) : (
          <div className="flex items-center">
            <ChevronLeft
              size={36}
              onClick={handleRouterBackClick}
              className={`cursor-pointer absolute top-3 left-5 bg-background rounded-xl ${
                loading && "flex-none hidden"
              }`}
            />
            <h1 className="top-5 right-28 text-center absolute">
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

      <ProductInfo product={product} setQuantity={setQuantity} />
      <div className="w-full fixed bottom-0 rounded-tl-3xl rounded-tr-3xl bg-[#131313] p-4 px-5 flex gap-2 justify-between items-center z-50">
        {product.discountPercentage > 0 ? (
          <div className="flex flex-col">
            <h3 className="text-sm opacity-60">
              De:{" "}
              <span className="line-through">
                {toCurrency({ price: +product.basePrice })}
              </span>
            </h3>
            <div className="flex items-center gap-2">
              <h3 className="text-lg">
                Por:{" "}
                <span className="text-xl">
                  {toCurrency({ price: product.totalPrice })}
                </span>
              </h3>
            </div>
          </div>
        ) : (
          <h1 className="text-xl">
            {toCurrency({ price: +product.basePrice })}
          </h1>
        )}
        <button
          className="bg-gradient w-fit p-2 rounded-lg flex items-center justify-center gap-1"
          onClick={handleAddProductToCart}
        >
          <ShoppingCartIcon size={18} />
          Adicionar ao carrinho
        </button>
      </div>
      {showUserSheet && (
        <div className="fixed bottom-24 left-5 z-50 bg-gradient p-1 rounded-full animate-bounce">
          <UserSheet className="bg-transparent" />
        </div>
      )}
    </section>
  );
};

export default ProductDetails;
