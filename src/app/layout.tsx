import type { Metadata } from "next";
import "./globals.css";
import { Manrope } from "next/font/google";
import { AuthProvider } from "@/providers/auth";
import { Toaster } from "@/components/ui/toaster";
import CartContextProvider from "@/providers/Cart";

const manrope = Manrope({ subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: "Tech Store",
  description: "Compre já os periféricos do seu sonho!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased bg-background ${manrope.className}`}>
        <AuthProvider>
          <CartContextProvider>{children}</CartContextProvider>
        </AuthProvider>
        <Toaster />
      </body>
    </html>
  );
}
