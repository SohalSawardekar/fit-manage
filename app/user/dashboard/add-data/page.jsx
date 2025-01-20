"use client";

import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@components/ui/card";
import Navbar from "@components/navbar";
import { useSession } from "next-auth/react";
import { Button } from "@components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const AddDataPage = () => {
  // MAIN FORM DATA STATES
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
      macros: {
        carbs: "",
        protein: "",
        fats: "",
      },
      recommendedFoods: [],
    },
    motivationalQuote: "",
  });

  // PROGRESS DATA STATE
  const [progressData, setProgressData] = useState({
    exerciseName: "",
    duration: "",
    caloriesBurned: "",
  });

  // DIALOG/SELECTION STATES
  const [selectedDataType, setSelectedDataType] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // USER SESSION
  const { data: session } = useSession();
  const userId = session?.user?.id;

  // Ensure client-side rendering for the Dialog
  useEffect(() => {
    setIsClient(true);
  }, []);

  // HANDLERS FOR HEALTH, NUTRITION, QUOTE
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name.split(".")[0]]: {
        ...prev[name.split(".")[0]],
        [name.split(".")[1]]: value,
      },
    }));
  };

  // HANDLER FOR PROGRESS FIELDS
  const handleProgressChange = (e) => {
    const { name, value } = e.target;
    setProgressData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (selectedDataType !== "progress") {
      // Submitting formData for Health/Nutrition/Motivational
      try {
        const response = await fetch(`/api/user/gymData/${userId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        if (!response.ok && response.status === 404) {
          const response = await fetch(`/api/user/gymData/${userId}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
          });
        }

        if (response.ok) {
          alert("Data added successfully!");
          // Reset the formData
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
    } else {
      // Submitting progressData
      try {
        const response = await fetch(`/api/user/progress/${userId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(progressData),
        });

        if (!response.ok && response.status === 404) {
          const response = await fetch(`/api/user/progress/${userId}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(progressData),
          });
        }

        if (response.ok) {
          alert("Progress added successfully!");
          // Reset the progressData
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
                          setIsDialogOpen(true);
                        }}
                      >
                        Health Metrics
                      </DropdownMenuItem>

                      <DropdownMenuItem
                        onClick={() => {
                          setSelectedDataType("nutritionInsights");
                          setIsDialogOpen(true);
                        }}
                      >
                        Nutrition Insights
                      </DropdownMenuItem>

                      <DropdownMenuItem
                        onClick={() => {
                          setSelectedDataType("motivationalQuote");
                          setIsDialogOpen(true);
                        }}
                      >
                        Motivational Quote
                      </DropdownMenuItem>

                      <DropdownMenuItem
                        onClick={() => {
                          setSelectedDataType("progress");
                          setIsDialogOpen(true);
                        }}
                      >
                        Progress
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              {isClient && (
                <form onSubmit={handleSubmit}>
                  {/* ------------------ Health Metrics Dialog ------------------ */}
                  {selectedDataType === "healthMetrics" && isDialogOpen && (
                    <Dialog open={true} onOpenChange={setIsDialogOpen}>
                      <DialogContent className="max-w-[30vw] overflow-auto">
                        <DialogHeader>
                          <DialogTitle>Health Metrics</DialogTitle>
                        </DialogHeader>
                        <div className="flex flex-col mt-4 items-start gap-y-2">
                          <label>Weight (kg):</label>
                          <input
                            type="number"
                            name="healthMetrics.weight"
                            value={formData.healthMetrics.weight}
                            onChange={handleChange}
                            className="w-[20%] p-2 border border-slate-400 rounded-2xl"
                          />
                          <label>Height (cm):</label>
                          <input
                            type="number"
                            name="healthMetrics.height"
                            value={formData.healthMetrics.height}
                            onChange={handleChange}
                            className="w-[20%] p-2 border border-slate-400 rounded-2xl"
                          />
                          <label>BMI:</label>
                          <input
                            type="number"
                            name="healthMetrics.bmi"
                            value={formData.healthMetrics.bmi}
                            onChange={handleChange}
                            className="w-[20%] p-2 border border-slate-400 rounded-2xl"
                          />
                          <label>Body Fat Percentage:</label>
                          <input
                            type="number"
                            name="healthMetrics.bodyFatPercentage"
                            value={formData.healthMetrics.bodyFatPercentage}
                            onChange={handleChange}
                            className="w-[20%] p-2 border border-slate-400 rounded-2xl"
                          />
                          <label>Muscle Mass (kg):</label>
                          <input
                            type="number"
                            name="healthMetrics.muscleMass"
                            value={formData.healthMetrics.muscleMass}
                            onChange={handleChange}
                            className="w-[20%] p-2 border border-slate-400 rounded-2xl"
                          />
                          <div className="w-full flex justify-center items-center mt-4">
                            <Button
                              type="submit"
                              className="w-[20%] bg-gradient-to-br from-blue-700 via-cyan-600 to-green-500 text-white font-semibold py-2"
                            >
                              Submit
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  )}

                  {/* ------------------ Nutrition Insights Dialog ------------------ */}
                  {selectedDataType === "nutritionInsights" && isDialogOpen && (
                    <Dialog open={true} onOpenChange={setIsDialogOpen}>
                      <DialogContent className="max-w-[30vw] overflow-auto">
                        <DialogHeader>
                          <DialogTitle>Nutrition Insights</DialogTitle>
                        </DialogHeader>
                        <div className="flex flex-col mt-4 items-start gap-y-2">
                          <label>Calorie Intake (kcal):</label>
                          <input
                            type="number"
                            name="nutritionInsights.calorieIntake"
                            value={formData.nutritionInsights.calorieIntake}
                            onChange={handleChange}
                            className="w-[20%] p-2 border border-slate-400 rounded-2xl"
                          />
                          <label>Carbs (%):</label>
                          <input
                            type="number"
                            name="nutritionInsights.macros.carbs"
                            value={formData.nutritionInsights.macros.carbs}
                            onChange={handleChange}
                            className="w-[20%] p-2 border border-slate-400 rounded-2xl"
                          />
                          <label>Protein (%):</label>
                          <input
                            type="number"
                            name="nutritionInsights.macros.protein"
                            value={formData.nutritionInsights.macros.protein}
                            onChange={handleChange}
                            className="w-[20%] p-2 border border-slate-400 rounded-2xl"
                          />
                          <label>Fats (%):</label>
                          <input
                            type="number"
                            name="nutritionInsights.macros.fats"
                            value={formData.nutritionInsights.macros.fats}
                            onChange={handleChange}
                            className="w-[20%] p-2 border border-slate-400 rounded-2xl"
                          />
                          {/* For recommended foods, you could show a text input or multiple checkboxes */}
                          <div className="w-full flex justify-center items-center mt-4">
                            <Button
                              type="submit"
                              className="w-[20%] bg-gradient-to-br from-blue-700 via-cyan-600 to-green-500 text-white font-semibold py-2"
                            >
                              Submit
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  )}

                  {/* ------------------ Motivational Quote Dialog ------------------ */}
                  {selectedDataType === "motivationalQuote" && isDialogOpen && (
                    <Dialog open={true} onOpenChange={setIsDialogOpen}>
                      <DialogContent className="max-w-[30vw] overflow-auto">
                        <DialogHeader>
                          <DialogTitle>Motivational Quote</DialogTitle>
                        </DialogHeader>
                        <div className="flex flex-col mt-4 items-start gap-y-2">
                          <label>Your Quote:</label>
                          <textarea
                            name="motivationalQuote"
                            value={formData.motivationalQuote}
                            onChange={(e) =>
                              setFormData((prev) => ({
                                ...prev,
                                motivationalQuote: e.target.value,
                              }))
                            }
                            rows={3}
                            className="w-full p-2 border border-slate-400 rounded-2xl"
                          />
                          <div className="w-full flex justify-center items-center mt-4">
                            <Button
                              type="submit"
                              className="w-[20%] bg-gradient-to-br from-blue-700 via-cyan-600 to-green-500 text-white font-semibold py-2"
                            >
                              Submit
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  )}

                  {/* ------------------ Progress Dialog ------------------ */}
                  {selectedDataType === "progress" && isDialogOpen && (
                    <Dialog open={true} onOpenChange={setIsDialogOpen}>
                      <DialogContent className="max-w-[30vw] overflow-auto">
                        <DialogHeader>
                          <DialogTitle>Progress</DialogTitle>
                        </DialogHeader>
                        <div className="flex flex-col mt-4 items-start gap-y-2">
                          <label>Exercise Name:</label>
                          <input
                            type="text"
                            name="progress.exerciseName"
                            value={progressData.exerciseName}
                            onChange={handleProgressChange}
                            className="w-full p-2 border border-slate-400 rounded-2xl"
                          />
                          <label>Duration (min):</label>
                          <input
                            type="number"
                            name="progress.duration"
                            value={progressData.duration}
                            onChange={handleProgressChange}
                            className="w-full p-2 border border-slate-400 rounded-2xl"
                          />
                          <label>Calories Burned:</label>
                          <input
                            type="number"
                            name="progress.caloriesBurned"
                            value={progressData.caloriesBurned}
                            onChange={handleProgressChange}
                            className="w-full p-2 border border-slate-400 rounded-2xl"
                          />
                          <div className="w-full flex justify-center items-center mt-4">
                            <Button
                              type="submit"
                              className="w-[20%] bg-gradient-to-br from-blue-700 via-cyan-600 to-green-500 text-white font-semibold py-2"
                            >
                              Submit
                            </Button>
                          </div>
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
