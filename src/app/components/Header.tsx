"use client";
import { SearchIcon, User2Icon } from "lucide-react";
import { useRouter } from "next/navigation";

const Header = () => {
  const router = useRouter();

  return (
    <header className="flex justify-between gap-2 py-5">
      <div className="relative">
        <input
          type="text"
          name="search"
          id="search"
          placeholder="O que você procura?"
          autoComplete="off"
          className="rounded-md flex justify-end px-3 py-2 w-[17rem] bg-background text-secondaryColor pr-8"
        />
        <span className="absolute right-3 top-5 transform -translate-y-1/2 cursor-pointer text-secondaryColor">
          <SearchIcon size={20} />
        </span>
      </div>
      <User2Icon onClick={() => router.push("/api/auth/signin")} />
    </header>
  );
};

export default Header;
