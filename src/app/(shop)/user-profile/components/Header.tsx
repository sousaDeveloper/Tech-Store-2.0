"use client";

import Separator from "@/app/(shop)/_components/Separator";
import { LoadingContext } from "@/providers/loading";
import { ChevronLeft, Loader2Icon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useContext } from "react";

interface HeaderProps {
  text: string;
  className: string;
}

const Header = ({ text, className }: HeaderProps) => {
  const router = useRouter();
  const { handleLoadingClick, isLoading } = useContext(LoadingContext);
  const pathname = usePathname();

  const handleRouterBackClick = () => {
    handleLoadingClick(true);
    router.back();
  };

  return (
    <>
      <div className="flex items-center text-center mb-2">
        <button onClick={handleRouterBackClick}>
          <ChevronLeft size={40} className="cursor-pointer" />
        </button>
        <h1 className={`text-2xl ${className}`} data-aos="fade-down">
          {text}
        </h1>
        {isLoading && (
          <Loader2Icon
            className={`animate-spin ml-16 ${
              pathname === "/user-profile/wishlist" && "flex-none hidden"
            }`}
          />
        )}
      </div>
      <Separator />
    </>
  );
};

export default Header;
