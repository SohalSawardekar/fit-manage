import connectToDB from "@/utils/db";
import Payment from "@/models/payment";

export default async function handler(req, res) {
  const { id } = req.query;
  if (req.method === "GET") {
    try {
      await connectToDB();
      const payment = await Payment.findById(id);
      if (!payment) {
        return res.status(404).json({ message: "Payment not found" });
      }
      res.status(200).json(payment);
    } catch (err) {
      console.error("Error fetching payment detail:", err);
      res.status(500).json({ message: "Error fetching payment detail" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
