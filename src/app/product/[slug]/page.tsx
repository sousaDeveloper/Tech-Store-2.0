import { prisma } from "@/lib/prisma";
import ProductDetails from "../components/ProductDetails";
import { computeProductTotalPrice } from "@/helpers/product";
import ProductList from "@/app/components/Product/ProductList";

interface ProductPageProps {
  params: {
    slug: string;
  };
}

const ProductPage = async ({ params }: ProductPageProps) => {
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
        <div className="flex flex-col pb-20 text-secondaryColor px-5">
          <h2 className="text-lg mb-2">Produtos Relacionados</h2>
          <ProductList products={products} />
        </div>
      </>
    )
  );
};

export default ProductPage;
