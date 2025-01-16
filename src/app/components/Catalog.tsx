"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CATEGORY_ICON } from "@/constants/category-icon";
import ProductList from "./ProductList";
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
    if (category) {
      setCategorySelected(category);
    }
  };

  return (
    <section className="my-5 px-5 text-secondaryColor" id="catalog">
      <h1 className="text-2xl">
        Encontre exatamente o que{" "}
        <span className="text-gradient">você precisa</span>!
      </h1>
      <SubText
        text="Explore os melhores periféricos do mercado."
        className="text-[0.9rem]"
      />
      <Select
        onValueChange={(value) => handleCategorySelected(value)}
        aria-label="Selecione uma categoria"
      >
        <SelectTrigger
          className="w-full mt-2 mb-3 opacity-70"
          aria-label="Selecionar categoria"
        >
          <SelectValue
            placeholder="Selecionar categoria"
            className="opacity-70 text-sm"
          />
        </SelectTrigger>
        <SelectContent className="bg-[#333739]">
          {categories.map((category) => (
            <SelectItem value={category.name} key={category.id}>
              <div className="flex gap-2 py-2 items-center">
                {CATEGORY_ICON[category.slug as keyof typeof CATEGORY_ICON]}
                <span className="text-secondaryColor">{category.name}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <ProductList products={filteredProducts} />
    </section>
  );
};

export default Catalog;
