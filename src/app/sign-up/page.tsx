"use client";

import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import ButtonGoogle from "../components/user/ButtonGoogle";
import { FormProvider, useForm } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";

const formSchema = z
  .object({
    username: z.string().min(2, {
      message: "O nome de usuário deve ter pelo menos 2 caracteres.",
    }),
    email: z.string().email("Email inválido").min(1, "Email é obrigatório"),
    password: z
      .string()
      .min(8, "A senha deve ter pelo menos 8 caracteres.")
      .min(1, "Senha é obrigatória"),
    confirmPassword: z
      .string()
      .min(8, "A senha de confirmação deve ter pelo menos 8 caracteres."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Senhas não coincidem",
  });

const SignUp = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return (
    <main className="flex flex-col text-secondaryColor min-h-[48rem] text-center">
      <div className="bg-blur-purple absolute top-0 left-0 w-full min-h-[48rem] z-[-1]"></div>
      <section className="px-8 mt-12">
        <ChevronLeft
          size={36}
          onClick={() => router.back()}
          className="cursor-pointer bg-background top-6 left-5 rounded-xl absolute"
        />
        <h2 className="text-2xl mt-5">Criar Conta</h2>
        <h3 className="text-sm opacity-60">
          Preencha suas informações abaixo e registre-se.
        </h3>
        <FormProvider {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-10"
          >
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem className="text-left">
                  <FormLabel className="text-md">Nome de Usuário</FormLabel>
                  <FormControl>
                    <Input type="text" className="mt-0" {...field} />
                  </FormControl>
                  <FormMessage className="text-red-400 text-start" />
                </FormItem>
              )}
            />

            {/* Campo de Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="text-left">
                  <FormLabel className="text-md">Email</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} />
                  </FormControl>
                  <FormMessage className="text-red-400 text-start" />
                </FormItem>
              )}
            />

            {/* Campo de Senha */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="text-left">
                  <FormLabel className="text-md">Senha</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage className="text-red-400 text-start" />
                </FormItem>
              )}
            />

            {/* Campo de Confirmação de Senha */}
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem className="text-left">
                  <FormLabel className="text-md">Confirmar Senha</FormLabel>
                  <FormControl className="m-0">
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage className="text-red-400 text-start" />
                </FormItem>
              )}
            />

            <button
              className="w-full py-2 bg-gradient mt-5 rounded-lg"
              type="submit"
            >
              Criar Conta
            </button>

            <div className="flex justify-center items-center space-x-4 mt-4">
              <hr className="flex-grow border-t-1 border-gray-300" />
              <h3 className="text-sm opacity-60">Ou crie sua conta com</h3>
              <hr className="flex-grow border-t-1 border-gray-300" />
            </div>

            <ButtonGoogle text="Criar conta com o Google" />
          </form>
        </FormProvider>
      </section>
    </main>
  );
};

export default SignUp;
