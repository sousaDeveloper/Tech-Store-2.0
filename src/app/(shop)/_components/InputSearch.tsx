import { Category, Product } from "@prisma/client";
import { SearchIcon } from "lucide-react";
import { useState } from "react";

const InputSearch = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<{
    categories: Category[];
    products: Product[];
  }>({ categories: [], products: [] });

  const handleSearch = async () => {
    if (!query.trim()) return;

    const res = await fetch(`/api/search?q=${query}`);
    const data = await res.json();

    setResults(data);
  };

  return (
    <div className="relative">
      <input
        type="text"
        name="search"
        id="search"
        value={query}
        placeholder="O que você procura?"
        autoComplete="off"
        className="rounded-md flex justify-end px-3 py-2 w-[17rem] lg:w-[22rem] md:ml-10 lg:ml-20 bg-background"
        data-aos="fade-down"
        data-aos-delay="300"
        onChange={(e) => setQuery(e.target.value)}
      />
      <span
        className="absolute right-3 top-[0.7rem] transform -translate-y-1/2 cursor-pointer"
        data-aos="fade-down"
        data-aos-delay="300"
        onClick={handleSearch}
      >
        <SearchIcon size={20} />
      </span>
    </div>
  );
};

export default InputSearch;
