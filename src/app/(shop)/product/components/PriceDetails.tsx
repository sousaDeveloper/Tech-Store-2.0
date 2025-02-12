import { ProductWithTotalPrice } from "@/helpers/product";
import toCurrency from "@/helpers/toCurrency";
import { CartContext } from "@/providers/cart";
import { ShoppingCartIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { toast } from "sonner";

interface PriceDetailsProps {
  product: ProductWithTotalPrice;
  className: string;
  buttonClassName: string;
}

const PriceDetails = ({
  product,
  className,
  buttonClassName,
}: PriceDetailsProps) => {
  const router = useRouter();
  const { status } = useSession();
  const { addProductToCart } = useContext(CartContext);

  const isUnauthenticated = status === "unauthenticated";

  const handleAddProductToCart = () => {
    if (isUnauthenticated) {
      toast("Primeiro realize seu login.");
      router.push("/api/auth/signin");
      return;
    }

    toast("Produto adicionado ao carrinho.", {
      description: "Clique no ícone e veja os itens do seu carrinho.",
    });
    addProductToCart({ ...product, quantity: 1 });
  };

  return (
    <div
      className={`w-full ${className} flex justify-between items-center z-50`}
    >
      {product.discountPercentage > 0 ? (
        <div className="flex flex-col">
          <h3 className="text-sm opacity-60 sm:text-lg">
            De:{" "}
            <span className="line-through">
              {toCurrency(Number(product.basePrice))}
            </span>
          </h3>
          <div className="flex items-center gap-2">
            <h3 className="text-lg sm:text-2xl">
              Por:{" "}
              <span className="text-xl sm:text-2xl">
                {toCurrency(product.totalPrice)}
              </span>
            </h3>
          </div>
        </div>
      ) : (
        <h1 className="text-xl sm:text-2xl">
          {toCurrency(Number(product.basePrice))}
        </h1>
      )}
      <button
        className={`bg-gradient w-fit p-2 sm:text-xl rounded-lg flex items-center justify-center gap-1 hover:text-background duration-300 ${buttonClassName}`}
        onClick={handleAddProductToCart}
      >
        <ShoppingCartIcon size={18} className="md:flex-none md:hidden" />
        <ShoppingCartIcon size={23} className="flex-none hidden md:flex mb-1" />
        Adicionar ao carrinho
      </button>
    </div>
  );
};

export default PriceDetails;
