"use client";

import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300"],
});

import { Loader2Icon, LogInIcon, LogOutIcon, User2Icon } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import { CartContext } from "@/providers/cart";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import InputSearch from "./InputSearch";
import Link from "next/link";

const linkStyles =
  "flex items-center gap-2 w-fit cursor-pointer hover:text-gray-400 mt-1 hover:translate-x-1 duration-300";

const Header = () => {
  const router = useRouter();
  const { status, data: session } = useSession();
  const pathname = usePathname();
  const { setProducts } = useContext(CartContext);
  const [isLoading, setIsLoading] = useState(false);

  const isAuthenticated = status === "authenticated";

  const handleRouterClick = () => {
    if (isAuthenticated) {
      router.push("/user-profile");
      return;
    }

    router.push("/api/auth/signin");
  };

  const handleLogoutClick = async () => {
    setIsLoading(true);
    await signOut({ redirect: false });
    router.push("/");
    toast("Você saiu da conta com sucesso.", {
      description: `${
        pathname !== "/"
          ? "Redirecionando para página inicial em instantes."
          : ""
      }`,
    });
    setProducts([]);
  };

  useEffect(() => {
    setIsLoading(false);
  }, [session]);

  return (
    <header className="flex justify-around items-center gap-2 py-5 text-secondaryColor 3xl:py-7">
      <h1
        className="hidden flex-none md:block text-gradient text-xl lg:text-2xl font-semibold"
        data-aos="fade-down"
      >
        Tech Store
      </h1>
      <InputSearch />
      <div className="hidden flex-none lg:flex items-center gap-1">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger
                className="flex items-center gap-1 outline-none text-lg bg-primaryColor px-7 py-5 rounded-md hover:text-gray-400 duration-300"
                data-aos="fade-down"
                data-aos-delay="400"
              >
                <>
                  {isLoading ? (
                    <Loader2Icon className="animate-spin" size={20} />
                  ) : (
                    <User2Icon className="cursor-pointer" size={20} />
                  )}
                  Minha conta
                </>
              </NavigationMenuTrigger>
              <NavigationMenuContent
                className={`bg-backgroundItem text-secondaryColor hidden flex-none lg:flex lg:flex-col w-[50rem] min-w-[15rem] max-w-[15rem] px-4 ${poppins.className} py-2`}
              >
                <div>
                  {status === "authenticated" && (
                    <>
                      <h3 className="text-lg flex gap-1 items-center truncate">
                        Olá, {session?.user.name.split(" ")[0]}!
                      </h3>
                      <hr />
                    </>
                  )}
                  {status === "authenticated" ? (
                    <>
                      <h3 className="font-semibold mt-2 text-base">
                        O que deseja fazer?
                      </h3>
                      <ul className="flex flex-col text-lg">
                        <li
                          className={`cursor-pointer hover:text-gray-400 hover:translate-x-1 duration-300 ${
                            isLoading ? "pointer-events-none" : ""
                          }`}
                        >
                          <Link href="/user-profile/orders">Meus pedidos</Link>
                        </li>
                        <li
                          className={`cursor-pointer hover:text-gray-400 hover:translate-x-1 mb-1 duration-300 ${
                            isLoading ? "pointer-events-none" : ""
                          }`}
                        >
                          <Link href="/user-profile/wishlist">
                            Lista de desejos
                          </Link>
                        </li>
                        <hr />
                        <li
                          onClick={handleLogoutClick}
                          className={`cursor-pointer hover:text-red-500 hover:translate-x-1 flex items-center mt-2 gap-1 duration-300 ${
                            isLoading ? "pointer-events-none" : ""
                          }`}
                        >
                          <LogOutIcon size={20} />
                          Sair da conta{" "}
                        </li>
                      </ul>
                    </>
                  ) : (
                    <div>
                      <h3 className="flex gap-1 items-center mt-1 font-semibold">
                        Já possui cadastro?
                      </h3>
                      <Link
                        href="/api/auth/signin"
                        className={`${linkStyles} ${
                          isLoading ? "pointer-events-none" : ""
                        }`}
                      >
                        <LogInIcon size={20} />
                        Entrar
                      </Link>
                    </div>
                  )}
                </div>
                {status === "unauthenticated" && (
                  <div className="mt-2">
                    <hr />
                    <h3 className="flex gap-1 items-center mt-2 font-semibold">
                      Ainda não é cadastrado?
                    </h3>
                    <Link
                      href="/user/sign-up"
                      className={`${linkStyles} ${
                        isLoading ? "pointer-events-none" : ""
                      }`}
                    >
                      <LogInIcon size={20} />
                      Cadastra-se
                    </Link>
                  </div>
                )}
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <button
        className="bg-background p-2 rounded-md sm:flex-none sm:hidden"
        onClick={handleRouterClick}
      >
        {isLoading ? (
          <Loader2Icon className="animate-spin" size={20} />
        ) : (
          <User2Icon className="cursor-pointer" />
        )}
      </button>
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
