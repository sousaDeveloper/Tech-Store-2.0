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
import ButtonGoogle from "./ButtonGoogle";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface UserSheetProps {
  className?: string;
}

const formSchema = z.object({
  email: z.string().email("Email inválido").min(1, "Email é obrigatório"),
  password: z
    .string()
    .min(8, "A senha deve ter pelo menos 8 caracteres.")
    .min(1, "Senha é obrigatória"),
});

const UserSheet = ({ className }: UserSheetProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return (
    <Sheet>
      <SheetTrigger
        className={`bg-background rounded-md p-2 text-secondaryColor ${className}`}
      >
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
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="text-left">
                  <FormLabel className="text-md">Email</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormMessage className="text-red-400 text-start" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="text-left">
                  <FormLabel className="text-md">Senha</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormMessage className="text-red-400 text-start" />
                </FormItem>
              )}
            />

            <button className="w-full py-2 bg-gradient mt-5 rounded-lg">
              Acessar
            </button>
            <div className="flex justify-center items-center space-x-4 my-5">
              <hr className="flex-grow border-t-1 border-gray-300" />
              <h3 className="text-sm opacity-70">Ou faça login com</h3>
              <hr className="flex-grow border-t-1 border-gray-300" />
            </div>
            <ButtonGoogle text="Continuar com o Google" />
            <h3 className="text-sm text-center mt-4">
              Não possui uma conta?{" "}
              <Link className="underline" href="/sign-up">
                Registre-se
              </Link>
            </h3>
          </form>
        </FormProvider>
      </SheetContent>
    </Sheet>
  );
};

export default UserSheet;
