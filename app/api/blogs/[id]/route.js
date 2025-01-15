// app/api/blogs/[id]/route.js
import { NextResponse } from "next/server";
import { connectToDB } from "@utils/db";
import Blog from "@models/blogs";

export async function GET(request, { params }) {
  try {
    await connectToDB();

    // No need to await params in Next.js route handlers - it's already resolved
    const id = (await params).id;

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Blog ID is required" },
        { status: 400 }
      );
    }

    const blog = await Blog.findById(id);

    if (!blog) {
      return NextResponse.json(
        { success: false, message: "Blog not found" },
        { status: 404 }
      );
    }

    // Keep response format consistent
    return NextResponse.json({ success: true, data: blog }, { status: 200 });
  } catch (error) {
    console.error("Error fetching blog:", error);

    // Handle specific MongoDB errors
    if (error.name === "CastError") {
      return NextResponse.json(
        { success: false, message: "Invalid blog ID format" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
