import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import Header from "../components/Header";
import { computeProductTotalPrice } from "@/helpers/product";
import ProductItem from "@/app/(shop)/_components/Product/ProductItem";
import { redirect } from "next/navigation";

const WishListPage = async () => {
  const session = await getServerSession(authOptions);

  const userFavorites = await prisma.favorite.findMany({
    where: { userId: session?.user.id },
    include: { product: true },
  });

  if (!session?.user) {
    return redirect("/api/auth/signin");
  }

  return (
    <main className="p-5 text-secondaryColor flex flex-col justify-center">
      <Header text="Lista de Desejos" />
      {userFavorites.length === 0 ? (
        <h1 className="mt-2">Nenhum produto em sua lista de desejos.</h1>
      ) : (
        <div className="flex flex-wrap gap-5 mt-5">
          {userFavorites.map((p) => (
            <ProductItem
              key={p.product.id}
              product={{
                ...p.product,
                totalPrice: computeProductTotalPrice(p.product),
                favorite: true,
              }}
              dataAosDelay={0}
              className="min-w-[10rem] max-w-[10rem]"
            />
          ))}
        </div>
      )}
    </main>
  );
};

export default WishListPage;
