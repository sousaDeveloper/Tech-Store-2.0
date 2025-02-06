"use client";
import "./globals.css";
import { Manrope } from "next/font/google";
import { AuthProvider } from "@/providers/auth";
import { Toaster } from "@/components/ui/sonner";
import Cart from "./_components/Cart/Cart";
import CartContextProvider from "@/providers/cart";
import LoadingProvider from "@/providers/loading";
import { useEffect } from "react";
import "aos/dist/aos.css";
import Aos from "aos";

const manrope = Manrope({ subsets: ["latin"], weight: "400" });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useEffect(() => {
    if (typeof window !== "undefined") {
      Aos.init();
    }

    const disableRightClick = (event: MouseEvent) => {
      event.preventDefault();
    };

    document.addEventListener("contextmenu", disableRightClick);
    return () => {
      document.removeEventListener("contextmenu", disableRightClick);
    };
  }, []);

  return (
    <html lang="en">
      <head>
        <title>Tech Store</title>
      </head>
      <body className={`antialiased bg-background ${manrope.className}`}>
        <LoadingProvider>
          <AuthProvider>
            <CartContextProvider>
              <Cart />
              {children}
            </CartContextProvider>
          </AuthProvider>
        </LoadingProvider>

        <Toaster />
      </body>
    </html>
  );
}
