"use client";

import React, { useEffect, useState } from "react";
import Navbar from "@components/navbar";
import Blogs from "@components/blog";
import LoadingScreen from "@components/loadingScreen";

const BlogsPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true); // Track loading state

  // Fetch blogs data from the API
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(`/api/blogs?id=`);
        if (!response.ok) {
          throw new Error("Failed to fetch blogs");
        }

        const result = await response.json();
        console.log("Fetched Blogs:", result);
        const blogs = result?.data || [];
        setBlogs(blogs);
      } catch (error) {
        console.error("Error fetching blogs:", error);
        setBlogs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <section>
      <Navbar />
      {loading ? <LoadingScreen /> : <Blogs blogs={blogs} />}{" "}
    </section>
  );
};

export default BlogsPage;
