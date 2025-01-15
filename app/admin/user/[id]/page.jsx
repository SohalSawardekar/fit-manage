"use client";

import React, { useEffect, useState, use } from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@components/ui/card";
import { Badge } from "@components/ui/badge";
import LoadingScreen from "@components/loadingScreen";
import Navbar from "@components/admin/navbar";
import Avatar from "react-avatar";

const UserDetailsPage = ({ params }) => {
  const resolvedParams = use(params);
  const id = resolvedParams.id;
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        try {
          const response = await fetch(`/api/user?id=${id}`);
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          const userData = await response.json();
          setUser(userData);
          console.log(userData);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };

      fetchData();
    }
  }, [id]);

  if (!user) {
    return <LoadingScreen />;
  }

  return (
    <div>
      <Navbar />
      <div className="p-6">
        <h1 className="text-3xl font-semibold mb-6">User Details</h1>
        <Card className="shadow-lg max-w-md mx-auto">
          <CardHeader>
            <div className="flex items-center space-x-4">
              <Avatar
                name={user.name}
                src={user.image} 
                size="50"
                round={true}
                className="object-cover"
              />
              <div>
                <CardTitle className="text-xl font-medium">
                  {user.name}
                </CardTitle>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="mt-4">
              <p className="text-lg font-medium">Payment Status:</p>
              <p
                className={`text-lg font-semibold ${
                  user.isPaid ? "text-green-500" : "text-red-500"
                }`}
              >
                {user.isPaid ? "Paid" : "Not Paid"}
              </p>
            </div>

            <div className="mt-4">
              <p className="text-lg font-medium">Contact no:</p>
              <p className="text-sm text-gray-600">{user.contactNo}</p>
            </div>

            <div className="mt-4">
              <p className="text-lg font-medium">Age:</p>
              <p className="text-sm text-gray-600">{user.age}</p>
            </div>

            {/* Additional user details */}
            <div className="mt-4">
              <p className="text-lg font-medium">Joined On:</p>
              <p className="text-sm text-gray-600">
                {new Date(user.dateJoined).toLocaleDateString()}
              </p>
            </div>
            <div className="mt-4">
              <p className="text-lg font-medium">Due Date:</p>
              <p className="text-sm text-gray-600">
                {new Date(user.dueDate).toLocaleDateString()}
              </p>
            </div>

            {/* User's Role */}
            <div className="mt-4">
              <p className="text-lg font-medium">Role:</p>
              <Badge
                className={`text-sm ${
                  user.role === "admin" ? "bg-blue-500" : "bg-gray-500"
                }`}
              >
                {user.role}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserDetailsPage;
