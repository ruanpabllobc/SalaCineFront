"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 h-[114px] bg-white border-b border-[#EBEBEB] flex items-center justify-center z-50">
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
    </nav>
  );
}
