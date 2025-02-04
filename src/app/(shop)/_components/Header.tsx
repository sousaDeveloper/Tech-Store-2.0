"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ChevronDown,
  Loader2Icon,
  LogInIcon,
  SearchIcon,
  User2Icon,
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import { CartContext } from "@/providers/cart";

const Header = () => {
  const router = useRouter();
  const { status, data: session } = useSession();
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
    setIsLoading(true);
    await signOut({ redirect: false });
    router.push("/");
    toast("Você saiu da conta com sucesso.", {
      description: "Redirecionando para página inicial em instantes.",
    });
    setProducts([]);
  };

  useEffect(() => {
    setIsLoading(false);
  }, [session]);

  return (
    <header className="flex justify-between items-center gap-2 py-5 text-secondaryColor 3xl:py-7">
      <h1
        className="hidden flex-none md:block text-gradient text-xl lg:text-2xl font-semibold"
        data-aos="fade-down"
      >
        Tech Store
      </h1>
      <div className="relative">
        <input
          type="text"
          name="search"
          id="search"
          placeholder="O que você procura?"
          autoComplete="off"
          className="rounded-md flex justify-end px-3 py-2 w-[17rem] lg:w-[20rem] lg:ml-12 bg-background"
          data-aos="fade-down"
          data-aos-delay="300"
        />
        <span
          className="absolute right-3 top-[0.7rem] transform -translate-y-1/2 cursor-pointer"
          data-aos="fade-down"
          data-aos-delay="300"
        >
          <SearchIcon size={20} />
        </span>
      </div>
      <div className="hidden flex-none lg:flex items-center gap-1">
        <DropdownMenu>
          <DropdownMenuTrigger
            className="flex items-center gap-1 outline-none bg-primaryColor px-7 py-2 rounded-md hover:text-gray-400 duration-300"
            data-aos="fade-down"
            data-aos-delay="400"
          >
            <>
              <User2Icon size={20} />
              Minha conta
              <ChevronDown size={20} className="mt-1" />
            </>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-backgroundItem text-secondaryColor hidden flex-none lg:flex lg:flex-col">
            {status === "authenticated" ? (
              <>
                <DropdownMenuLabel
                  className="text-lg flex gap-1 items-center truncate"
                  data-aos="fade-down"
                  data-aos-delay="100"
                >
                  Olá, {session.user.name.split(" ")[0]}!
                  {isLoading && (
                    <Loader2Icon className="animate-spin" size={20} />
                  )}
                </DropdownMenuLabel>
                <hr />

                <ul className="px-2 flex flex-col gap-1 text-lg mt-2">
                  <li
                    onClick={() =>
                      handleRouterClickDesktop("/user-profile/orders")
                    }
                    className={`cursor-pointer hover:text-gray-400 hover:translate-x-1 duration-300 ${
                      isLoading ? "pointer-events-none" : ""
                    }`}
                    data-aos="fade-right"
                    data-aos-delay="200"
                  >
                    Meus pedidos{" "}
                  </li>
                  <li
                    onClick={() =>
                      handleRouterClickDesktop("/user-profile/wishlist")
                    }
                    className={`cursor-pointer hover:text-gray-400 hover:translate-x-1 duration-300 ${
                      isLoading ? "pointer-events-none" : ""
                    }`}
                    data-aos="fade-right"
                    data-aos-delay="300"
                  >
                    Lista de desejos{" "}
                  </li>
                  <li
                    onClick={handleLogoutClick}
                    className={`cursor-pointer  hover:text-red-500 hover:translate-x-1 duration-300 ${
                      isLoading ? "pointer-events-none" : ""
                    }`}
                    data-aos="fade-right"
                    data-aos-delay="400"
                  >
                    Sair da conta{" "}
                  </li>
                </ul>
              </>
            ) : (
              <>
                <DropdownMenuLabel className="text-lg flex gap-1 items-center">
                  Olá, seja bem-vindo!
                </DropdownMenuLabel>
                <hr />
                <button
                  className={`cursor-pointer flex items-center gap-2 hover:text-gray-400 duration-300 px-2 text-lg mt-2 ${
                    isLoading ? "pointer-events-none" : ""
                  }`}
                  onClick={() => handleRouterClickDesktop("/api/auth/signin")}
                >
                  <LogInIcon size={20} />
                  Entrar
                  {isLoading && (
                    <Loader2Icon className="animate-spin" size={20} />
                  )}
                </button>
              </>
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
        data-aos="fade-down"
        data-aos-delay="400"
        onClick={handleRouterClick}
      >
        <User2Icon size={20} />
        Minha conta
      </button>
    </header>
  );
};

export default Header;
