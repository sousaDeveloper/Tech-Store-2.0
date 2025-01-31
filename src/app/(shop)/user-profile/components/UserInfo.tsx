"use client";

import { LoadingContext } from "@/providers/loading";
import {
  ChevronRight,
  Heart,
  Inbox,
  LogOutIcon,
  User2Icon,
} from "lucide-react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import Header from "./Header";
import { toast } from "sonner";
import { CartContext } from "@/providers/cart";

export interface UserSession {
  id: string;
  email: string | null | undefined;
  name: string;
  image: string | null;
}

interface UserInfoProps {
  session: UserSession;
}

const UserInfo = ({ session }: UserInfoProps) => {
  const router = useRouter();
  const { handleLoadingClick } = useContext(LoadingContext);
  const { setProducts } = useContext(CartContext);
  const [isNavigate, setIsNavigate] = useState(false);
  const [isWideScreen, setIsWideScreen] = useState(true);

  const handleLogoutClick = async () => {
    handleLoadingClick(true);
    setIsNavigate(true);
    await signOut({ redirect: false });
    router.push("/");
    toast("Você saiu da conta com sucesso.", {
      description: "Redirecionando para página inicial em instantes.",
    });
    setProducts([]);
  };

  const handleRouterClick = (path: string) => {
    handleLoadingClick(true);
    setIsNavigate(true);
    router.push(`/user-profile/${path}`);
  };

  useEffect(() => {
    if (window.innerWidth <= 1024) {
      setIsWideScreen(true);
    } else {
      setIsWideScreen(false);
      toast("Rota protegida.", {
        description: "Redirecionando para página inicial em instantes.",
      });
      router.push("/");
    }
  }, [router]);

  useEffect(() => {
    if (isNavigate) {
      handleLoadingClick(true);
    } else {
      handleLoadingClick(false);
    }
  }, [handleLoadingClick, isNavigate]);

  if (!isWideScreen) {
    return null;
  }

  return (
    <main className="p-5 sm:px-8 text-secondaryColor flex flex-col justify-center">
      <div className="bg-blur-purple absolute top-0 left-0 w-full min-h-[38rem] z-[-1]"></div>

      <Header text="Minha conta" />
      <section className="mt-3 ml-1">
        <h2
          className="text-xl sm:text-2xl"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          Bem-vindo de volta, {session.name.split(" ")[0]}.
        </h2>
        <div className="flex flex-col gap-1 mt-10 text-md sm:text-lg">
          <button
            className="text-left flex items-center gap-1 hover:text-gray-400"
            onClick={() => handleRouterClick("/orders")}
            data-aos="fade-right"
            data-aos-delay="300"
          >
            <Inbox size={20} />
            Meus Pedidos
            <ChevronRight className="ml-auto" />
          </button>
          <hr />
          <button
            className="text-left flex items-center gap-1 mt-5 hover:text-gray-400"
            onClick={() => handleRouterClick("/wishlist")}
            data-aos="fade-right"
            data-aos-delay="400"
          >
            <Heart size={20} />
            Lista de Desejos
            <ChevronRight className="ml-auto" />
          </button>
          <hr />
          <button
            className="text-left flex items-center gap-1 mt-5 hover:text-gray-400"
            onClick={handleLogoutClick}
            data-aos="fade-right"
            data-aos-delay="500"
          >
            <User2Icon size={20} />
            Sair da conta
            <LogOutIcon size={20} className="ml-auto" />
          </button>
          <hr />
        </div>
      </section>
    </main>
  );
};

export default UserInfo;
