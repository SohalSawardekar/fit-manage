"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

export default function GenerateBlog() {
  const [prompt, setPrompt] = useState("");
  const [blog, setBlog] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    setError("");
    setBlog("");
    if (!prompt.trim()) {
      setError("Please enter a valid prompt.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/generate-blog", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate blog. Please try again.");
      }

      const data = await response.json();
      setBlog(data.blog);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="">
      <div className="min-h-[5rem] bg-slate-300" />
      <h1 className="mt-[5rem] text-2xl font-bold mb-6 w-full flex flex-col justify-center items-center">
        Generate a Blog with AI
      </h1>
      <div className="w-full flex flex-col justify-center items-center">
        <Card className="mb-6 w-[40%]">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              Enter your prompt
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Enter your blog prompt here..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="mb-4 h-[30vh]"
            />
            <Button
              onClick={handleGenerate}
              disabled={loading}
              className="w-full"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin mr-2" /> Generating...
                </>
              ) : (
                "Generate Blog"
              )}
            </Button>
          </CardContent>
        </Card>
      </div>

      {error && <p className="text-red-500 font-medium mb-4">{error}</p>}

      {blog && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              Generated Blog
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>{blog}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
