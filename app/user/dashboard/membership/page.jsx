"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Card, CardHeader, CardTitle, CardContent } from "@components/ui/card";
import { Button } from "@components/ui/button";
import LoadingScreen from "@components/loadingScreen";

const MembershipPage = () => {
  const { data: session } = useSession();
  const [membershipData, setMembershipData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMembershipData = async () => {
      try {
        const response = await fetch(`/api/membership/${session?.user?.id}`);
        const data = await response.json();

        // Check if the response is empty (i.e., no membership data)
        if (Object.keys(data).length === 0) {
          setMembershipData(null); // No membership data
        } else {
          setMembershipData(data); // Set membership data
        }
      } catch (error) {
        console.error("Error fetching membership data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (session?.user?.id) {
      fetchMembershipData();
    }
  }, [session?.user?.id]);

  if (loading) {
    return <LoadingScreen />;
  }

  if (!membershipData) {
    return <div>No membership data found.</div>;
  }

  return (
    <div className="min-h-screen">
      <Card className="bg-slate-200 shadow-md border-dotted border-slate-400">
        <CardHeader>
          <CardTitle>Membership Details</CardTitle>
        </CardHeader>
        <CardContent>
          <h3>Membership Plan: {membershipData.plan}</h3>
          <p>Status: {membershipData.status}</p>
          <p>
            Payment Date:{" "}
            {new Date(membershipData.paymentDate).toLocaleDateString()}
          </p>
          <p>
            Expiration Date:{" "}
            {new Date(membershipData.expirationDate).toLocaleDateString()}
          </p>
          <p>Payment Method: {membershipData.paymentMethod}</p>

          {membershipData.paymentReceipt && (
            <div>
              <h4>Payment Receipt:</h4>
              <a
                href={membershipData.paymentReceipt}
                target="_blank"
                rel="noopener noreferrer"
              >
                View Receipt
              </a>
            </div>
          )}

          {membershipData.status === "Pending" && (
            <Button className="mt-4">Renew Membership</Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MembershipPage;
