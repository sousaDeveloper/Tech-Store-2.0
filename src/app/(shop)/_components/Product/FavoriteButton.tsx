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
  const [isLoading, setIsLoading] = useState(false);
  const { status, data: session } = useSession();
  const router = useRouter();

  const handleAddFavoriteClick = async () => {
    if (status === "authenticated" && !isLoading) {
      setIsLoading(true);
      toast(
        `${
          !favoriteItem
            ? "Produto adicionado à Lista de Desejos!"
            : "Produto removido da Lista de Desejos!"
        }`,
        {
          action: {
            label: "Ver Lista",
            onClick: () => router.push("/user-profile/wishlist"),
          },
        }
      );

      const newFavoriteStatus = !favoriteItem;
      setFavoriteItem(newFavoriteStatus);

      try {
        await fetch(`/api/product/${product.id}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ favorite: newFavoriteStatus }),
          credentials: "include",
        });
      } catch (error) {
        console.error("Erro ao atualizar o favorito:", error);
        setFavoriteItem((prev) => !prev);
        toast.error("Erro ao atualizar o favorito.");
      } finally {
        setIsLoading(false);
      }
    } else if (status !== "authenticated") {
      router.push("/api/auth/signin");
    }
  };

  useEffect(() => {
    if (session?.user?.favorites) {
      setFavoriteItem(session.user.favorites.includes(product.id));
    }
  }, [session, product.id]);

  return (
    <button
      className="z-10 rounded-lg p-1"
      onClick={handleAddFavoriteClick}
      disabled={isLoading}
      data-aos="zoom-in"
      data-aos-delay="300"
      aria-label={
        favoriteItem
          ? "Remover produto da lista de desejos"
          : "Adicionar produto à lista de desejos"
      }
    >
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
