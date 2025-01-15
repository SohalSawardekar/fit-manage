"use client";

import React from "react";
import { useRouter } from "@node_modules/next/navigation";
import { useEffect } from "react";

const page = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/admin/dashboard");
  }, [router]);
  return <div></div>;
};

export default page;
