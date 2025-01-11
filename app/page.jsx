"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import LandingPage from "@components/landingPage";
import LoadingScreen from "@components/loadingScreen";
import { useState, useEffect } from "react";

const Page = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/dashboard");
    }
  }, [status, router]);

  if (!isClient) {
    return null;
  }

  if (status === "loading") {
    return <LoadingScreen />;
  }

  if (status === "unauthenticated") {
    return <LandingPage />;
  }

  return null;
};

export default Page;
