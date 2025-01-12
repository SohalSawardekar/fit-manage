"use client";

import React, { useState } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@radix-ui/react-popover";
import { FaCalendarAlt } from "react-icons/fa";
import { format } from "date-fns";
import { Calendar } from "react-calendar";
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
import { Button } from "@/components/ui/button";
import "react-calendar/dist/Calendar.css";

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

export default UpdateProfile;
