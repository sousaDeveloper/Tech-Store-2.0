"use client";

import Separator from "@/app/components/Separator";
import { useToast } from "@/hooks/use-toast";
import { LoadingContext } from "@/providers/loading";
import {
  ChevronLeft,
  ChevronRight,
  Inbox,
  Loader2Icon,
  LogOutIcon,
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
        <h1 className="text-2xl ml-20">Minha conta</h1>
        {isLoading && <Loader2Icon className="animate-spin ml-20" />}
      </div>
      <Separator />
      <section className="mt-5 ml-1">
        <h2 className="text-xl">
          Olá, {session.name.split(" ")}. Bem-vindo de volta!
        </h2>
        <div className="flex flex-col gap-1 mt-10 text-md">
          <Link
            className="text-left flex items-center gap-1 hover:opacity-60 hover:translate-x-2 duration-300"
            href="/orders"
          >
            <Inbox size={20} />
            Ver meu pedidos
            <ChevronRight className="ml-auto" />
          </Link>
          <hr />
          <button
            className="text-left flex items-center gap-1 mt-5 hover:opacity-60 hover:translate-x-2 duration-300"
            onClick={handleLogoutClick}
          >
            <LogOutIcon size={20} />
            Sair da conta
            <ChevronRight className="ml-auto" />
          </button>
          <hr />
        </div>
      </section>
    </main>
  );
};

export default UserInfo;
