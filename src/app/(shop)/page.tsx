import { prisma } from "@/lib/prisma";
import Catalog from "./_components/Catalog";
import Header from "./_components/Header";
import Offers from "./_components/Offers";
import Testimonials from "./_components/Testimonials/Testimonials";
import Footer from "./_components/Footer";
import Separator from "./_components/Separator";

export default async function Home() {
  const products = await prisma.product.findMany({});
  const categories = await prisma.category.findMany({});

  return (
    <main>
      <div className="px-5 sm:px-8">
        <div className="bg-gradient-header top-0 left-0 w-full h-[20.75rem] lg:h-[26rem] z-[-1]" />
        <Header />
        <section className="flex flex-col lg:gap-3 text-center justify-center items-center mt-5 sm:mt-10 md:mt-14">
          <h3 className="text-gray-400 text-md sm:text-xl" data-aos="fade-up">
            Confira nossas ofertas da semana!
          </h3>
          <h1
            className="text-secondaryColor text-2xl sm:text-3xl md:text-4xl lg:text-[3rem]"
            data-aos-delay="200"
            data-aos="fade-up"
          >
            A experiência que você merece:
          </h1>
          <h2
            className="text-gradient text-xl sm:text-2xl md:text-3xl lg:text-4xl lg:w-[85%]"
            data-aos-delay="300"
            data-aos="fade-up"
          >
            Turbine seu setup com os melhores periféricos do mercado!
          </h2>
          <a
            className="bg-gradient my-10 py-2 rounded-md w-[80%] sm:w-[17rem] sm:py-3 md:w-[20rem] md:text-lg text-white hover:bg-primaryColor shadow-xl"
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
