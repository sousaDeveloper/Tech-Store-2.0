import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ProductWithTotalPrice } from "@/helpers/product";
import toCurrency from "@/helpers/toCurrency";
import { ArrowDownIcon } from "lucide-react";

interface ProductInfoProps {
  product: Pick<
    ProductWithTotalPrice,
    "name" | "basePrice" | "description" | "totalPrice" | "discountPercentage"
  >;
}

const ProductInfo = ({ product }: ProductInfoProps) => {
  return (
    <main className="bg-[#131313] px-5 pt-2 rounded-tl-3xl rounded-tr-3xl mt-2">
      <div className="flex items-center justify-between">
        <span className="text-sm opacity-60">Novo | 100 vendidos</span>
        <span className="text-primaryColor text-[0.8rem]">
          Disponível em Estoque
        </span>
      </div>
      <h1 className="text-2xl">{product.name}</h1>
      {product.discountPercentage > 0 ? (
        <div className="flex flex-col mt-1">
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
            <Badge className="bg-gradient flex">
              <ArrowDownIcon size={14} />
              {product.discountPercentage}
              {"%"}
            </Badge>
          </div>
        </div>
      ) : (
        <h1 className="text-lg">{toCurrency({ price: +product.basePrice })}</h1>
      )}
      <div className="flex items-center gap-1 mt-2">
        <h3 className="text-md">Quantidade:</h3>
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
      <button className="bg-gradient w-full py-2 rounded-lg mt-5 mb-8">
        Adicionar ao carrinho
      </button>
      <h3 className="text-md">Descrição</h3>
      <p className="text-sm opacity-70">{product.description}</p>
    </main>
  );
};

export default ProductInfo;
