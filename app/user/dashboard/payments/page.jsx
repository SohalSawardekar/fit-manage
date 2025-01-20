"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // or import { useRouter } from "next/router" in Next 12/13 (pages router)
import { Card, CardHeader, CardTitle, CardContent } from "@components/ui/card";
import { Button } from "@components/ui/button";
import LoadingScreen from "@components/loadingScreen";

export default function PaymentHistoryPage() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter(); // For navigation to detail page

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const res = await fetch("/api/payments");
        // Adjust the endpoint as needed
        if (!res.ok) {
          throw new Error("Failed to fetch payment history");
        }
        const data = await res.json();
        setPayments(data); // Assume data is an array of payment objects
      } catch (error) {
        console.error("Error fetching payment history:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPayments();
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  if (!payments.length) {
    return <div>No payments found.</div>;
  }

  return (
    <div className="min-h-screen p-4">
      <h1 className="text-3xl font-bold mb-6">Payment History</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {payments.map((payment) => (
          <Card
            key={payment._id}
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => router.push(`/payments/${payment._id}`)}
          >
            <CardHeader>
              <CardTitle>{`Payment #${payment._id}`}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-semibold">
                Date: {new Date(payment.date).toLocaleDateString()}
              </p>
              <p>Amount: ${payment.amount}</p>
              <p>Status: {payment.status}</p>

              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  router.push(`/payments/${payment._id}`);
                }}
                className="mt-2"
              >
                View Details
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
