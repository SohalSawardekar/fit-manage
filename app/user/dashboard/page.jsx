"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@components/navbar";
import LoadingScreen from "@components/loadingScreen";

const page = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  // useEffect(() => {
  //   if (status === "unauthenticated") {
  //     router.push("/");
  //   }
  // }, [session, router]);

  if (status === "loading") {
    return <LoadingScreen />;
  }

  return (
    <div>
      <div className="fixed top-0 left-0 w-full z-50 bg-slate-50 backdrop-blur-md shadow-md">
        <Navbar />
      </div>
      <main className="mt-[5rem] w-full flex justify-center">
        {/* Desktop View */}
        <div className="mt-[2rem] w-full h-screen flex flex-col justify-start items-center">
          <div className="flex flex-col w-[60%] h-[80%] bg-slate-200 justify-start items-center rounded-3xl">
            <h1 className="mt-5 text-[5rem] z-10 font-semibold bg-gradient-to-br from-blue-700 via-cyan-600 to-green-500 bg-transparent text-transparent bg-clip-text">
              Diet Plan
            </h1>
          </div>
          {/* <div>Workout</div>
          <div>Calories burnt</div> */}
        </div>
      </main>
    </div>
  );
};

export default page;
