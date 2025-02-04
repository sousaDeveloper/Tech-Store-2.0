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
import PriceDetails from "./PriceDetails";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface ProductInfoProps {
  product: ProductWithTotalPrice;
  setQuantity: (value: number) => void;
}

const ProductInfo = ({ product, setQuantity }: ProductInfoProps) => {
  const [isShow, setIsShow] = useState(false);

  const handleChangeIsShow = () => {
    setIsShow((currentState) => !currentState);
  };

  return (
    <main className="px-5 pt-2 mt-2 min-h-max sm:mt-20 lg:mt-4 lg:w-[85%] 3xl:w-[70%] lg:ml-14 2xl:ml-20">
      <div className="flex items-center justify-between" data-aos="fade-up">
        <span className="text-sm opacity-60 sm:text-base">
          Novo | +100 vendidos
        </span>
        <span className="text-primaryColor text-[0.8rem] sm:text-sm">
          Disponível em Estoque
        </span>
      </div>
      <h1
        className="text-2xl mt-2 sm:text-3xl lg:text-4xl"
        data-aos="fade-up"
        data-aos-delay="200"
      >
        {product.name}
      </h1>

      <div className="mt-2 sm:mt-4">
        <h3 className="text-md" data-aos="fade-up" data-aos-delay="300">
          Descrição do produto
        </h3>
        <p
          className={`text-sm opacity-70 ${
            isShow ? "h-36 overflow-y-auto" : "h-16 overflow-hidden"
          }`}
        >
          {product.description}
        </p>
        <span
          className="flex justify-end text-sm underline cursor-pointer lg:flex-none lg:hidden"
          onClick={handleChangeIsShow}
        >
          {isShow ? "Ver menos" : "Ver mais"}
        </span>
        <Dialog>
          <DialogTrigger className="flex justify-end">
            <span className="underline cursor-pointer">Ver mais</span>
          </DialogTrigger>
          <DialogContent className="2xl:w-[40%]">
            <DialogHeader>
              <DialogTitle
                className="sm:text-xl mt-2 sm:w-[90%]"
                data-aos="fade-up"
              >
                Descrição do produto
              </DialogTitle>
              <DialogDescription
                className="text-md text-gray-400"
                data-aos="fade-up"
                data-aos-delay="100"
              >
                {product.description}
              </DialogDescription>
            </DialogHeader>
            <div className="flex justify-end w-full">
              <DialogClose className="transition-all w-fit px-7 py-1 text-lg text-black bg-gray-400 hover:text-gray-200 hover:bg-gray-600 rounded-lg">
                Voltar
              </DialogClose>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <hr className="text-secondaryColor mt-4 mb-3 opacity-60" />
      <div className="flex flex-col gap-1">
        <h3
          className="text-md sm:text-lg"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          Quantidade
        </h3>
        <Select
          aria-label="Selecione quantidade"
          onValueChange={(value) => setQuantity(Number(value))}
        >
          <SelectTrigger
            className="w-fit h-fit opacity-70"
            aria-label="Selecionar quantidade"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            <SelectValue
              placeholder="1"
              className="opacity-70 text-sm sm:text-lg"
            />
          </SelectTrigger>
          <SelectContent className="bg-backgroundItem">
            {[1, 2, 3, 4, 5].map((num) => (
              <SelectItem key={num} value={num.toString()}>
                {num}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <hr className="text-secondaryColor my-4 opacity-60" />
      <PriceDetails
        product={product}
        className="flex-none hidden lg:flex gap-1"
        buttonClassName="py-2 px-5"
      />
    </main>
  );
};

export default ProductInfo;
