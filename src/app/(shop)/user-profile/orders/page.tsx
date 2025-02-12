import { prisma } from "@/lib/prisma";
import Header from "../components/Header";
import { getServerSession } from "next-auth";
import OrderItem from "./components/OrderItem";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

const OrdersPage = async () => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return redirect("/api/auth/signin");
  }

  const orders = await prisma.order.findMany({
    where: { userId: session.user.id },
    include: { orderProducts: { include: { product: true } } },
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="py-5 text-secondaryColor relative xl:px-16 lg:px-20 2xl:px-32 3xl:px-48">
      <Header text="Meus pedidos" />
      <div className="bg-blur-purple absolute top-0 left-0 w-full min-h-screen z-[-1]"></div>
      <section className="px-8 flex flex-col md:grid md:grid-cols-2 gap-5 lg:gap-14 w-full mt-3 sm:mt-5">
        {orders.length === 0 ? (
          <h1 className="mt-2 text-lg xl:text-xl 2xl:text-2xl">
            Nenhuma compra foi realizada até o momento. Vamos as compras?
          </h1>
        ) : (
          orders.map((order) => (
            <OrderItem order={order} key={order.id} dataAosDelay={0} />
          ))
        )}
      </section>
    </main>
  );
};
export default OrdersPage;
