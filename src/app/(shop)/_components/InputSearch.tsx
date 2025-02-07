"use client";

import { Category, Product } from "@prisma/client";
import { SearchIcon } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const InputSearch = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<{
    categories: Category[];
    products: Product[];
  }>({ categories: [], products: [] });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (pathname && pathname.includes("/product-find/")) {
      const searchTerm = pathname.split("/product-find/")[1];
      setQuery(searchTerm);
      fetchResults(searchTerm);
    }
  }, [pathname]);

  const fetchResults = async (query: string) => {
    setIsLoading(true);
    const res = await fetch(`/api/search?q=${query}`);
    const data = await res.json();
    setResults(data);
    setIsLoading(false);
  };

  const handleSearch = async () => {
    if (query.trim() && !isLoading) {
      const searchTerm = `/product-find/${query}`;

      if (pathname !== searchTerm) {
        router.push(searchTerm);
      } else {
        return;
      }

      fetchResults(query);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="relative text-secondaryColor">
      <input
        type="text"
        name="search"
        id="search"
        value={query}
        placeholder="Pesquise sua marca favorita"
        autoComplete="off"
        className="rounded-md flex justify-end px-3 py-2 w-[17rem] lg:w-[22rem] md:ml-10 lg:ml-20 bg-background"
        data-aos="fade-down"
        data-aos-delay="300"
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyPress}
      />
      <span
        className="absolute right-3 top-[0.5rem] transform -translate-y-1/2 cursor-pointer"
        data-aos="fade-down"
        data-aos-delay="300"
        onClick={handleSearch}
      >
        <SearchIcon size={23} />
      </span>
    </div>
  );
};

export default InputSearch;
