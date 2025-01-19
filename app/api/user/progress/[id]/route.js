import { connectToDB } from "@utils/db";
import Progress from "@models/progress"; // The model for exercise progress
import { NextResponse } from "next/server";

// GET request to fetch exercise progress data for a specific user
export async function GET(request, { params }) {
  try {
    const userId = params.userId;

    await connectToDB();

    const data = await Progress.find({ userId });

    if (data.length > 0) {
      return new NextResponse(JSON.stringify(data), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } else {
      return new NextResponse(JSON.stringify({ message: "No data found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }
  } catch (error) {
    console.error("Error fetching exercise data:", error);
    return new NextResponse(
      JSON.stringify({ message: "Internal Server Error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

// POST request to add a new exercise for a specific user
export async function POST(request, { params }) {
  try {
    const userId = params.userId;
    const exerciseData = await request.json();

    await connectToDB();

    const newProgress = new Progress({ userId, ...exerciseData });
    await newProgress.save();

    return new NextResponse(JSON.stringify(newProgress), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error adding exercise data:", error);
    return new NextResponse(
      JSON.stringify({ message: "Internal Server Error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
