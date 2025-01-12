"use client";

import { useRouter } from "@node_modules/next/navigation";
import { useEffect } from "react";

const page = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/user/dashboard");
  });
};

export default page;
