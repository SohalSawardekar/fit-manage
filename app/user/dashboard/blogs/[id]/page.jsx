// app/blog/[id]/page.jsx
"use client";

import React, { useEffect, useState, use } from "react";
import Navbar from "@components/navbar";
import LoadingScreen from "@components/loadingScreen";
import Image from "@node_modules/next/image";

const BlogPage = ({ params }) => {
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Unwrap params using React.use()
  const resolvedParams = use(params);
  const blogId = resolvedParams.id;

  useEffect(() => {
    const fetchBlog = async () => {
      if (!blogId) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`/api/blogs/${blogId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch blog");
        }
        const result = await response.json();
        setBlog(result.data);
      } catch (error) {
        console.error("Error fetching blog:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [blogId]); // Using resolved blogId in dependency array

  if (loading) {
    return <LoadingScreen />;
  }

  if (error) {
    return (
      <>
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="text-red-500">Error: {error}</div>
        </div>
      </>
    );
  }

  if (!blog) {
    return (
      <>
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div>Blog not found</div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4 py-8 w-[80%]">
        <article className="prose lg:prose-xl mx-auto">
          <h1 className="text-3xl font-bold mb-4 text-center">{blog.title}</h1>
          <div className="mt-[2rem] text-gray-600 mb-4 flex justify-center">
            <Image
              src={blog.imageUrl}
              width={700}
              height={700}
              alt={blog.title}
              className="rounded-xl"
            />
          </div>
          <div className="whitespace-pre-wrap mt-[5rem]">{blog.content}</div>
        </article>
      </main>
    </>
  );
};

export default BlogPage;
