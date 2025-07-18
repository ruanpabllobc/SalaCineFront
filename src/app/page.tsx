"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/filme");
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <>
      <Head>
        <title>SalaCine</title>
      </Head>

      <div
        className="fixed inset-0 flex items-center justify-center bg-[#171717]"
        style={{ zIndex: 9999 }}
      >
        <div className="flex items-center">
          <Link href="/">
            <Image
              src="/salaCine-2.svg"
              alt="Cinema Logo"
              width={86}
              height={134}
              className="mr-4"
            />
          </Link>
        </div>
      </div>
    </>
  );
}
