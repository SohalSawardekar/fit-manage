"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Navbar from "@components/admin/navbar.jsx";
import LoadingScreen from "@components/loadingScreen";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Avatar from "react-avatar";

const AdminDashboard = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch users data (Replace with your actual API)
  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch(`/api/user/allUser`); // API endpoint for fetching users
      const data = await response.json();
      setUsers(data);
      console.log({ data });
      setIsLoading(false); // Set loading to false after fetching data
    };

    if (status === "authenticated") {
      fetchUsers();
    }
  }, [status]);

  // Redirect unauthenticated users
  useEffect(() => {
    if (status === "loading") return;
    if (status === "unauthenticated") {
      router.push("/admin/dashboard"); // Redirect to homepage if unauthenticated
    }
  }, [status, router]);

  if (status === "loading" || isLoading) {
    return <LoadingScreen />; // Show loading screen while session or data is loading
  }

  return (
    <div>
      <Navbar />
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
        {Array.isArray(users) && users.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {users.map((user, index) => (
              <Card
                key={index} // Use a unique key (e.g., user.id)
                className="hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => router.push(`/admin/user/${user?._id}`)}
              >
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    {/* Use react-avatar component */}
                    <Avatar
                      name={user.name}
                      src={user.image} // Optional: use avatar URL if available
                      size="50" // Adjust size as needed
                      round={true} // Makes the avatar circular
                      className="object-cover"
                    />
                    <CardTitle>{user.name}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-row">
                    <p className="font-semibold mr-1">Email:</p> {user.email}
                  </div>
                  <p
                    className={`text-lg font-medium ${
                      user.isPaid ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {user.isPaid ? "Paid" : "Not Paid"}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <p>No users found</p>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
