import { prisma } from "@/lib/prisma";
import ProductItem from "./ProductItem";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300"],
  style: ["italic"],
});

const Offers = async () => {
  const products = await prisma.product.findMany({});

  return (
    <section className="my-5 px-5 text-secondaryColor">
      <div className="mb-5">
        <h1 className="text-xl">
          Ofertas <span className="text-gradient">Imperdíveis</span>!
        </h1>
        <h2
          className={`opacity-70 text-[0.8rem] font-light ${poppins.className}`}
        >
          Aqui na <span className="font-semibold">Tech Store</span>, seu bolso
          feliz é a nossa felicidade.
        </h2>
      </div>
      <div className="flex overflow-x-auto overflow-hidden gap-5 [&::-webkit-scrollbar]:hidden">
        {products
          .filter((product) => product.discountPercentage > 0)
          .map((product) => (
            <div key={product.id}>
              <ProductItem product={product} />
            </div>
          ))}
      </div>
    </section>
  );
};

export default Offers;
