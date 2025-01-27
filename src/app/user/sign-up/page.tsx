"use client";

import { ChevronLeft, Loader2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
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
import { useContext } from "react";
import { LoadingContext } from "@/providers/loading";
import { toast } from "sonner";

const formSchema = z
  .object({
    name: z
      .string()
      .min(4, {
        message: "O nome de usuário deve ter pelo menos 4 caracteres.",
      })
      .max(20),
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
  const { handleLoadingClick, isLoading } = useContext(LoadingContext);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    handleLoadingClick(true);
    try {
      const response = await fetch("/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();

      if (response.status === 409) {
        toast("Algo deu errado!", { description: responseData.message });

        form.setError("email", {
          type: "manual",
          message: responseData.message,
        });
        return;
      }

      if (response.ok) {
        toast("Conta criada com sucesso.", {
          description: "Agora, realize seu login.",
        });
        router.push("/");
      } else {
        toast(responseData.message);
      }
    } catch (error) {
      console.error("Something went wrong.", error);
    } finally {
      handleLoadingClick(false);
    }
  };

  return (
    <main className="flex flex-col text-secondaryColor min-h-[54rem] text-center p-10">
      <div className="bg-blur-purple absolute top-0 left-0 w-full min-h-[54rem] z-[-1]"></div>
      <section className="mt-12">
        <ChevronLeft
          size={36}
          onClick={() => router.back()}
          className="cursor-pointer bg-background -ml-3 -mt-12 rounded-xl absolute"
        />
        <h2 className="text-2xl mt-5" data-aos="fade-down">
          Crie sua conta!
        </h2>
        <h3
          className="text-sm text-gray-400"
          data-aos="fade-down"
          data-aos-delay="200"
        >
          Preencha seus dados para começar a sua jornada com a gente.
        </h3>
        <FormProvider {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-10"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem
                  className="text-left"
                  data-aos="fade-up"
                  data-aos-delay="100"
                >
                  <FormLabel className="text-md">Nome de Usuário</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
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
                <FormItem
                  className="text-left"
                  data-aos="fade-up"
                  data-aos-delay="200"
                >
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
                <FormItem
                  className="text-left"
                  data-aos="fade-up"
                  data-aos-delay="300"
                >
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
                <FormItem
                  className="text-left"
                  data-aos="fade-up"
                  data-aos-delay="400"
                >
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
              {isLoading ? (
                <span className="flex gap-1 justify-center items-center">
                  Criar Conta
                  <Loader2Icon className="animate-spin" size={22} />
                </span>
              ) : (
                <>Criar Conta</>
              )}
            </button>
          </form>
        </FormProvider>
      </section>
    </main>
  );
};

export default SignUp;
