"use client";

import React, { useState, useEffect } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useSession } from "next-auth/react";
import LoadingScreen from "@components/loadingScreen";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@radix-ui/react-popover";
import { FaCalendarAlt } from "react-icons/fa";
import { format } from "date-fns";
import { Calendar } from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Link from "@node_modules/next/link";

const UpdateProfile = ({ userData, onUpdate }) => {
  const [editData, setEditData] = useState(userData);
  const [isEditing, setIsEditing] = useState(false);

  const [date, setDate] = useState(
    userData?.DOB ? new Date(userData.DOB) : null
  );

  const handleDateSelect = (selectedDate) => {
    setDate(selectedDate);
    setEditData((prev) => ({
      ...prev,
      DOB: selectedDate.toISOString(),
    }));
  };

  const handleSave = async () => {
    try {
      const payload = {
        ...editData,
        id: userData?.id, // Include the user ID in the body
      };

      const res = await fetch(`/api/user`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error(`Error: ${res.status} ${res.statusText}`);
      }

      const updatedUser = await res.json();
      onUpdate(updatedUser); // Update parent state with new user data
      setIsEditing(false); // Exit edit mode
    } catch (error) {
      console.error("Error updating profile", error);
    }
  };

  return (
    <Dialog className="">
      <DialogTrigger asChild>
        {/* Use `asChild` to avoid rendering an extra <button> */}
        <Button
          variant="outline"
          onClick={() => setIsEditing(true)}
          className="font-semibold text-white bg-slate-700 border-dotted border-slate-500"
        >
          Edit Profile
        </Button>
      </DialogTrigger>
      {isEditing && (
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {/* Name */}
            <div className="flex flex-row justify-center items-center gap-2">
              <label htmlFor="Name">Name</label>
              <Input
                label="Name"
                value={editData?.name || ""}
                onChange={(e) =>
                  setEditData((prev) => ({
                    ...prev,
                    name: e.target.value,
                  }))
                }
              />
            </div>

            {/* Email */}
            <div className="flex flex-row justify-center items-center gap-2">
              <label htmlFor="Email">Email</label>
              <Input
                label="Email"
                value={editData?.email || ""}
                onChange={(e) =>
                  setEditData((prev) => ({
                    ...prev,
                    email: e.target.value,
                  }))
                }
              />
            </div>

            {/* Gender */}
            <div className="flex flex-row justify-center items-center gap-2">
              <label htmlFor="gender">Gender</label>
              <Select
                id="gender"
                value={editData?.gender || ""}
                onValueChange={(value) =>
                  setEditData((prev) => ({
                    ...prev,
                    gender: value,
                  }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Date of Birth */}
            <div className="flex flex-row justify-start items-center gap-2">
              <label htmlFor="dob">Date of Birth</label>
              <Popover>
                <PopoverTrigger asChild>
                  <button className="w-[280px] justify-start text-left font-normal border rounded px-4 py-2 flex items-center gap-2">
                    <FaCalendarAlt className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    onChange={handleDateSelect}
                    value={date}
                    calendarType="iso8601"
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Contact */}
            <div className="flex flex-row justify-center items-center gap-2">
              <label htmlFor="Name">Contact</label>
              <Input
                label="Contact No"
                value={editData?.contactNo || ""}
                onChange={(e) =>
                  setEditData((prev) => ({
                    ...prev,
                    contactNo: e.target.value,
                  }))
                }
              />
            </div>
          </div>
          <div className="mt-6 flex justify-end">
            <Button onClick={handleSave}>Save</Button>
          </div>
        </DialogContent>
      )}
    </Dialog>
  );
};

// ProfilePage Component
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
      <div className="hidden md:flex justify-center items-center min-h-screen bg-slate-100 p-6">
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
              <Link href="/dashboard">Dashboard</Link>
            </Button>
            <UpdateProfile userData={userData} onUpdate={setUserData} />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ProfilePage;
