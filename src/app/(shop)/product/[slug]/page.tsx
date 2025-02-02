import { prisma } from "@/lib/prisma";
import ProductDetails from "../components/ProductDetails";
import { computeProductTotalPrice } from "@/helpers/product";
import ProductList from "@/app/(shop)/_components/Product/ProductList";
import Separator from "../../_components/Separator";

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

const ProductPage = async (props: ProductPageProps) => {
  const params = await props.params;
  const { slug } = params;

  const product = await prisma.product.findFirst({
    where: {
      slug: slug,
    },
  });

  if (!product) {
    return <h1>Produto não encontrado</h1>;
  }

  const products = await prisma.product.findMany({
    where: {
      category: {
        id: product.categoryID,
      },
      NOT: {
        slug: slug,
      },
    },
  });

  if (!product) return <h1>Produto não encontrado</h1>;

  return (
    product && (
      <>
        <ProductDetails
          product={{
            ...product,
            totalPrice: computeProductTotalPrice(product),
          }}
        />
        <div className="flex flex-col pb-20 sm:pb-28 text-secondaryColor px-5 lg:px-8 lg:mt-44 lg:pb-10 xl:mt-16 2xl:px-24 xl:pb-0">
          <div className="hidden flex-none lg:flex lg:mb-2">
            <Separator />
          </div>
          <h2 className="text-lg sm:text-xl mb-2 xl:text-2xl">
            Produtos Relacionados
          </h2>
          <ProductList products={products} />
        </div>
      </>
    )
  );
};

export default ProductPage;
