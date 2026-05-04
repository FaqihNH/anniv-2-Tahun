import type { Metadata } from "next";
import { Fredoka, Baloo_2, Nunito, Poppins, Quicksand } from "next/font/google";
import "./globals.css";
import SplashCursor from "@/components/SplashCursor";
const fredoka = Fredoka({ subsets: ["latin"], variable: "--font-fredoka" });
const baloo = Baloo_2({ subsets: ["latin"], variable: "--font-baloo" });
const nunito = Nunito({ subsets: ["latin"], weight: "800", variable: "--font-nunito" });
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-poppins" });
const quicksand = Quicksand({ subsets: ["latin"], variable: "--font-quicksand" });

export const metadata: Metadata = {
  title: "My Favorite Person — 2 Years Edition.exe",
  description: "A magical digital gift made with love.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fredoka.variable} ${baloo.variable} ${nunito.variable} ${poppins.variable} ${quicksand.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col relative overflow-x-hidden">
        <SplashCursor />
        {children}
      </body>
    </html>
  );
}
