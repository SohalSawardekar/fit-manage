"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@components/navbar";
import LoadingScreen from "@components/loadingScreen";

const Homepage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [session, router]);

  if (status === "loading") {
    return <LoadingScreen />;
  }

  return (
    <div>
      <div className="fixed top-0 left-0 w-full z-50 bg-white/60 backdrop-blur-md shadow-md">
        <Navbar />
      </div>
      <main className="mt-[5rem] w-full flex items-center">Dashboard</main>
    </div>
  );
};

export default Homepage;
