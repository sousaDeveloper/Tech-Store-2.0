import { ChevronLeft } from "lucide-react";
import InputSearch from "../../_components/InputSearch";
import FilteredProducts from "../components/FilteredProducts";
import Link from "next/link";

interface ProductPageProps {
  params: { query: string };
}

const ProductFind = async ({ params }: ProductPageProps) => {
  const query = await params.query;

  return (
    <main className="relative px-8 sm:px-8 xl:px-16 lg:px-20 2xl:px-32 3xl:px-48 min-h-screen">
      <div className="fixed inset-0 bg-gradient-header z-[-1]" />

      <div className="flex justify-between items-center gap-2 text-secondaryColor py-5 3xl:py-7">
        <Link href="/" data-aos="fade-down">
          <ChevronLeft
            size={40}
            className="cursor-pointer bg-background rounded-md text-secondaryColor"
          />
        </Link>

        <InputSearch />
        <h1
          className="hidden flex-none md:block text-gradient text-xl lg:text-2xl font-semibold"
          data-aos="fade-down"
          data-aos-delay="400"
        >
          Tech Store
        </h1>
      </div>
      <section className="mt-3 lg:mt-10 pb-8">
        <FilteredProducts query={query} />
      </section>
    </main>
  );
};

export default ProductFind;
