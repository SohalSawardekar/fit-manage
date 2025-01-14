"use client";

import React, { useEffect, useState } from "react";
import Navbar from "@components/navbar";
import { Button } from "@components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CarouselDemo } from "./reuse";

const BlogsPage = () => {
  const [blogs, setBlogs] = useState([]);
  const pathName = usePathname();

  // Fetch blogs data from the API
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch("/api/blogs"); // Replace with your API endpoint
        if (!response.ok) {
          throw new Error("Failed to fetch blogs");
        }
        const data = await response.json();
        setBlogs(data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <section>
      <Navbar />
      <div className="flex flex-col items-center w-full bg-slate-50 ">
        <div className="mt-[5rem] flex flex-row justify-end items-end w-[60%] gap-x-[1rem]">
          <Button
            asChild
            variant="outline"
            className="hover:bg-slate-800 hover:text-white bg-slate-300 text-slate-800 font-semibold border-dotted border-slate-600"
          >
            <Link href={pathName + "/createBlog"}>Create</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="hover:bg-slate-800 hover:text-white bg-slate-300 text-slate-800 font-semibold border-dotted border-slate-600"
          >
            <Link href={pathName + "/generateBlog"}>Generate</Link>
          </Button>
        </div>
        <div className="mt-[1rem] min-h-screen bg-slate-200 flex flex-col items-start justify-start w-[60%] rounded-3xl">
          <div className="w-full h-[8rem] flex items-center justify-center bg-gradient-to-br from-zinc-300 via-gray-300 to-slate-300 rounded-t-3xl">
            <h1 className="text-[4rem] font-bold bg-gradient-to-br from-sky-700 via-sky-600 to-cyan-400 bg-transparent text-transparent bg-clip-text ">
              Blogs
            </h1>
          </div>
          <div className="mt-14 w-full flex items-center justify-center min-h-full">
            {blogs.length > 0 ? (
              <CarouselDemo data={blogs} />
            ) : (
              <p className="text-lg text-gray-500">
                No blogs available
                {console.log({ blogs })}
              </p>
            )}
          </div>
          <div className="min-h-[5rem]" />
        </div>
        <div className="min-h-[5rem]" />
      </div>
    </section>
  );
};

export default BlogsPage;
