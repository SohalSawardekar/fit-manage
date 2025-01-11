"use client";

import Form from "./form";
import { useRouter } from "next/navigation";
import { useSession } from "@node_modules/next-auth/react";
import { useEffect } from "react";
import LoadingScreen from "@components/loadingScreen";

const Login = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (session && status === "authenticated") {
      if (session.user.role === "user") {
        router.push("/dashboard");
      } else {
        router.push("/admin");
      }
    }
  }, [status, router]);

  if (status === "loading") {
    return <LoadingScreen />;
  }

  if (status === "unauthenticated") {
    return <Form />;
  }

  return null;
};

export default Login;
