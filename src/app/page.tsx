import { prisma } from "@/lib/prisma";
import Catalog from "./components/Catalog";
import Header from "./components/Header";
import Offers from "./components/Offers";
import Testimonials from "./components/Testimonials/Testimonials";
import Footer from "./components/Footer";

export default async function Home() {
  const products = await prisma.product.findMany({});
  const categories = await prisma.category.findMany({});

  return (
    <main>
      <div className="bg-gradient-header px-5">
        <Header />
        <section className="flex flex-col text-center items-center mt-5">
          <h3 className="text-secondaryColor opacity-70 text-md">
            Confira nossas ofertas da semana!
          </h3>
          <h1 className="text-secondaryColor text-2xl">
            A experiência que você merece:
          </h1>
          <h2 className="text-gradient text-xl">
            Turbine seu setup com os melhores periféricos do mercado!
          </h2>
          <a
            className="bg-gradient my-10 py-2 rounded-md w-[80%] text-white hover:bg-primaryColor"
            href="#catalog"
          >
            Quero turbinar meu setup!
          </a>
          <div className="w-full text-center bg-gradient-to-r from-[#1f1f1f] via-secondaryColor to-[#1f1f1f] h-[0.05rem]" />
        </section>
      </div>
      <span id="catalog"></span>
      <Offers />
      <Catalog products={products} categories={categories} />
      <Testimonials />
      <Footer />
    </main>
  );
}
