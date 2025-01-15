import React from "react";
import Image from "@node_modules/next/image";
import Link from "@node_modules/next/link";
import { Button } from "@components/ui/button";
import { signOut } from "@node_modules/next-auth/react";

const Navbar = () => {
  return (
    <div className="w-full h-[5rem] bg-slate-300 flex flex-row justify-around items-center">
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

      <Button className="bg-slate-600" onClick={signOut}>
        Log Out
      </Button>
    </div>
  );
};

export default Navbar;
