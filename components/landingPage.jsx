"use client";

import React from "react";
import Image from "@node_modules/next/image";
import Link from "@node_modules/next/link";

const landingPage = () => {
  return (
    <div>
      <main className="h-screen text-gray-700 ">
        {/* Nav component */}
        <nav className="fixed w-full z-30">
          {/* Desktop view */}
          <div className="hidden lg:flex flex-row justify-around items-center h-20 bg-gradient-to-b from-slate-300 to-gray-200">
            <Image
              src="/logo/logo.png"
              alt="gym_logo"
              width={70}
              height={70}
              className="rounded-full"
            />

            <div className="flex flex-row gap-x-4 px-auto bg-gray-400 rounded-3xl font-bold" />

            <Link
              href="/login"
              className="bg-gradient-to-br from-blue-900 via-sky-700 to-cyan-600 p-4 rounded-3xl text-white font-bold"
            >
              Join Today
            </Link>
          </div>

          {/*Mobile view*/}
          <div className="lg:hidden">Mobile view</div>
        </nav>

        {/* Main Content */}
        <div className="w-full pt-20">
          <div className="w-full flex flex-col items-center justify-center pt-[5rem] text-[4rem] font-extrabold bg-gradient-to-br from-blue-950 via-cyan-600 to-slate-500 bg-transparent text-transparent bg-clip-text">
            <h1>Sweat Now,</h1>
            <h1>Shine Later </h1>
          </div>

          <div className="relative flex items-center justify-center pt-[5rem]">
            {/* Image */}
            <Image
              src="/images/gymImage.jpeg"
              width={700}
              height={700}
              alt="Gym Image"
              className="rounded-3xl blur-[2px]"
            />

            {/* Overlayed Text */}
            <h1 className="absolute font-extrabold flex flex-col justify-center items-center text-[6rem] text-white">
              <p>One</p>
              <p>more</p>
              <p>rep</p>
            </h1>
          </div>

          <div className="h-screen flex flex-col items-center justify-start pt-[6rem]">
            <div className="font-extrabold flex flex-col items-center text-[2.5rem]">
              <h1>Fitness is a journey,</h1>
              <h1>not a destination.</h1>
            </div>
            <p className="flex items-center justify-center w-1/2 pt-[2rem]">
              Fitness is a journey, not a destination" emphasizes that fitness
              is an ongoing process rather than a final goal. It’s about
              consistently making healthier choices, embracing progress, and
              building habits that sustain a lifetime of well-being. Setbacks
              are part of the journey, but resilience and determination keep you
              moving forward. By focusing on growth and enjoying the process,
              fitness becomes a fulfilling and sustainable way of life.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default landingPage;
