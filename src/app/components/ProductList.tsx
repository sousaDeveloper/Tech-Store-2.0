import { computeProductTotalPrice } from "@/helpers/product";
import ProductItem from "./ProductItem";
import { Product } from "@prisma/client";

interface ProductListProps {
  products: Product[];
}

const ProductList = ({ products }: ProductListProps) => {
  return (
    <div className="flex overflow-x-auto overflow-hidden gap-5 [&::-webkit-scrollbar]:hidden">
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
  );
};

export default ProductList;
