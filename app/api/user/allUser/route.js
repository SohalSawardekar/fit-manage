import { connectToDB } from "@utils/db";
import User from "@models/users";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await connectToDB();

    const user = await User.find();

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
