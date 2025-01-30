"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Loader2Icon, SearchIcon, User2Icon } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Separator from "./Separator";
import Link from "next/link";
import { useContext, useState } from "react";
import { toast } from "sonner";
import { CartContext } from "@/providers/cart";

const Header = () => {
  const router = useRouter();
  const { status } = useSession();
  const { setProducts } = useContext(CartContext);
  const [isLoading, setIsLoading] = useState(false);

  const handleRouterClick = () => {
    if (status === "authenticated") {
      router.push("/user-profile");
    } else {
      router.push("/api/auth/signin");
    }
  };

  const handleRouterClickDesktop = (href: string) => {
    setIsLoading(true);
    router.push(`${href}`);
  };

  const handleLogoutClick = async () => {
    await signOut({ redirect: false });
    router.push("/");
    toast("Você saiu da conta com sucesso.", {
      description: "Redirecionando para página inicial em instantes.",
    });
    setProducts([]);
  };

  return (
    <header className="flex justify-between items-center gap-2 py-5 text-secondaryColor">
      <h2 className="hidden flex-none md:flex text-gradient text-xl lg:text-2xl font-semibold">
        Tech Store
      </h2>
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
      <div className="hidden flex-none lg:flex items-center gap-1">
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-1 outline-none bg-primaryColor px-7 py-2 rounded-md">
            <>
              <User2Icon size={20} />
              Minha conta
            </>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-background text-secondaryColor">
            {status === "authenticated" ? (
              <>
                <DropdownMenuLabel className="text-xl flex gap-1 items-center">
                  Minha conta
                  {isLoading && (
                    <Loader2Icon className="animate-spin" size={20} />
                  )}
                </DropdownMenuLabel>
                <Separator />

                <ul className="px-2 flex flex-col gap-1 text-lg">
                  <li
                    onClick={() =>
                      handleRouterClickDesktop("/user-profile/orders")
                    }
                    className="cursor-pointer hover:text-gray-400"
                  >
                    Meus pedidos{" "}
                  </li>
                  <li
                    onClick={() =>
                      handleRouterClickDesktop("/user-profile/wishlist")
                    }
                    className="cursor-pointer hover:text-gray-400"
                  >
                    Lista de desejos{" "}
                  </li>
                  <li
                    onClick={handleLogoutClick}
                    className="cursor-pointer hover:text-gray-400"
                  >
                    Sair da conta{" "}
                  </li>
                </ul>
              </>
            ) : (
              <button
                className="cursor-pointer flex items-center gap-2 hover:text-gray-400 px-2"
                onClick={() => handleRouterClickDesktop("/api/auth/signin")}
              >
                Entrar
                {isLoading && (
                  <Loader2Icon className="animate-spin" size={20} />
                )}
              </button>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div
        className="bg-background p-2 rounded-md sm:flex-none sm:hidden"
        onClick={handleRouterClick}
      >
        <User2Icon className="cursor-pointer" />
      </div>
      <button
        className="hidden flex-none items-center gap-1 sm:flex lg:hidden lg:flex-none bg-primaryColor px-7 py-2 rounded-md"
        onClick={handleRouterClick}
      >
        <User2Icon size={20} />
        Minha conta
      </button>
    </header>
  );
};

export default Header;
