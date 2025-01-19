"use client";

import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@components/ui/card";
import Navbar from "@components/navbar";
import { useSession } from "next-auth/react";
import { Button } from "@components/ui/button";
import { Dialog, DialogContent } from "@components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"; // Dropdown for data selection

const AddDataPage = () => {
  const [formData, setFormData] = useState({
    healthMetrics: {
      weight: "",
      height: "",
      bmi: "",
      bodyFatPercentage: "",
      muscleMass: "",
    },
    nutritionInsights: {
      calorieIntake: "",
      macros: { carbs: "", protein: "", fats: "" },
      recommendedFoods: [],
    },
    motivationalQuote: "",
  });

  const [progressData, setProgressData] = useState({
    exerciseName: "",
    duration: "",
    caloriesBurned: "",
  });

  const [selectedDataType, setSelectedDataType] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const { data: session } = useSession();
  const userId = session?.user?.id;

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name.split(".")[0]]: {
        ...formData[name.split(".")[0]],
        [name.split(".")[1]]: value,
      },
    });
  };

  const handleProgressChange = (e) => {
    const { name, value } = e.target;
    setProgressData({
      ...progressData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (selectedDataType !== "progress") {
      try {
        const response = await fetch(`/api/user/addData/${userId}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          alert("Data added successfully!");
          setFormData({
            healthMetrics: {
              weight: "",
              height: "",
              bmi: "",
              bodyFatPercentage: "",
              muscleMass: "",
            },
            nutritionInsights: {
              calorieIntake: "",
              macros: { carbs: "", protein: "", fats: "" },
              recommendedFoods: [],
            },
            motivationalQuote: "",
          });
          setIsDialogOpen(false);
        } else {
          alert("Error adding data.");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Error submitting form.");
      }
    }

    if (selectedDataType === "progress") {
      try {
        const response = await fetch(`/api/user/addProgressData/${userId}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(progressData),
        });

        if (response.ok) {
          alert("Progress added successfully!");
          setProgressData({
            exerciseName: "",
            duration: "",
            caloriesBurned: "",
          });
          setIsDialogOpen(false);
        } else {
          alert("Error adding progress data.");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Error submitting progress data.");
      }
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="mt-[3rem] w-full flex justify-center items-center">
        <div className="w-[50%] grid grid-cols-1 gap-4 p-4 place-content-center">
          <Card className="bg-slate-200 shadow-md border-dotted border-slate-400">
            <CardHeader>
              <CardTitle>
                <h1 className="text-[4rem] text-center font-bold bg-gradient-to-br from-blue-700 via-cyan-600 to-green-500 bg-transparent text-transparent bg-clip-text min-h-[5rem]">
                  Add Data
                </h1>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* Ask User Which Data to Input */}
              <div className="flex flex-col gap-y-[1rem]">
                <h2 className="font-semibold">Select Data to Input</h2>
                <div className="flex gap-4">
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <Button
                        type="button"
                        className="py-2 px-4 bg-cyan-600 text-white font-semibold"
                      >
                        Select Data Type
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="flex flex-col gap-y-1 border-dotted border-slate-500 mt-[1rem]">
                      <DropdownMenuItem
                        onClick={() => {
                          setSelectedDataType("healthMetrics");
                          setIsDialogOpen(true); // Open dialog on selection
                        }}
                      >
                        Health Metrics
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => {
                          setSelectedDataType("nutritionInsights");
                          setIsDialogOpen(true); // Open dialog on selection
                        }}
                      >
                        Nutrition Insights
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => {
                          setSelectedDataType("motivationalQuote");
                          setIsDialogOpen(true); // Open dialog on selection
                        }}
                      >
                        Motivational Quote
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => {
                          setSelectedDataType("progress");
                          setIsDialogOpen(true); // Open dialog on selection
                        }}
                      >
                        Progress
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              {/* Render Dialog for Selected Data Type */}
              {isClient && (
                <form onSubmit={handleSubmit}>
                  {/* Health Metrics Dialog */}
                  {selectedDataType === "healthMetrics" && isDialogOpen && (
                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                      <DialogContent className="max-w-[30vw] overflow-auto">
                        <h2 className="font-semibold mt-[1rem]">
                          Health Metrics
                        </h2>
                        <div className="flex flex-col mt-1 items-start translate-x-1 gap-y-1">
                          <label>Weight (kg):</label>
                          <input
                            type="number"
                            name="healthMetrics.weight"
                            value={formData.healthMetrics.weight}
                            onChange={handleChange}
                            className="w-[20%] p-2 my-2 border border-slate-400 rounded-2xl"
                          />
                        </div>
                        <div className="flex flex-col mt-1 items-start translate-x-1 gap-y-1">
                          <label>Height (cm):</label>
                          <input
                            type="number"
                            name="healthMetrics.height"
                            value={formData.healthMetrics.height}
                            onChange={handleChange}
                            className="w-[20%] p-2 my-2 border border-slate-400 rounded-2xl"
                          />
                        </div>
                        <div className="flex flex-col mt-1 items-start translate-x-1 gap-y-1">
                          <label>BMI:</label>
                          <input
                            type="number"
                            name="healthMetrics.bmi"
                            value={formData.healthMetrics.bmi}
                            onChange={handleChange}
                            className="w-[20%] p-2 my-2 border border-slate-400 rounded-2xl"
                          />
                        </div>
                        <div className="flex flex-col mt-1 items-start translate-x-1 gap-y-1">
                          <label>Body Fat Percentage:</label>
                          <input
                            type="number"
                            name="healthMetrics.bodyFatPercentage"
                            value={formData.healthMetrics.bodyFatPercentage}
                            onChange={handleChange}
                            className="w-[20%] p-2 my-2 border border-slate-400 rounded-2xl"
                          />
                        </div>
                        <div className="flex flex-col mt-1 items-start translate-x-1 gap-y-1">
                          <label>Muscle Mass (kg):</label>
                          <input
                            type="number"
                            name="healthMetrics.muscleMass"
                            value={formData.healthMetrics.muscleMass}
                            onChange={handleChange}
                            className="w-[20%] p-2 my-2 border border-slate-400 rounded-2xl"
                          />
                        </div>
                        <div className="w-full flex justify-center items-center mt-4">
                          <Button
                            type="submit"
                            className="w-[20%] mt-4 bg-gradient-to-br from-blue-700 via-cyan-600 to-green-500 text-white font-semibold py-2"
                          >
                            Submit
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  )}
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AddDataPage;
