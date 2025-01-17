"use client";

import { ChevronLeft, Loader2Icon } from "lucide-react";
import CustomInput from "../components/CustomInput/CustomInput";
import ButtonGoogle from "../components/ButtonGoogle";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

import "../index.css";

const RegisterPage = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleBack = () => {
    setLoading(true);
    router.back();
  };

  return (
    <section className="relative container flex flex-col p-5 text-secondaryColor min-h-screen">
      <div className="bg-blur-purple absolute top-0 left-0 w-full h-full z-[-1]"></div>
      <div className="flex justify-between">
        <ChevronLeft
          size={30}
          className="-ml-2 cursor-pointer"
          onClick={handleBack}
        />
        {loading && <Loader2Icon className="animate-spin" size={30} />}
      </div>

      <div>
        <h1 className="text-2xl mt-24">Acesse sua conta!</h1>
        <form className="flex flex-col">
          <CustomInput label="Email" type="text" />
          <CustomInput label="Senha" type="password" />
          <div className="flex mt-3 gap-1">
            <h3 className="text-sm">
              Não possui uma conta?{" "}
              <Link className="underline" href="/user/sign-up">
                Registre-se
              </Link>
            </h3>
          </div>
          <button className="w-full py-2 bg-gradient mt-5 rounded-lg">
            Login
          </button>
        </form>
        <ButtonGoogle />
      </div>
    </section>
  );
};

export default RegisterPage;
