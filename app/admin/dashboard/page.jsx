"use client";

import LoadingScreen from "@components/loadingScreen";
import Navbar from "@components/navbar";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const AdminDashboard = () => {
  const { data: session, status } = useSession();
  const router = useRouter(); // Corrected useRouter()

  useEffect(() => {
    if (status === "loading") return;
    if (status === "unauthenticated") {
      router.push("/"); // Redirect to homepage if unauthenticated
    }
  }, [status, router]);

  if (status === "loading") {
    return <LoadingScreen />; // Show loading screen while session is loading
  }

  return (
    <div>
      <Navbar />
      Admin Dashboard
    </div>
  );
};

export default AdminDashboard;
