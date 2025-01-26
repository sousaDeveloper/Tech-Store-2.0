"use client";

import Separator from "@/app/components/Separator";
import { useToast } from "@/hooks/use-toast";
import { LoadingContext } from "@/providers/loading";
import {
  ChevronLeft,
  ChevronRight,
  Heart,
  Inbox,
  Loader2Icon,
  LogOutIcon,
  User2Icon,
} from "lucide-react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";

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
  const { toast } = useToast();
  const { handleLoadingClick, isLoading } = useContext(LoadingContext);

  const handleRouterBackClick = () => {
    handleLoadingClick(true);
    router.back();
  };

  const handleLogoutClick = async () => {
    handleLoadingClick(true);
    await signOut({ redirect: false });
    router.push("/");
    toast({
      title: "Você saiu da conta com sucesso.",
      description: "Redirecionando à tela inicial em instantes",
    });
  };

  useEffect(() => {
    handleLoadingClick(false);
  }, [handleLoadingClick]);

  return (
    <main className="p-5 text-secondaryColor flex flex-col justify-center">
      <div className="bg-blur-purple absolute top-0 left-0 w-full min-h-[38rem] z-[-1]"></div>
      <div className="flex items-center text-center mb-2">
        <button onClick={handleRouterBackClick}>
          <ChevronLeft size={40} className="cursor-pointer" />
        </button>
        <h1 className="text-2xl ml-20" data-aos="fade-down">
          Minha conta
        </h1>
        {isLoading && <Loader2Icon className="animate-spin ml-16" />}
      </div>
      <Separator />
      <section className="mt-3 ml-1">
        <h2 className="text-xl" data-aos="fade-up" data-aos-delay="100">
          Bem-vindo de volta, {session.name.split(" ")}.
        </h2>
        <div className="flex flex-col gap-1 mt-10 text-md">
          <Link
            className="text-left flex items-center gap-1 hover:text-gray-400"
            href="/orders"
            data-aos="fade-right"
            data-aos-delay="300"
          >
            <Inbox size={20} />
            Meus Pedidos
            <ChevronRight className="ml-auto" />
          </Link>
          <hr />
          <Link
            className="text-left flex items-center gap-1 mt-5 hover:text-gray-400"
            href="/wishlist"
            data-aos="fade-right"
            data-aos-delay="400"
          >
            <Heart size={20} />
            Lista de Desejos
            <ChevronRight className="ml-auto" />
          </Link>
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
