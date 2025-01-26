import { prisma } from "@/lib/prisma";
import Catalog from "./components/Catalog";
import Header from "./components/Header";
import Offers from "./components/Offers";
import Testimonials from "./components/Testimonials/Testimonials";
import Footer from "./components/Footer";
import Separator from "./components/Separator";

export default async function Home() {
  const products = await prisma.product.findMany({});
  const categories = await prisma.category.findMany({});

  return (
    <main>
      <div className="px-5">
        <div className="bg-gradient-header top-0 left-0 w-full h-[20.75rem] z-[-1]" />
        <Header />
        <section className="flex flex-col text-center items-center mt-5">
          <h3
            className="text-secondaryColor opacity-70 text-md"
            data-aos="fade-up"
          >
            Confira nossas ofertas da semana!
          </h3>
          <h1
            className="text-secondaryColor text-2xl"
            data-aos-delay="200"
            data-aos="fade-up"
          >
            A experiência que você merece:
          </h1>
          <h2
            className="text-gradient text-xl"
            data-aos-delay="300"
            data-aos="fade-up"
          >
            Turbine seu setup com os melhores periféricos do mercado!
          </h2>
          <a
            className="bg-gradient my-10 py-2 rounded-md w-[80%] text-white hover:bg-primaryColor"
            href="#catalog"
            data-aos-delay="400"
            data-aos="zoom-in"
          >
            Quero turbinar meu setup!
          </a>
          <Separator />
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
