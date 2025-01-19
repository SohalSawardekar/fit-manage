"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@components/ui/card";
import { useState, useEffect } from "react";
import LoadingScreen from "@components/loadingScreen";
import Navbar from "@components/navbar";
import { useSession } from "@node_modules/next-auth/react";

const HealthDashboard = () => {
  const [healthData, setHealthData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { data: session } = useSession();
  const userId = session?.user?.id;

  useEffect(() => {
    const fetchHealthData = async () => {
      try {
        const response = await fetch(`/api/user/gymData/${userId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        setHealthData(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch health data:", error);
      }
    };

    fetchHealthData();
  }, [userId]);

  const renderCardContent = (content) => {
    return content ? (
      content
    ) : (
      <p className="text-gray-500 font-semibold">Data not available.</p>
    );
  };

  const {
    healthMetrics,
    nutritionInsights,
    motivationalQuote,
    emergencyContact,
  } = healthData || {};

  return (
    <div>
      <Navbar />
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <div className="mt-[3rem] w-full flex justify-center items-center">
          <div className="w-[70%] grid grid-cols-1 gap-4 p-4 place-content-center">
            {/* Health Metrics */}
            <Card className="bg-slate-200 shadow-md border-dotted border-slate-400">
              <CardHeader>
                <CardTitle>
                  <h1 className="text-[4rem] text-center font-bold bg-gradient-to-br from-blue-700 via-cyan-600 to-green-500 bg-transparent text-transparent bg-clip-text min-h-[5rem]">
                    Health Metrics
                  </h1>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {renderCardContent(
                  healthMetrics && (
                    <>
                      <p>Weight: {healthMetrics.weight} kg</p>
                      <p>BMI: {healthMetrics.bmi}</p>
                      <p>
                        Body Fat Percentage: {healthMetrics.bodyFatPercentage}%
                      </p>
                      <p>Muscle Mass: {healthMetrics.muscleMass} kg</p>
                    </>
                  )
                )}
              </CardContent>
            </Card>

            {/* Nutrition Insights */}
            <Card className="mt-[2rem] bg-slate-200 shadow-md border-dotted border-slate-400">
              <CardHeader>
                <CardTitle>
                  <h1 className="text-[4rem] text-center font-bold bg-gradient-to-br from-blue-700 via-cyan-600 to-green-500 bg-transparent text-transparent bg-clip-text min-h-[5rem]">
                    Nutrition Insights
                  </h1>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {renderCardContent(
                  nutritionInsights && (
                    <>
                      <p>
                        Calorie Intake: {nutritionInsights.calorieIntake} kcal
                      </p>
                      <p>Macros:</p>
                      <ul className="list-disc pl-4">
                        <li>Carbs: {nutritionInsights.macros.carbs}%</li>
                        <li>Protein: {nutritionInsights.macros.protein}%</li>
                        <li>Fats: {nutritionInsights.macros.fats}%</li>
                      </ul>
                      <p>Recommended Foods:</p>
                      <ul className="list-disc pl-4">
                        {nutritionInsights.recommendedFoods.map(
                          (food, index) => (
                            <li key={index}>{food}</li>
                          )
                        )}
                      </ul>
                    </>
                  )
                )}
              </CardContent>
            </Card>

            {/* Motivational Quotes */}
            <Card className="mt-[2rem] bg-slate-200 shadow-md border-dotted border-slate-400">
              <CardHeader>
                <CardTitle>
                  <h1 className="text-[4rem] text-center font-bold bg-gradient-to-br from-blue-700 via-cyan-600 to-green-500 bg-transparent text-transparent bg-clip-text min-h-[5rem]">
                    Motivational Quote
                  </h1>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {renderCardContent(
                  motivationalQuote && <p>"{motivationalQuote}"</p>
                )}
              </CardContent>
            </Card>

            {/* Emergency Contact */}
            <Card className="mt-[2rem] bg-slate-200 shadow-md border-dotted border-slate-400">
              <CardHeader>
                <CardTitle>
                  <h1 className="text-[4rem] text-center font-bold bg-gradient-to-br from-blue-700 via-cyan-600 to-green-500 bg-transparent text-transparent bg-clip-text min-h-[5rem]">
                    Emergency Contact
                  </h1>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {renderCardContent(
                  emergencyContact && (
                    <>
                      <p>Name: {emergencyContact.name}</p>
                      <p>Relationship: {emergencyContact.relationship}</p>
                      <p>Phone: {emergencyContact.phone}</p>
                    </>
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

export default HealthDashboard;
