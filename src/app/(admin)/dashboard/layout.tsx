"use client";
import { Manrope } from "next/font/google";
import { AuthProvider } from "@/providers/auth";
import { Toaster } from "@/components/ui/sonner";
import LoadingProvider from "@/providers/loading";
import Script from "next/script";
import { useEffect } from "react";
import Aos from "aos";

const manrope = Manrope({ subsets: ["latin"], weight: "400" });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useEffect(() => {
    if (typeof window !== "undefined") {
      setTimeout(() => {
        Aos.init();
      }, 100);
    }
  }, []);
  return (
    <html lang="en">
      <head>
        <link
          href="https://unpkg.com/aos@2.3.1/dist/aos.css"
          rel="stylesheet"
        />
        <Script src="https://unpkg.com/aos@2.3.1/dist/aos.js" defer></Script>
        <title>Tech Store</title>
      </head>
      <body className={`antialiased bg-background ${manrope.className}`}>
        <LoadingProvider>
          <AuthProvider>{children}</AuthProvider>
        </LoadingProvider>

        <Toaster />
        <script>AOS.init()</script>
      </body>
    </html>
  );
}
