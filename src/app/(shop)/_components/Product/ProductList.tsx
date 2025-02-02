"use client";

import { computeProductTotalPrice } from "@/helpers/product";
import ProductItem from "./ProductItem";
import { Product } from "@prisma/client";
import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { usePathname } from "next/navigation";

interface ProductListProps {
  products: Product[];
  widthContainer?: string;
}

const ProductList = ({ products, widthContainer }: ProductListProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const pathname = usePathname();

  const itemWidth = 260;

  const handleNext = () => {
    if (containerRef.current) {
      containerRef.current.scrollLeft += itemWidth;
      setScrollPosition(containerRef.current.scrollLeft);
    }
  };

  const handlePrev = () => {
    if (containerRef.current) {
      containerRef.current.scrollLeft -= itemWidth;
      setScrollPosition(containerRef.current.scrollLeft);
    }
  };

  return (
    <>
      <div className="flex overflow-x-auto overflow-hidden gap-5 sm:gap-6 md:gap-8 lg:gap-10 [&::-webkit-scrollbar]:hidden lg:hidden lg:flex-none">
        {products.map((product, index) => (
          <ProductItem
            key={product.id}
            product={{
              ...product,
              totalPrice: computeProductTotalPrice(product),
            }}
            dataAosDelay={index * 100}
          />
        ))}
      </div>

      <div className="hidden flex-none relative lg:flex w-full">
        {/* Botão de voltar - Apenas em telas lg */}
        <button
          onClick={handlePrev}
          className={`${
            pathname !== "/" && "lg:hidden lg:flex-none"
          } hidden lg:flex absolute right-16 -top-16 2xl:right-20 transform -translate-y-1/2 z-10 bg-backgroundItem hover:text-gray-400 duration-300 p-2 rounded-lg shadow-md`}
          data-aos="zoom-in"
        >
          <ChevronLeft size={24} />
        </button>

        {/* Container de produtos */}
        <div
          ref={containerRef}
          className={`flex overflow-hidden ${widthContainer}`}
        >
          {products.map((product, index) => (
            <div key={product.id} className="min-w-[220px] xl:min-w-[260px]">
              <ProductItem
                product={{
                  ...product,
                  totalPrice: computeProductTotalPrice(product),
                }}
                dataAosDelay={index * 100}
              />
            </div>
          ))}
        </div>

        {/* Botão de avançar - Apenas em telas XL */}
        <button
          onClick={handleNext}
          className={`${
            pathname !== "/" && "lg:hidden lg:flex-none"
          } hidden lg:flex absolute right-0 -top-16 2xl:right-5 transform -translate-y-1/2 z-10 bg-backgroundItem p-2 rounded-lg shadow-md hover:text-gray-400 duration-300`}
          data-aos="zoom-in"
          data-aos-delay="100"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </>
  );
};

export default ProductList;
