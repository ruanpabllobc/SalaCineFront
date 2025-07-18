"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 h-[114px] bg-white border-b border-[#EBEBEB] flex items-center justify-between px-8 z-50">
      <div className="flex items-center">
        <Link href="/">
          <Image
            src="/salaCine.svg"
            alt="Cinema Logo"
            width={45}
            height={66}
            className="mr-4"
          />
        </Link>
      </div>

      <div className="flex gap-[60px]">
        <Link
          href="/sessao"
          className={`relative pb-2 ${pathname === "/sessao" ? "border-b-2 border-[#181818]" : ""}`}
        >
          Sessão
        </Link>
        <Link
          href="/filme"
          className={`relative pb-2 ${pathname === "/filme" ? "border-b-2 border-[#181818]" : ""}`}
        >
          Filme
        </Link>
        <Link
          href="/sala"
          className={`relative pb-2 ${pathname === "/sala" ? "border-b-2 border-[#181818]" : ""}`}
        >
          Sala
        </Link>
      </div>

      <div className="w-[45px]"></div>
    </nav>
  );
}
