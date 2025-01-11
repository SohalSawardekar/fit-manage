"use client";

import React, { useState } from "react";
import GoogleButton from "react-google-button";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function form() {
  const [loginType, setLoginType] = useState("user");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errMessage, setErrMessage] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isAdminPasswordVisible, setIsAdminPasswordVisible] = useState(false);
  const [isEmployeePasswordVisible, setIsEmployeePasswordVisible] =
    useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    signIn("credentials", {
      email: username,
      password: password,
      callbackUrl: "/dashboard",
      redirect: false,
    }).catch((error) =>
      setErrMessage("Login failed. Please check your credentials.")
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-[90%] max-w-2xl min-h-[70vh] bg-white shadow-lg rounded-[3rem] p-8">
        <h1 className="text-2xl font-bold text-center mb-6">Login</h1>

        {/* Dropdown to Select Login Type */}
        <div className="mb-8 text-center">
          <label htmlFor="loginType" className="text-lg font-semibold mr-4">
            Login As:
          </label>
          <select
            id="loginType"
            value={loginType}
            onChange={(e) => setLoginType(e.target.value)}
            className="p-2 border rounded-md focus:outline-blue-500"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        {/* User Login Form */}
        {loginType === "user" && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold pt-4 pb-4 flex justify-center w-full">
              User Login
            </h2>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-4 items-center"
            >
              <input
                type="text"
                placeholder="Username"
                className="w-3/4 p-3 border rounded-md focus:outline-blue-500"
                onChange={(e) => setUsername(e.target.value)}
              />
              <div className="relative w-3/4">
                <input
                  type={isPasswordVisible ? "text" : "password"}
                  placeholder="Password"
                  className="w-full p-3 border rounded-md focus:outline-blue-500"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                  className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-600 hover:text-gray-800"
                >
                  {isPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              <div className="pt-[1rem] w-full flex items-center justify-center">
                <button className="w-1/3 bg-green-600 text-white py-3 rounded-3xl hover:bg-green-700">
                  Login as User
                </button>
              </div>
            </form>
            <h1 className="text-[1.5rem] font-extrabold flex justify-center pt-[1rem]">
              OR
            </h1>
            <div className="text-center mt-4 w-full flex justify-center">
              <GoogleButton
                onClick={() => signIn("google")} // Trigger Google sign-in
              >
                Sign in with Google
              </GoogleButton>
            </div>
            <div className="flex pt-[3rem] flex-row items-center justify-center">
              <p>Don't have an account?</p>
              <Link href="/register" className="font-bold ml-1">
                Register
              </Link>
            </div>
          </div>
        )}

        {/* Admin Login Form */}
        {loginType === "admin" && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold pt-4 pb-4 flex justify-center w-full">
              Admin Login
            </h2>
            <form className="flex flex-col gap-4 items-center">
              <input
                type="text"
                placeholder="Username"
                className="w-3/4 p-3 border rounded-md focus:outline-blue-500"
                onChange={(e) => setUsername(e.target.value)}
              />
              <div className="relative w-3/4">
                <input
                  type={isAdminPasswordVisible ? "text" : "password"}
                  placeholder="Password"
                  className="w-full p-3 border rounded-md focus:outline-blue-500"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() =>
                    setIsAdminPasswordVisible(!isAdminPasswordVisible)
                  }
                  className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-600 hover:text-gray-800"
                >
                  {isAdminPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              <div className="pt-[1rem] w-full flex items-center justify-center">
                <button className="w-1/3 bg-blue-600 text-white py-3 rounded-3xl hover:bg-blue-700">
                  Login as Admin
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
