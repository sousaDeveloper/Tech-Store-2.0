import { Poppins } from "next/font/google";
import ProductList from "./ProductList";
import { prisma } from "@/lib/prisma";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300"],
  style: ["italic"],
});

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
        <h2
          className={`opacity-70 text-[0.8rem] font-light ${poppins.className}`}
        >
          Aqui na <span className="font-semibold">Tech Store</span>, seu bolso
          feliz é a nossa felicidade.
        </h2>
      </div>
      <ProductList products={productWithDiscount} />
    </section>
  );
};

export default Offers;
