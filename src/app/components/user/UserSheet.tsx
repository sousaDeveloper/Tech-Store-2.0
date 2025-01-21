"use client";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { DialogTitle } from "@radix-ui/react-dialog";
import { ChevronRight, User2Icon } from "lucide-react";
import Link from "next/link";
import CustomInput from "./CustomInput/CustomInput";
import ButtonGoogle from "./ButtonGoogle";

const UserSheet = () => {
  return (
    <Sheet>
      <SheetTrigger className="bg-background rounded-md p-2 text-secondaryColor">
        <User2Icon />
      </SheetTrigger>
      <SheetContent
        className="flex flex-col p-10 pt-5 text-secondaryColor min-h-screen text-center 
      rounded-tl-[3rem] rounded-bl-[3rem]w-[90%] max-w-[90%]"
      >
        <div className="bg-blur-purple absolute top-0 left-0 w-full h-full z-[-1]"></div>
        <div className="flex justify-between">
          <SheetClose className="outline-none">
            <ChevronRight size={36} className="-ml-3 cursor-pointer mt-5" />
          </SheetClose>
        </div>

        <DialogTitle className="text-2xl mt-10">Acesse sua conta!</DialogTitle>

        <div>
          <form className="flex flex-col gap-2">
            <CustomInput label="Email" type="text" />
            <CustomInput label="Senha" type="password" />

            <button className="w-full py-2 bg-gradient mt-5 rounded-lg">
              Acessar
            </button>
          </form>
          <div className="flex justify-center items-center space-x-4 my-5">
            <hr className="flex-grow border-t-1 border-gray-300" />
            <h3 className="text-sm opacity-70">Ou faça login com</h3>
            <hr className="flex-grow border-t-1 border-gray-300" />
          </div>
          <ButtonGoogle text="Fazer login com o Google" />
        </div>
        <h3 className="text-sm text-center">
          Não possui uma conta?{" "}
          <Link className="underline" href="/sign-up">
            Registre-se
          </Link>
        </h3>
      </SheetContent>
    </Sheet>
  );
};

export default UserSheet;
