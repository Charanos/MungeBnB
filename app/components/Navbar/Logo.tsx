"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

const Logo = () => {
  const router = useRouter();

  return (
    <div className="flex flex-row items-center justify-center">
      <Image
        alt="logo"
        width="80"
        height="100"
        src="/images/logo.svg"
        onClick={() => router.push("/")}
        className="hidden md:block cursor-pointer  "
      />
      <p className="hidden font-bold md:block">MungeBnB</p>
    </div>
  );
};

export default Logo;
