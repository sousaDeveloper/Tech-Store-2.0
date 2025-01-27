"use client";

import { ProductWithTotalPrice } from "@/helpers/product";
import { HeartIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface FavoriteButtonProps {
  product: ProductWithTotalPrice;
}

const FavoriteButton = ({ product }: FavoriteButtonProps) => {
  const [favoriteItem, setFavoriteItem] = useState(product.favorite);
  const { status, data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session?.user?.favorites) {
      setFavoriteItem(session.user.favorites.includes(product.id));
    }
  }, [session, product.id]);

  const handleAddFavoriteClick = async () => {
    setFavoriteItem((prev) => !prev);

    if (status === "authenticated") {
      try {
        const response = await fetch(`/api/product/${product.id}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ favorite: !favoriteItem }),
          credentials: "include",
        });

        toast(
          ` ${
            !favoriteItem
              ? "Produto adicionado aos favoritos!"
              : "Produto removido dos favoritos."
          }`,
          {
            action: {
              label: "Minha lista",
              onClick: () => router.push("/wishlist"),
            },
          }
        );

        return response;
      } catch (error) {
        console.error("Erro ao atualizar o favorito:", error);
        setFavoriteItem((prev) => !prev);
      }
    } else {
      router.push("/api/auth/signin");
    }
  };

  return (
    <button className="z-10 rounded-lg p-1" onClick={handleAddFavoriteClick}>
      <HeartIcon
        size={30}
        className={`ml-auto ${
          favoriteItem ? "bg-primaryColor" : "bg-background"
        } rounded-lg p-1 text-gray-400`}
      />
    </button>
  );
};

export default FavoriteButton;
