"use client";

import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import CustomInput from "../components/user/CustomInput/CustomInput";
import ButtonGoogle from "../components/user/ButtonGoogle";

const SignUp = () => {
  const router = useRouter();

  return (
    <main className="flex flex-col text-secondaryColor text-center">
      <div className="bg-blur-purple absolute top-0 left-0 w-full h-full z-[-1]"></div>
      <section className="px-8 mt-20">
        <ChevronLeft
          size={36}
          onClick={() => router.back()}
          className="cursor-pointer bg-background top-3 left-5 rounded-xl absolute"
        />
        <h2 className="text-2xl mt-10">Criar Conta</h2>
        <h3 className="text-sm opacity-60">
          Preencha suas informações abaixo e registre-se.
        </h3>
        <div>
          <form className="flex flex-col gap-2">
            <CustomInput label="Nome" type="text" />
            <CustomInput label="Email" type="text" />
            <CustomInput label="Senha" type="password" />

            <button className="w-full py-2 bg-gradient mt-5 rounded-lg">
              Criar Conta
            </button>
            <div className="flex justify-center items-center space-x-4 mt-5">
              <hr className="flex-grow border-t-1 border-gray-300" />
              <h3 className="text-sm opacity-60">Ou crie sua conta com</h3>
              <hr className="flex-grow border-t-1 border-gray-300" />
            </div>
            <ButtonGoogle text="Criar conta com o Google" />
          </form>
        </div>
      </section>
    </main>
  );
};

export default SignUp;
