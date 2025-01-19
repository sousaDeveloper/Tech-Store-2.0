import { prisma } from "@/lib/prisma";
import ProductDetails from "../components/ProductDetails";
import { computeProductTotalPrice } from "@/helpers/product";

interface ProductPageProps {
  params: {
    slug: string;
  };
}

const ProductPage = async ({ params }: ProductPageProps) => {
  const { slug } = await params;

  const product = await prisma.product.findFirst({
    where: {
      slug: slug,
    },
  });

  if (!product) return <h1>Produto não encontrado</h1>;

  return (
    product && (
      <ProductDetails
        product={{
          ...product,
          totalPrice: computeProductTotalPrice(product),
        }}
      />
    )
  );
};

export default ProductPage;
