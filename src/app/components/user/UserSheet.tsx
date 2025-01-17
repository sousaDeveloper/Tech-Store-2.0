"use client";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { DialogTitle } from "@radix-ui/react-dialog";
import { ChevronRight, Loader2Icon, User2Icon } from "lucide-react";
import Link from "next/link";
import CustomInput from "./CustomInput/CustomInput";
import ButtonGoogle from "./ButtonGoogle";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const UserSheet = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const session = useSession();

  useEffect(() => {
    if (session.data) {
      setLoading(true);
      toast({
        title: "Login realizado com sucesso!",
        description: "Redirecionando para a página do usuário.",
      });
      setTimeout(() => {
        router.push("/user/profile");
        setLoading(false);
      }, 4000);
    }
  }, [session, router, toast]);

  return (
    <Sheet>
      <SheetTrigger className="bg-background rounded-md p-2 text-secondaryColor">
        <User2Icon />
      </SheetTrigger>
      <SheetContent className="flex flex-col p-10 pt-5 text-secondaryColor min-h-screen">
        <div className="bg-blur-purple absolute top-0 left-0 w-full h-full z-[-1]"></div>
        <div className="flex justify-between">
          <SheetClose>
            <ChevronRight size={30} className="-ml-2 cursor-pointer mt-5" />
          </SheetClose>
          {loading && <Loader2Icon className="animate-spin" size={30} />}
        </div>

        <div>
          <DialogTitle className="text-2xl mt-10">
            Acesse sua conta!
          </DialogTitle>
          <form className="flex flex-col">
            <CustomInput label="Email" type="text" />
            <CustomInput label="Senha" type="password" />

            <button className="w-full py-2 bg-gradient mt-5 rounded-lg">
              Acessar
            </button>
          </form>
          <ButtonGoogle />
        </div>
        <h3 className="text-sm mt-3 text-center">
          Não possui uma conta?{" "}
          <Link className="underline" href="/user/sign-up">
            Registre-se
          </Link>
        </h3>
      </SheetContent>
    </Sheet>
  );
};

export default UserSheet;
