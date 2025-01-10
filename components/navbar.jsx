"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const { data: session } = useSession();
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      if (session?.user?.id) {
        try {
          console.log("Fetching data for user ID:", session.user.id);

          const res = await fetch(`/api/user?id=${session.user.id}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          });

          if (!res.ok) {
            throw new Error(`Error: ${res.status} ${res.statusText}`);
          }

          const data = await res.json();
          setUserData(data); // Save the fetched user data
        } catch (error) {
          setError("Error fetching user data");
          console.error(error); // Log error for debugging
        }
      }
    };

    fetchUserData();
  }, [session]);

  return (
    <div>
      {/* Desktop View */}
      <div className="hidden lg:flex flex-row justify-around items-center min-h-[5rem] bg-slate-300">
        {/* Logo */}
        <Link href="/dashboard">
          <Image
            src="/logo/logo.png"
            alt="gym_logo"
            width={70}
            height={70}
            className="rounded-full"
          />
        </Link>

        <div>Nav btns</div>

        {/* Profile */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="rounded-full outline-none">
              {userData?.image ? (
                <Image
                  src={userData.image}
                  alt="User Profile"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-gray-500 flex items-center justify-center text-white">
                  ?
                </div> // Placeholder avatar
              )}
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="w-[20rem]">
            <DropdownMenuLabel className="text-center mt-2">
              My Account
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="mt-3 mb-3" />
            <div className="flex items-center justify-center">
              {userData ? (
                <div className="flex flex-col justify-center items-center gap-4">
                  <Image
                    src={userData.image}
                    alt="User Profile"
                    width={80}
                    height={80}
                    className="rounded-full"
                  />
                  <div className="flex flex-col items-center gap-1">
                    <h2>{userData.name}</h2>
                    <h6 className="text-sm  font-normal">{userData.email}</h6>
                  </div>
                </div>
              ) : (
                <div className="w-10 h-10 rounded-full bg-gray-500 flex items-center justify-center text-white">
                  ?
                </div> // Placeholder avatar
              )}
            </div>
            <DropdownMenuSeparator className="mt-3 mb-3" />
            <DropdownMenuItem asChild className="cursor-pointer">
              <Link href="/profile">Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              disabled
              className="cursor-not-allowed opacity-50"
            >
              Billing
            </DropdownMenuItem>
            <DropdownMenuItem asChild className="cursor-pointer">
              <div onClick={signOut}>Log out</div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Mobile View */}
      <div className="lg:hidden">Mobile View</div>

      {/* Error Message */}
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default Navbar;
