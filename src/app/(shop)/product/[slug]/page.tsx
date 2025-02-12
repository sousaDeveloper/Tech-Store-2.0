import { prisma } from "@/lib/prisma";
import ProductDetails from "../components/ProductDetails";
import { computeProductTotalPrice } from "@/helpers/product";
import ProductList from "@/app/(shop)/_components/Product/ProductList";
import { redirect } from "next/navigation";

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

const ProductPage = async (props: ProductPageProps) => {
  const params = await props.params;
  const { slug } = params;

  const product = await prisma.product.findFirst({
    where: { slug: slug },
  });

  if (!product) {
    return redirect("/");
  }

  const products = await prisma.product.findMany({
    where: { categoryID: product.categoryID, NOT: { slug: slug } },
  });

  return (
    product && (
      <>
        <ProductDetails
          product={{
            ...product,
            totalPrice: computeProductTotalPrice(product),
          }}
        />
        <div className="flex flex-col pb-20 sm:pb-28 text-secondaryColor px-5 lg:px-8 lg:mt-[10rem] lg:pb-10 xl:px-16 xl:mt-24 xl:pb-0 2xl:px-32 3xl:px-48">
          <hr className="hidden flex-none text-secondaryColor lg:flex" />

          <h2 className="text-lg sm:text-xl mb-2 xl:text-2xl lg:mt-2">
            Produtos Relacionados
          </h2>
          <ProductList products={products} />
        </div>
      </>
    )
  );
};

export default ProductPage;
