"use client";

import { ChevronLeft, Loader2Icon } from "lucide-react";
import Link from "next/link";
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
import { redirect, useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const formSchema = z.object({
  email: z.string().email("Email inválido").min(1, "Email é obrigatório"),
  password: z
    .string()
    .min(8, "A senha deve ter pelo menos 8 caracteres.")
    .min(1, "Senha é obrigatória"),
});

const SignInPage = () => {
  const [authError, setAuthError] = useState<string | null>(null);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { data: session } = useSession();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setAuthError(null);
    setIsLoading(true);

    const signInData = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    });

    if (signInData?.error) {
      setAuthError("Email ou senha incorretos.");
      setIsLoading(false);
    } else {
      toast("Login realizado com sucesso!");
      router.push("/user-profile");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (session?.user) {
      toast("Usuário já autenticado.", {
        description: "Voltando para página inicial em instantes.",
      });
      return redirect("/");
    }
  }, []);

  return (
    <section className="flex flex-col p-10 pt-5 xl:px-16 text-secondaryColor min-h-[40rem] text-center">
      <div className="bg-blur-purple absolute top-0 left-0 w-full min-h-[40rem] z-[-1]"></div>
      <ChevronLeft
        size={36}
        className="-ml-3 cursor-pointer mt-5 sm:mt-8 sm:-ml-1 md:hidden md:flex-none"
        onClick={() => router.back()}
      />
      <ChevronLeft
        size={44}
        onClick={() => router.back()}
        className="hidden flex-none cursor-pointer bg-background mt-8 absolute md:flex"
      />

      <h2
        className="text-2xl sm:text-3xl md:text-4xl mt-10 sm:px-20 md:px-20 md:mt-28 lg:w-[70%] lg:mx-auto xl:w-[60%] 2xl:mt-36 2xl:w-[50%]"
        data-aos="fade-down"
      >
        Já tem uma conta? Faça login para continuar.
      </h2>
      <h3
        className="text-sm sm:text-lg md:text-xl text-gray-400 sm:px-14 lg:w-[80%] lg:mx-auto md:px-20 xl:w-[60%] 2xl:w-[50%]"
        data-aos="fade-down"
        data-aos-delay="200"
      >
        Bem-vindo de volta! Entre com seu e-mail e senha para acessar sua conta.
      </h3>
      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 mt-7 w-full sm:w-[25rem] mx-auto"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem
                className="text-left w-full"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                <FormLabel className="text-base sm:text-lg">Email</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      setAuthError(null);
                    }}
                  />
                </FormControl>
                <FormMessage className="text-red-400 text-start sm:text-sm" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem
                className="text-left w-full"
                data-aos="fade-up"
                data-aos-delay="300"
              >
                <FormLabel className="text-md sm:text-lg">Senha</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      setAuthError(null);
                    }}
                  />
                </FormControl>
                <FormMessage className="text-red-400 text-start sm:text-sm" />
              </FormItem>
            )}
          />

          {authError && (
            <div
              className="text-red-400 text-start sm:text-base"
              data-aos="zoom-in"
            >
              {authError}
            </div>
          )}

          <button
            className="w-full py-2 sm:py-3 sm:text-lg bg-gradient mt-5 rounded-lg flex items-center justify-center gap-2 hover:text-background"
            data-aos="zoom-in"
            data-aos-delay="200"
            disabled={isLoading}
          >
            Acessar{" "}
            {isLoading && <Loader2Icon className="animate-spin" size={22} />}
          </button>
        </form>
        <h3 className="text-sm text-center mt-4 sm:text-base">
          Não possui uma conta?{" "}
          <Link
            className="underline opacity-70 hover:text-blue-500 duration-300"
            href="/user/sign-up"
          >
            Registre-se
          </Link>
        </h3>
      </FormProvider>
    </section>
  );
};

export default SignInPage;
