import { connectToDB } from "@utils/db";
import Blog from "@models/blogs";
import { NextResponse } from "@node_modules/next/server";

export async function GET(req) {
  try {
    // Connect to the database
    await connectToDB();

    // Fetch all blogs
    const blogs = await Blog.find();

    return NextResponse.json(
      {
        success: true,
        message: "Blogs fetched successfully",
        data: blogs,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in GET handler:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    // Parse the JSON body of the request
    const body = await req.json();

    // Destructure fields from the request body
    const { title, imageUrl, description, content, userId, tags } = body;

    // Validate required fields
    if (!title || !description || !userId) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing required fields",
          body: { body },
        },
        { status: 400 }
      );
    }

    // Connect to the database
    await connectToDB();

    // Create a new blog document
    const newBlog = new Blog({
      title,
      imageUrl,
      description,
      content,
      userId,
      tags,
    });

    // Save the blog to the database
    await newBlog.save();

    return NextResponse.json(
      {
        success: true,
        message: "Blog created successfully",
        data: newBlog,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in POST handler:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
        error: error.message, // Optional: Include error details in development
      },
      { status: 500 }
    );
  }
}
