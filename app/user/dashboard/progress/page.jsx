"use client";

import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@components/ui/card";
import LoadingScreen from "@components/loadingScreen";
import Navbar from "@components/navbar";
import { useSession } from "next-auth/react";

const ProgressPage = () => {
  const [progressData, setProgressData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { data: session, status } = useSession();
  const userId = session?.user?.id;

  // Fetch the exercise progress data
  useEffect(() => {
    if (status === "authenticated" && userId) {
      const fetchProgressData = async () => {
        try {
          const response = await fetch(`/api/user/progress/${userId}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });
          const data = await response.json();
          setProgressData(data);
          setIsLoading(false);
        } catch (error) {
          console.error("Failed to fetch progress data:", error);
        }
      };

      fetchProgressData();
    } else if (status === "loading") {
      setIsLoading(true);
    }
  }, [userId, status]);

  const renderCardContent = (content) => {
    return content ? (
      content
    ) : (
      <p className="text-gray-500 font-semibold">No progress data available.</p>
    );
  };

  return (
    <div>
      <Navbar />
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <div className="mt-[3rem] w-full flex justify-center items-center">
          <div className="w-[70%] grid grid-cols-1 gap-4 p-4 place-content-center">
            {/* Exercise Progress */}
            <Card className="bg-slate-200 shadow-md border-dotted border-slate-400">
              <CardHeader>
                <CardTitle>
                  <h1 className="text-[4rem] text-center font-bold bg-gradient-to-br from-blue-700 via-cyan-600 to-green-500 bg-transparent text-transparent bg-clip-text min-h-[5rem]">
                    Exercise Progress
                  </h1>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {renderCardContent(
                  progressData.length > 0 ? (
                    <div>
                      {progressData.map((exercise, index) => (
                        <div key={index} className="mb-4">
                          <h3 className="text-xl font-semibold">
                            {exercise.name}
                          </h3>
                          <p>Duration: {exercise.duration} mins</p>
                          <p>Calories Burned: {exercise.caloriesBurned} kcal</p>
                          <p>
                            Date: {new Date(exercise.date).toLocaleDateString()}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p>No exercise data found</p>
                  )
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      )}
      <div className="h-[5rem]" />
    </div>
  );
};

export default ProgressPage;
