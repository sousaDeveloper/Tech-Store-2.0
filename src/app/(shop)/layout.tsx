"use client";
import "./globals.css";
import { Manrope } from "next/font/google";
import { AuthProvider } from "@/providers/auth";
import { Toaster } from "@/components/ui/sonner";
import Cart from "./_components/Cart/Cart";
import CartContextProvider from "@/providers/cart";
import LoadingProvider from "@/providers/loading";
import { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import { ReactLenis } from "lenis/react";

const manrope = Manrope({ subsets: ["latin"], weight: "400" });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    Aos.init();

    const disableRightClick = (event: MouseEvent) => event.preventDefault();
    document.addEventListener("contextmenu", disableRightClick);

    return () => {
      document.removeEventListener("contextmenu", disableRightClick);
    };
  }, []);

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>Tech Store</title>
        <meta
          name="description"
          content="Compre os melhores periféricos para seu setup gamer com preços incríveis e ofertas exclusivas."
        />
        <link rel="shortcut icon" href="/favicon.webp" type="image/x-icon" />
      </head>
      <ReactLenis root>
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
      </ReactLenis>
    </html>
  );
}
