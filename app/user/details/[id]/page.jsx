"use client";

import React, { use, useEffect, useState } from "react";
import Image from "next/image";
import { Input } from "@components/ui/input";
import { Button } from "@components/ui/button";
import { Label } from "@components/ui/label";
import LoadingScreen from "@components/loadingScreen";
import { useRouter } from "next/navigation";
import GenderDropdown from "@components/genderDropdown";

const UpdateProfile = ({ params }) => {
  const [userDetails, setUserDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const resolvedParams = use(params);
  const userId = resolvedParams.id;

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(`/api/user?id=${userId}`);
        const data = await response.json();
        setUserDetails(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    if (userId) {
      fetchUserDetails();
    }
  }, [userId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/user?id=${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userDetails),
      });

      if (response.ok) {
        alert("User details updated successfully!");
        router.push("/user/dashboard");
      } else {
        alert("Failed to update user details.");
      }
    } catch (error) {
      console.error("Error updating user details:", error);
    }
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div>
      <div className="h-[5rem] bg-slate-300 flex flex-row justify-around items-center">
        <Image
          src="/logo/logo.png"
          width={70}
          height={70}
          alt="logo"
          className="rounded-full"
        />
        <h1 className="text-2xl font-semibold">Update Profile</h1>
      </div>
      <form
        className="max-w-xl mx-auto p-4 space-y-4 mt-[5rem]"
        onSubmit={handleSubmit}
      >
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            name="name"
            value={userDetails.name || ""}
            onChange={handleInputChange}
            placeholder="Enter your name"
          />
        </div>

        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            value={userDetails.email || ""}
            onChange={handleInputChange}
            placeholder="Enter your email"
            disabled
          />
        </div>

        <div>
          <Label htmlFor="contactNo">Contact</Label>
          <Input
            id="contactNo"
            name="contactNo"
            value={userDetails.contactNo || ""}
            onChange={handleInputChange}
            placeholder="Enter your contact number"
          />
        </div>

        <div>
          <Label htmlFor="DOB">Date of Birth</Label>
          <Input
            id="DOB"
            name="DOB"
            type="date"
            value={userDetails.DOB || ""}
            onChange={handleInputChange}
          />
        </div>

        <GenderDropdown
          userDetails={userDetails}
          handleInputChange={handleInputChange}
        />

        <Button type="submit" className="w-full">
          Update Profile
        </Button>
      </form>
    </div>
  );
};

export default UpdateProfile;
