import React from "react";
import Image from "@node_modules/next/image";
import Link from "@node_modules/next/link";

const Navbar = () => {
  return (
    <div className="w-full h-[5rem] bg-slate-300 flex flex-row justify-evenly items-center">
      <Link href="/admin/dashboard">
        <Image
          src="/logo/logo.png"
          alt="gym_logo"
          width={70}
          height={70}
          className="rounded-full"
        />
      </Link>
      <h1 className="font-bold text-slate-700 text-2xl">Admin Page</h1>
    </div>
  );
};

export default Navbar;
