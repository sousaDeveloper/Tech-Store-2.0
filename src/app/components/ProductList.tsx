import { prisma } from "@/lib/prisma";
import ProductItem from "./ProductItem";

const ProductList = async () => {
  const products = await prisma.product.findMany({});

  return (
    <div className="flex overflow-x-auto overflow-hidden gap-5 [&::-webkit-scrollbar]:hidden">
      {products
        .filter((product) => product.discountPercentage > 0)
        .map((product) => (
          <div key={product.id}>
            <ProductItem product={product} />
          </div>
        ))}
    </div>
  );
};

export default ProductList;
