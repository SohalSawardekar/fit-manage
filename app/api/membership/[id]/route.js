import Membership from "@models/membershipData"; // MongoDB model for Membership
import { connectToDB } from "@utils/db";

export default async function handler(req, res) {
  const { method } = req;
  const { id } = req.query; // Extract userId from URL

  await connectToDB(); // Connect to the database

  switch (method) {
    case "GET":
      try {
        const membership = await Membership.findOne({ userId: id }).populate(
          "userId"
        );

        if (!membership) {
          // If no membership data found, return an empty object
          return res.status(200).json({});
        }

        res.status(200).json(membership);
      } catch (error) {
        res.status(500).json({
          message: "Error retrieving membership data",
          error: error.message,
        });
      }
      break;

    case "POST":
      // Handle POST request for creating/updating membership data
      try {
        const membership = new Membership(req.body);
        await membership.save();
        res.status(201).json(membership);
      } catch (error) {
        res.status(500).json({
          message: "Error saving membership data",
          error: error.message,
        });
      }
      break;

    default:
      res.status(405).json({ message: "Method not allowed" });
      break;
  }
}
