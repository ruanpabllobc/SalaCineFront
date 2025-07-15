import type { Metadata } from "next";
import { Providers } from "./providers";
import { Roboto_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-roboto-mono",
});

export const metadata: Metadata = {
  title: "Cinema App",
  description: "Sistema de gerenciamento de cinema",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${robotoMono.variable}`}>
      <body>
        <Providers>
          <Navbar />
          <main className="pt-[140px] p-4">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
