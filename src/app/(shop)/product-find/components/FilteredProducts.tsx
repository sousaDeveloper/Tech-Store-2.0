"use client";

import { Category, Product } from "@prisma/client";
import { useEffect, useState } from "react";
import ProductItem from "../../_components/Product/ProductItem";
import { computeProductTotalPrice } from "@/helpers/product";
import { Loader2Icon } from "lucide-react";

interface FilteredProductsProps {
  query: string;
}

const FilteredProducts = ({ query }: FilteredProductsProps) => {
  const [results, setResults] = useState<{
    categories: Category[];
    products: Product[];
  }>({ categories: [], products: [] });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      if (query.trim()) {
        try {
          const response = await fetch(`/api/search?q=${query}`);
          const data = await response.json();

          setResults(data);
        } catch (error) {
          console.log(error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchData();
  }, [query]);

  return (
    <>
      <div className="flex gap-5 text-secondaryColor">
        <div className="flex flex-col">
          <h1
            className="text-2xl sm:text-3xl lg:text-4xl xl:text-[2.5rem] mb-1"
            data-aos-delay="200"
            data-aos="fade-right"
          >
            {results.products.length <= 0 && !isLoading
              ? `Nenhum resultado encontrado para: ${query}`
              : `Resultados para: ${query}`}
          </h1>
          <h3
            className={`text-gray-400 text-sm lg:text-base 2xl:text-lg mb-3 ${
              results.products.length <= 0 && !isLoading
                ? "flex-none hidden"
                : ""
            }`}
            data-aos-delay="300"
            data-aos="fade-right"
          >
            Produtos encontrados:{" "}
            <span className="font-bold">{results.products.length}</span>
          </h3>
        </div>
        {isLoading && <Loader2Icon className="animate-spin mt-2" size={30} />}
      </div>

      <div className="flex flex-wrap gap-y-2 lg:gap-y-5 gap-x-10">
        {results.products.map((product) => (
          <ProductItem
            key={product.id}
            product={{
              ...product,
              totalPrice: computeProductTotalPrice(product),
            }}
            dataAosDelay={0}
          />
        ))}
      </div>
    </>
  );
};

export default FilteredProducts;
