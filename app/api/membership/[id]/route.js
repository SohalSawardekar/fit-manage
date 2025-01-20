import Membership from "@models/membershipData";
import { connectToDB } from "@utils/db";
import { NextResponse } from "next/server";

export async function handler(req, { params }) {
  const { method } = req;
  const { id } = params;

  await connectToDB();

  switch (method) {
    case "GET":
      try {
        const membership = await Membership.findOne({ userId: id }).populate(
          "userId"
        );

        if (!membership) {
          return NextResponse.json({}, { status: 200 });
        }

        return NextResponse.json(membership, { status: 200 });
      } catch (error) {
        return NextResponse.json(
          {
            message: "Error retrieving membership data",
            error: error.message,
          },
          { status: 500 }
        );
      }
      break;

    case "POST":
      try {
        const membership = new Membership(req.body);
        await membership.save();
        return NextResponse.json(membership, { status: 201 });
      } catch (error) {
        return NextResponse.json(
          {
            message: "Error saving membership data",
            error: error.message,
          },
          { status: 500 }
        );
      }
      break;

    default:
      return NextResponse.json(
        { message: "Method not allowed" },
        { status: 405 }
      );
  }
}
