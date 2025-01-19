import { connectToDB } from "@utils/db";
import UserData from "@models/gymData";
import { NextResponse } from "next/server";

// GET request to fetch gym data for a specific user
export async function GET(request, { params }) {
  try {
    const userId = (await params).id;

    if (!userId) {
      return new NextResponse(
        JSON.stringify({ message: "User ID is required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    await connectToDB();

    const data = await UserData.findOne({ userId });

    if (data) {
      return new NextResponse(JSON.stringify(data), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } else {
      return new NextResponse(
        JSON.stringify({ message: "No data found for this user" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }
  } catch (error) {
    console.error("Error in GET request:", error);
    return new NextResponse(
      JSON.stringify({ message: "Internal Server Error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

// POST request to create new gym data for a specific user
export async function POST(request, { params }) {
  try {
    const userId = (await params).id;

    if (!userId) {
      return new NextResponse(
        JSON.stringify({ message: "User ID is required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    await connectToDB();

    const requestData = await request.json();
    if (!requestData || Object.keys(requestData).length === 0) {
      return new NextResponse(
        JSON.stringify({ message: "Request body cannot be empty" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const existingData = await UserData.findOne({ userId });

    if (existingData) {
      return new NextResponse(
        JSON.stringify({ message: "Data for this user already exists" }),
        { status: 409, headers: { "Content-Type": "application/json" } }
      );
    }

    const newData = new UserData({ userId, ...requestData });
    await newData.save();

    return new NextResponse(JSON.stringify(newData), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in POST request:", error);
    return new NextResponse(
      JSON.stringify({ message: "Internal Server Error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

// PUT request to update gym data for a specific user
export async function PUT(request, { params }) {
  try {
    const userId = (await params).id;

    if (!userId) {
      return new NextResponse(
        JSON.stringify({ message: "User ID is required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    await connectToDB();

    const requestData = await request.json();
    if (!requestData || Object.keys(requestData).length === 0) {
      return new NextResponse(
        JSON.stringify({ message: "Request body cannot be empty" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const updatedData = await UserData.findOneAndUpdate(
      { userId },
      { $set: requestData },
      { new: true, runValidators: true }
    );

    if (!updatedData) {
      return new NextResponse(
        JSON.stringify({ message: "Data not found for the user" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    return new NextResponse(JSON.stringify(updatedData), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in PUT request:", error);
    return new NextResponse(
      JSON.stringify({ message: "Internal Server Error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

// DELETE request to remove gym data for a specific user
export async function DELETE(request, { params }) {
  try {
    const userId = (await params).id;

    if (!userId) {
      return new NextResponse(
        JSON.stringify({ message: "User ID is required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    await connectToDB();

    const deletedData = await UserData.findOneAndDelete({ userId });

    if (!deletedData) {
      return new NextResponse(
        JSON.stringify({ message: "Data not found for the user" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    return new NextResponse(
      JSON.stringify({ message: "User data deleted successfully" }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error in DELETE request:", error);
    return new NextResponse(
      JSON.stringify({ message: "Internal Server Error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
