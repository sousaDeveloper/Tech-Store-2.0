"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ProductWithTotalPrice } from "@/helpers/product";
import { useState } from "react";

interface ProductInfoProps {
  product: Pick<
    ProductWithTotalPrice,
    "name" | "basePrice" | "description" | "totalPrice" | "discountPercentage"
  >;
}

const ProductInfo = ({ product }: ProductInfoProps) => {
  const [isShow, setIsShow] = useState(false);

  return (
    <main className="px-5 pt-2 mt-2 min-h-max">
      <div className="flex items-center justify-between">
        <span className="text-sm opacity-60">Novo | +100 vendidos</span>
        <span className="text-primaryColor text-[0.8rem]">
          Disponível em Estoque
        </span>
      </div>
      <h1 className="text-2xl mt-2">{product.name}</h1>

      <div className="mt-2">
        <h3 className="text-md">Descrição do produto</h3>
        <p
          className={`text-sm opacity-70  ${
            isShow ? "h-36 overflow-y-auto" : "h-16 overflow-hidden"
          }`}
        >
          {product.description}
        </p>
        <span
          className="flex justify-end text-sm underline cursor-pointer"
          onClick={() => setIsShow((currentState) => !currentState)}
        >
          {isShow ? "Ver menos" : "Ver mais"}
        </span>
      </div>
      <hr className="text-secondaryColor mt-4 mb-3 opacity-60" />
      <div className="flex flex-col gap-1">
        <h3 className="text-md">Quantidade</h3>
        <Select aria-label="Selecione quantidade">
          <SelectTrigger
            className="w-fit h-fit opacity-70"
            aria-label="Selecionar quantidade"
          >
            <SelectValue
              placeholder="Selecionar quantidade"
              className="opacity-70 text-sm"
            />
          </SelectTrigger>
          <SelectContent className="bg-backgroundItem">
            <SelectItem value="one">1</SelectItem>
            <SelectItem value="two">2</SelectItem>
            <SelectItem value="three">3</SelectItem>
            <SelectItem value="four">4</SelectItem>
            <SelectItem value="five">5</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <hr className="text-secondaryColor my-4 opacity-60" />
    </main>
  );
};

export default ProductInfo;
