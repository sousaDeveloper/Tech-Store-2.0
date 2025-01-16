import ProductList from "./ProductList";
import { prisma } from "@/lib/prisma";
import SubText from "./SubText";

const Offers = async () => {
  const productWithDiscount = await prisma.product.findMany({
    where: {
      discountPercentage: {
        gt: 0,
      },
    },
  });

  return (
    <section className="my-5 px-5 text-secondaryColor">
      <div className="mb-5">
        <h1 className="text-2xl">
          Ofertas <span className="text-gradient">Imperdíveis</span>!
        </h1>
        <SubText
          text="Seu bolso feliz faz parte do nosso propósito."
          className="text-[0.9rem]"
        />
      </div>
      <ProductList products={productWithDiscount} />
    </section>
  );
};

export default Offers;
