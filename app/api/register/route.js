import { NextResponse } from "@node_modules/next/server"

export async function post(req) {
    try {
        const { email, password, role } = await req.json()

        return NextResponse.json({ message: "User created successfully" }, {status: 201})
    } catch (error) {
        return NextResponse.json({ message: "An error occured" }, {status: 500})
    }
}