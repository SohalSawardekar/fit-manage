"use client";

import React, { useState, useEffect } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@components/ui/card";
import { Button } from "@components/ui/button";
import { useSession } from "next-auth/react";
import LoadingScreen from "@components/loadingScreen";
import "react-calendar/dist/Calendar.css";
import Link from "@node_modules/next/link";
import Image from "@node_modules/next/image";
import UpdateProfile from "@components/updateProfile";

const ProfilePage = () => {
  const { data: session, status } = useSession();
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      if (session?.user?.id) {
        try {
          const res = await fetch(`/api/user?id=${session.user.id}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          });

          if (!res.ok) {
            throw new Error(`Error: ${res.status} ${res.statusText}`);
          }

          const data = await res.json();
          setUserData(data);
        } catch (error) {
          setError("Error fetching user data");
          console.error(error);
        }
      }
    };

    fetchUserData();
  }, [session]);

  if (status === "loading") {
    return <LoadingScreen />;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!userData) {
    return <div></div>;
  }

  return (
    <div>
      {/* Desktop View */}
      <div className="w-full min-h-[5rem] bg-slate-300 flex flex-row items-center justify-around">
        <Link href="/user/dashboard">
          <Image
            src="/logo/logo.png"
            width={70}
            height={70}
            alt="logo"
            className="rounded-full"
          />
        </Link>
        <div />
        <div />
      </div>
      <div className="hidden md:flex justify-start items-center min-h-screen bg-slate-50 p-6 flex-col">
        <Card className="max-w-3xl w-full max-h-lvh min-h-[80vh] shadow-sm border-dotted border-slate-500 bg-slate-300">
          <CardHeader className="flex flex-col items-center pb-0 mt-8">
            <Avatar className="h-24 w-24 mb-4">
              {userData.image ? (
                <AvatarImage
                  src={userData.image}
                  alt={`${userData.name}'s profile`}
                />
              ) : (
                <AvatarFallback>
                  {userData.name ? userData.name[0] : "U"}
                </AvatarFallback>
              )}
            </Avatar>
            <CardTitle className="text-2xl font-bold">
              {userData.name}
            </CardTitle>
            <CardDescription className="text-gray-700 font-semibold">
              {userData.role === "user" ? "Member" : ""}
            </CardDescription>
          </CardHeader>

          <CardContent className="p-4">
            <div className="space-y-5 ml-10 mt-8">
              <p className="text-sm text-gray-600">
                <strong>Email:</strong> {userData.email}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Age:</strong> {userData.age || "N/A"}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Date of Birth:</strong>{" "}
                {new Date(userData.DOB).toLocaleDateString("en-GB") || "N/A"}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Gender:</strong> {userData.gender || "N/A"}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Contact No:</strong> {userData.contactNo || "N/A"}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Date Joined:</strong>{" "}
                {userData.dateJoined
                  ? new Date(userData.dateJoined).toLocaleDateString("en-GB")
                  : "N/A"}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Fee due date:</strong>{" "}
                {userData.dateJoined
                  ? new Date(userData.dateJoined).toLocaleDateString("en-GB")
                  : "N/A"}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Membership Fees:</strong>{" "}
                {userData.paid ? (
                  <span className="text-green-600 font-bold">Paid</span>
                ) : (
                  <span className="text-red-500 font-bold">Not Paid</span>
                )}
              </p>
            </div>
          </CardContent>
          <div className="p-4 flex justify-end mr-6 items-end gap-1">
            <Button
              variant="outline"
              className="bg-slate-700 text-white font-semibold hover:bg-white "
            >
              <Link href="/user/dashboard">Dashboard</Link>
            </Button>
            <UpdateProfile userData={userData} onUpdate={setUserData} />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ProfilePage;
