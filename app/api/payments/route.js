import { connectToDB } from "@/utils/db";
import Payment from "@/models/payment";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      await connectToDB();
      const payments = await Payment.find({});
      res.status(200).json(payments);
    } catch (err) {
      console.error("Error fetching payments:", err);
      res.status(500).json({ message: "Error fetching payments" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
