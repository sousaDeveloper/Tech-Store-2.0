"use client";

import { useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import { CartContext } from "@/providers/cart";

const SuccessPage = () => {
  const { clearCart } = useContext(CartContext);
  const router = useRouter();

  useEffect(() => {
    clearCart();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen text-secondaryColor">
      <div className="bg-blur-purple absolute top-0 left-0 w-full min-h-screen z-[-1]"></div>
      <h1 className="text-3xl lg:text-[2.5rem] 3xl:text-[3.2rem] font-bold text-green-500">
        Pagamento aprovado! ✅
      </h1>
      <p className="lg:text-lg lg:mt-2 3xl:text-xl">
        Seu pedido foi concluído com sucesso.
      </p>
      <button
        onClick={() => router.push("/user-profile/orders")}
        className="mt-4 bg-primaryColor text-white px-8 py-3 rounded-md"
      >
        Ver meu pedidos
      </button>
      <button
        onClick={() => router.push("/")}
        className="mt-2 bg-backgroundItem text-white px-8 py-3 rounded-md"
      >
        Voltar para a loja
      </button>
    </div>
  );
};

export default SuccessPage;
