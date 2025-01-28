"use client";
import { SearchIcon, User2Icon } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Header = () => {
  const router = useRouter();
  const { status } = useSession();

  const handleRouterClick = () => {
    if (status === "authenticated") {
      router.push("/user-profile");
    } else {
      router.push("/api/auth/signin");
    }
  };

  return (
    <header className="flex justify-between items-center gap-2 py-5 text-secondaryColor">
      <div className="relative">
        <input
          type="text"
          name="search"
          id="search"
          placeholder="O que você procura?"
          autoComplete="off"
          className="rounded-md flex justify-end px-3 py-2 w-[17rem] bg-background  pr-8"
        />
        <span className="absolute right-3 top-5 transform -translate-y-1/2 cursor-pointer">
          <SearchIcon size={20} />
        </span>
      </div>
      <div className="bg-background p-2 rounded-md" onClick={handleRouterClick}>
        <User2Icon className="cursor-pointer" />
      </div>
    </header>
  );
};

export default Header;
