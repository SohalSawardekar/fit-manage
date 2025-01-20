import { connectToDB } from "@utils/db";
import mongoose from "mongoose";
import User from "@models/users";
import { NextResponse } from "next/server";

/**
 * GET endpoint:
 * - Expects query param `?id=<userId>`
 */
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("id");

    if (!userId) {
      return new NextResponse(
        JSON.stringify({ message: "User ID is required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    await connectToDB();

    const user = await User.findById(userId);

    if (user) {
      return new NextResponse(JSON.stringify(user), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } else {
      return new NextResponse(JSON.stringify({ message: "User not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }
  } catch (error) {
    console.error("Error in GET user:", error);
    return new NextResponse(
      JSON.stringify({ message: "Internal Server Error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

/**
 * POST endpoint:
 * - Creates a new user document
 * - Expects the user data in the request body (JSON)
 */
export async function POST(req) {
  try {
    // Parse the request body
    const userData = await req.json();

    // Validate required fields, for example "email" or "name"
    // (Remove or expand based on your app's requirements)
    if (!userData.email || !userData.name) {
      return NextResponse.json(
        { message: "Email and name are required" },
        { status: 400 }
      );
    }

    await connectToDB();

    // Optionally calculate age if DOB is provided
    if (userData.DOB) {
      const dob = new Date(userData.DOB);
      userData.age = new Date().getFullYear() - dob.getFullYear();
    }

    // Create a new user in the database
    const newUser = await User.create(userData);

    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { message: "An error occurred while creating user" },
      { status: 500 }
    );
  }
}

/**
 * PUT endpoint:
 * - Updates an existing user document
 * - Expects the updated fields in the request body (JSON)
 * - The user ID is part of the request body: _id
 */
export async function PUT(req) {
  try {
    // Parse the request body for the data to update
    const updatedData = await req.json();
    const userId = updatedData._id; // Extract userId directly

    // Ensure userId is provided
    if (!userId) {
      return NextResponse.json(
        { message: "User ID is required" },
        { status: 400 }
      );
    }

    // Validate the userId to ensure it's a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return NextResponse.json({ message: "Invalid User ID" }, { status: 400 });
    }

    // Automatically calculate the age if DOB is provided
    if (updatedData.DOB) {
      const dob = new Date(updatedData.DOB);
      updatedData.age = new Date().getFullYear() - dob.getFullYear();
    }

    // Connect to the database
    await connectToDB();

    // Filter out null or undefined fields from the update object
    const filteredData = Object.fromEntries(
      Object.entries(updatedData).filter(
        ([key, value]) => key !== "_id" && value != null
      )
    );

    // Update the user data
    const result = await User.findByIdAndUpdate(
      userId,
      { $set: filteredData },
      { new: true } // Return the updated document
    );

    if (!result) {
      return NextResponse.json(
        { message: "User not found or no updates made" },
        { status: 404 }
      );
    }

    console.log(`User data updated successfully: ${userId}`);
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("Error updating user data:", error);
    return NextResponse.json(
      { message: "An error occurred while updating user data" },
      { status: 500 }
    );
  }
}
