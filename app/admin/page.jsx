'use client'

import React from "react";
import Image from "@node_modules/next/image";
import Link from "@node_modules/next/link";
import { useSession } from "@node_modules/next-auth/react";
import { useState, useEffect } from "react";

const page = () => {
  const { data: session, status } = useSession;
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <div className="h-screen w-full">
      <nav className="min-h-[5rem] bg-slate-300" />
      <div className="flex flex-col items-center min-h-full bg-slate-100">
        <h1 className="pt-[5rem] pb-[5rem] text-[6rem] h-[50%] flex items-center font-extrabold bg-gradient-to-br from-indigo-800 via-cyan-600 to-lime-500 bg-transparent text-transparent bg-clip-text">
          Welcome Admin
        </h1>
        <Image
          src="/logo/logo.png"
          width={500}
          height={500}
          alt="Logo"
          className="rounded-full "
        />
        <div className="min-h-[50vh] flex items-center justify-center">
          <Link
            href="/admin/dashboard"
            className="px-[5rem] py-[2rem] rounded-full bg-gradient-to-br from-sky-900 via-emerald-600 to-green-400 shadow-md shadow-slate-400"
          >
            <h1 className="text-white font-bold text-xl w-full h-full">
              Go To Dashboard
            </h1>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default page;
