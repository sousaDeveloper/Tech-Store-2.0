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
import ButtonGoogle from "@/app/user/components/ButtonGoogle";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useToast } from "@/hooks/use-toast";
import { useContext, useState } from "react";
import { LoadingContext } from "@/providers/loading";

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
  const { toast } = useToast();
  const { isLoading, handleLoadingClick } = useContext(LoadingContext);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setAuthError(null);
    handleLoadingClick(true);

    const signInData = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    });

    if (signInData?.error) {
      setAuthError("Email ou senha incorretos.");
      handleLoadingClick(false);
    } else {
      router.push("/user-profile");
      toast({
        title: "Login realizado com sucesso!",
        description: "Redirecionando para página do usuário em instantes.",
      });
      handleLoadingClick(false);
    }
  };

  return (
    <section className="flex flex-col p-10 pt-5 text-secondaryColor min-h-[38rem] text-center">
      <div className="bg-blur-purple absolute top-0 left-0 w-full min-h-[38rem] z-[-1]"></div>
      <div className="flex justify-between">
        <ChevronLeft
          size={36}
          className="-ml-3 cursor-pointer mt-5"
          onClick={() => router.back()}
        />
      </div>

      <h2 className="text-2xl mt-10">Acesse sua conta!</h2>
      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 mt-10"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="text-left">
                <FormLabel className="text-md">Email</FormLabel>
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
                  <Input
                    type="password"
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      setAuthError(null);
                    }}
                  />
                </FormControl>
                <FormMessage className="text-red-400 text-start" />
              </FormItem>
            )}
          />

          {authError && (
            <div className="text-red-400 text-start">{authError}</div>
          )}

          <button className="w-full py-2 bg-gradient mt-5 rounded-lg flex items-center justify-center gap-2">
            Acessar{" "}
            {isLoading && <Loader2Icon className="animate-spin" size={22} />}
          </button>
          <div className="flex justify-center items-center space-x-4 my-5">
            <hr className="flex-grow border-t-1 border-gray-300" />
            <h3 className="text-sm opacity-70">Ou faça login com</h3>
            <hr className="flex-grow border-t-1 border-gray-300" />
          </div>
        </form>
        <ButtonGoogle text="Continuar com o Google" />
        <h3 className="text-sm text-center mt-4">
          Não possui uma conta?{" "}
          <Link className="underline" href="/user/sign-up">
            Registre-se
          </Link>
        </h3>
      </FormProvider>
    </section>
  );
};

export default SignInPage;
