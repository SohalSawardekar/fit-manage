import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "@models/users";
import { connectToDB } from "@utils/db";

export async function POST(req) {
  try {
    // Parse incoming data
    const { username, email, password, role } = await req.json();

    // Validate required fields
    if (!username || !email || !password || !role) {
      return NextResponse.json(
        { message: "All fields (username, email, password, role) are required" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    
    await connectToDB();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "Email is already registered" },
        { status: 409 } 
      );
    }

    // Create new user
    const newUser = await User.create({
      name: username,
      email: email,
      password: hashedPassword,
      role: role,
      image: '',
      age: -1,
      gender: 'male', 
      contactNo: '', 
      loginType: 'Password',
      dateJoined: new Date(),
      lastLoggedIn: new Date(),
    });

    // Return success response
    return NextResponse.json({ message: "User created successfully" }, { status: 201 });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json({ message: "An error occurred" }, { status: 500 });
  }
}
