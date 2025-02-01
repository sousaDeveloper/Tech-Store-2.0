"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CATEGORY_ICON } from "@/constants/category-icon";
import ProductList from "./Product/ProductList";
import { Category, Product } from "@prisma/client";
import { useState } from "react";
import SubText from "./SubText";

interface CatalogProps {
  products: Product[];
  categories: Category[];
}

const Catalog = ({ products, categories }: CatalogProps) => {
  const [categorySelected, setCategorySelected] = useState<
    Category | undefined
  >(undefined);

  const filteredProducts = categorySelected
    ? products.filter((product) => product.categoryID === categorySelected.id)
    : products;

  const categoriesMap = categories.reduce((acc, category) => {
    acc[category.name] = category;
    return acc;
  }, {} as Record<string, Category>);

  const handleCategorySelected = (categoryName: string) => {
    const category = categoriesMap[categoryName];
    setCategorySelected(category);
  };

  const handleButtonClick = (categoryName: string) => {
    handleCategorySelected(categoryName);
  };

  const shuffledProducts = filteredProducts.sort(() => Math.random() - 0.5);

  return (
    <section className="my-5 px-5 sm:px-8 xl:px-16 sm:my-12 md:my-20 lg:my-24 xl:my-32 text-secondaryColor">
      <h1
        className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl xl:text-[2.5rem] sm:w-[70%] md:w-[60%] lg:w-[50%]"
        data-aos="fade-right"
        data-aos-delay="200"
      >
        Encontre exatamente o que{" "}
        <span className="text-gradient">você precisa</span>!
      </h1>
      <SubText
        text="Explore os melhores periféricos do mercado."
        className="text-[0.9rem] md:text-[1rem] lg:text-lg xl:text-[1.2rem] lg:mb-4"
      />
      <Select
        onValueChange={(value) => handleCategorySelected(value)}
        aria-label="Selecione uma categoria"
      >
        <SelectTrigger
          className="w-full mt-2 mb-3 opacity-70 lg:flex-none lg:hidden"
          aria-label="Selecionar categoria"
          data-aos="fade-zoom"
          data-aos-delay="300"
        >
          <SelectValue
            placeholder="Selecionar categoria"
            className="opacity-70 text-sm"
          />
        </SelectTrigger>
        <SelectContent className="bg-backgroundItem">
          {categories.map((category) => (
            <SelectItem
              value={category.name}
              key={category.id}
              className="py-2"
              onClick={() => handleButtonClick(category.name)}
            >
              <div className="flex gap-2 justify-center items-center">
                {CATEGORY_ICON[category.slug as keyof typeof CATEGORY_ICON]}
                <span className="text-secondaryColor">{category.name}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <div className="flex lg:grid lg:grid-cols-[20%_80%]">
        <div className="hidden lg:flex lg:flex-col gap-2">
          {categories.map((category, index) => (
            <button
              key={category.id}
              className={`w-[10rem] px-5 py-2 rounded-lg shadow-xl  ${
                categorySelected?.id === category.id
                  ? "bg-primaryColor"
                  : "bg-backgroundItem"
              }`}
              data-aos="fade-right"
              data-aos-delay={index * 100}
              onClick={() => handleButtonClick(category.name)}
            >
              <div className="flex gap-2 justify-center items-center">
                {CATEGORY_ICON[category.slug as keyof typeof CATEGORY_ICON]}
                <span className="text-secondaryColor hover:text-gray-400 hover:translate-x-1 duration-300">
                  {category.name}
                </span>
              </div>
            </button>
          ))}
        </div>
        <ProductList
          products={shuffledProducts}
          widthContainer="mt-5 xl:mt-2"
        />
      </div>
    </section>
  );
};

export default Catalog;
