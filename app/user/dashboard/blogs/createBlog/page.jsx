"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import { Textarea } from "@components/ui/textarea";
import { Label } from "@components/ui/label";
import { Card, CardContent, CardFooter } from "@components/ui/card";
import { Switch } from "@components/ui/switch";
import ImageUploader from "@components/imageUpload";
import { useSession } from "@node_modules/next-auth/react";

const CreateBlogPage = () => {
  const [useUrl, setUseUrl] = useState(true);
  const [tempTag, setTempTag] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    content: "",
    tags: [],
    imageUrl: "",
    creator: "",
    userId: "",
  });
  const { data: session } = useSession();

  const toggleUseUrl = () => {
    setUseUrl((prev) => !prev);
    if (useUrl) {
      setFormData((prevData) => ({ ...prevData, imageUrl: "" }));
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleImageUpload = (uploadedImageUrl) => {
    setFormData((prevData) => ({ ...prevData, imageUrl: uploadedImageUrl }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.description || !formData.content) {
      alert("Title, description, and content are required!");
      return;
    }

    // Process the tags as they are
    const processedTags = tempTag
      .split("#") // Split by `#`
      .map((tag) => tag.trim()) // Trim whitespace
      .filter((tag) => tag); // Remove empty strings

    // Prefix each tag with `#` again
    const formattedTags = processedTags.map((tag) => `#${tag}`);

    // Build the updatedFormData directly instead of setting state unnecessarily
    const updatedFormData = {
      ...formData,
      tags: formattedTags,
      userId: session?.user?.id || "",
    };

    try {
      console.log("Form Data Submitted:", updatedFormData);

      const response = await fetch("/api/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedFormData),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Blog created successfully!");
      } else {
        alert("Error creating blog: " + data.message);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-start bg-gray-50">
      {/* Navbar */}
      <nav className="w-full min-h-[5rem] bg-slate-300" />

      {/* Page Header */}
      <h1 className="mt-[2rem] text-[3rem] font-bold text-slate-800">
        Create a Blog
      </h1>

      {/* Blog Form */}
      <Card className="mt-10 w-[90%] max-w-3xl shadow-md rounded-lg">
        <CardContent className="p-6">
          {/* Title */}
          <div className="mb-4">
            <Label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Title
            </Label>
            <Input
              id="title"
              type="text"
              placeholder="Enter blog title"
              value={formData.title}
              onChange={handleChange}
              className="mt-1"
            />
          </div>

          {/* Image Section */}
          <div className="mb-4">
            <div className="flex items-center justify-between">
              <Label className="block text-sm font-medium text-gray-700">
                Image
              </Label>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Use URL</span>
                <Switch checked={useUrl} onCheckedChange={toggleUseUrl} />
                <span className="text-sm text-gray-600">Drag & Drop</span>
              </div>
            </div>

            {useUrl ? (
              <Input
                id="imageUrl"
                type="text"
                placeholder="Paste the image URL"
                value={formData.imageUrl}
                onChange={handleChange}
                className="mt-2"
              />
            ) : (
              <ImageUploader onUpload={handleImageUpload} />
            )}
          </div>

          {/* Description */}
          <div className="mb-4">
            <Label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </Label>
            <Textarea
              id="description"
              placeholder="Write a short description of the blog"
              value={formData.description}
              onChange={handleChange}
              className="mt-1"
            />
          </div>

          {/* Content */}
          <div className="mb-4">
            <Label
              htmlFor="content"
              className="block text-sm font-medium text-gray-700"
            >
              Content
            </Label>
            <Textarea
              id="content"
              placeholder="Write the main content of your blog"
              value={formData.content}
              onChange={handleChange}
              className="mt-1 h-32"
            />
          </div>

          {/* Tags */}
          <div className="mb-4">
            <Label
              htmlFor="tags"
              className="block text-sm font-medium text-gray-700"
            >
              Tags
            </Label>
            <Input
              id="tags"
              type="text"
              placeholder="Add tags separated by commas"
              value={tempTag}
              onChange={(e) => setTempTag(e.target.value)}
              className="mt-1"
            />
          </div>
        </CardContent>

        {/* Submit Button */}
        <CardFooter className="p-6">
          <Button
            className="w-full bg-sky-600 hover:bg-sky-700 text-white"
            onClick={handleSubmit}
          >
            Create Blog
          </Button>
        </CardFooter>
      </Card>
      <div className="min-h-[5rem]" />
    </div>
  );
};

export default CreateBlogPage;
