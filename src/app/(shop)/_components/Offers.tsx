import ProductList from "./Product/ProductList";
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

  const shuffledProducts = productWithDiscount.sort(() => Math.random() - 0.5);

  return (
    <section className="my-5 px-5 sm:px-8 sm:my-12 md:mb-20 lg:mb-24 text-secondaryColor">
      <div className="mb-2">
        <h1
          className="text-2xl sm:text-3xl lg:text-4xl"
          data-aos-delay="200"
          data-aos="fade-right"
        >
          Ofertas <span className="text-gradient">Imperdíveis</span>!
        </h1>
        <SubText
          text="Seu bolso feliz faz parte do nosso propósito."
          className="text-[0.9rem] lg:text-lg"
        />
      </div>
      <ProductList products={shuffledProducts} />
    </section>
  );
};

export default Offers;
