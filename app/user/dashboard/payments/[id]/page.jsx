"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation"; // or useRouter in older Next
import { Card, CardHeader, CardTitle, CardContent } from "@components/ui/card";
import { Button } from "@components/ui/button";

export default function PaymentDetailPage() {
  const [payment, setPayment] = useState(null);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const router = useRouter();
  const paymentId = params.id; // from the dynamic route

  useEffect(() => {
    const fetchPayment = async () => {
      try {
        const res = await fetch(`/api/payments/${paymentId}`);
        // Adjust your endpoint as needed
        if (!res.ok) {
          throw new Error("Failed to fetch payment details");
        }
        const data = await res.json();
        setPayment(data);
      } catch (error) {
        console.error("Error fetching payment detail:", error);
      } finally {
        setLoading(false);
      }
    };
    if (paymentId) {
      fetchPayment();
    }
  }, [paymentId]);

  if (loading) {
    return <div>Loading payment details...</div>;
  }

  if (!payment) {
    return <div>No payment found.</div>;
  }

  return (
    <div className="min-h-screen p-4">
      <Button onClick={() => router.back()} className="mb-4">
        Go Back
      </Button>
      <Card>
        <CardHeader>
          <CardTitle>{`Payment #${payment._id}`}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Date: {new Date(payment.date).toLocaleDateString()}</p>
          <p>Amount: ${payment.amount}</p>
          <p>Status: {payment.status}</p>
          <p>Method: {payment.method}</p>
          <p>Notes: {payment.notes || "None"}</p>
          {/* Add as many fields as you have in your Payment schema */}
        </CardContent>
      </Card>
    </div>
  );
}
