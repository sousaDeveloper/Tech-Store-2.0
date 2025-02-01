"use client";

import Separator from "@/app/(shop)/_components/Separator";
import { LoadingContext } from "@/providers/loading";
import { ChevronLeft, Loader2Icon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useContext } from "react";

interface HeaderProps {
  text: string;
}

const Header = ({ text }: HeaderProps) => {
  const router = useRouter();
  const { handleLoadingClick, isLoading } = useContext(LoadingContext);
  const pathname = usePathname();

  const handleRouterBackClick = () => {
    handleLoadingClick(true);
    router.back();
  };

  return (
    <>
      <div className="flex justify-center items-center w-full relative mb-3 xl:mb-0">
        <button onClick={handleRouterBackClick} className="absolute left-4">
          <ChevronLeft size={40} className="cursor-pointer" />
        </button>
        <h1
          className="text-2xl sm:text-3xl text-center flex-1 w-[15rem] max-w-[15rem]"
          data-aos="fade-down"
        >
          {text}
        </h1>
        {isLoading && (
          <Loader2Icon
            className={`animate-spin ${
              pathname === "/user-profile/wishlist" && "flex-none hidden"
            }`}
            size={36}
          />
        )}
      </div>
      <Separator />
    </>
  );
};

export default Header;
