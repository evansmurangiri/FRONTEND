import React from "react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { User, Clock, Calendar } from "lucide-react"; // 👈 icons

const BlogCardList = ({ blog }) => {
  const navigate = useNavigate();
  if (!blog) return null;

  // Format date
  const date = blog.createdAt ? new Date(blog.createdAt) : null;
  const formattedDate = date ? date.toLocaleDateString("en-GB") : "";

  // Thumbnail fallback
  const thumbnail = blog.thumbnail || "/placeholder-600x400.png";

  // Dynamic reading time (200 words per minute)
  const words = blog.content ? blog.content.split(/\s+/).length : 0;
  const readTime = Math.max(1, Math.ceil(words / 200));

  return (
    <article
      role="article"
      aria-label={blog.title || "blog card"}
      className="bg-white dark:bg-gray-900 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col w-full max-w-sm group"
    >
      {/* IMAGE */}
      <div className="relative w-full h-40 overflow-hidden">
        <img
          src={thumbnail}
          alt={blog.title || "blog thumbnail"}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          draggable={false}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
      </div>

      {/* CONTENT */}
      <div className="p-4 flex flex-col gap-2 flex-1">
        {/* Title */}
        <h3
          className="text-lg md:text-xl font-semibold text-gray-900 dark:text-gray-100 transition-colors duration-300 group-hover:text-yellow-500"
        >
          {blog.title}
        </h3>

        {/* Subtitle */}
        {/* <p className="text-gray-700 dark:text-gray-300 text-sm line-clamp-2">
          {blog.subtitle || ""}
        </p> */}

        {/* Metadata row */}
        <div className="flex items-center justify-between gap-4 mt-2 text-sm text-gray-600 dark:text-gray-300">
          {/* Author */}
          <span className="flex items-center gap-1">
            <User size={14} />{" "}
            {blog.author?.firstName
              ? `${blog.author.firstName} ${blog.author?.lastName ?? ""}`.trim()
              : "Unknown"}
          </span>

          {/* Date + Read time */}
          <span className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <Calendar size={14} /> {formattedDate}
            </span>
            <span className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
              <Clock size={14} /> {readTime} min 
            </span>
          </span>
        </div>

        {/* Bottom section */}
        <div className="mt-3 flex items-center justify-between">
          <Button
  onClick={() => navigate(`/blogs/${blog._id}`)}
  className="w-full bg-gray-800 hover:bg-yellow-500 text-white font-medium px-5 py-2 rounded-md shadow-md hover:shadow-lg transition-all duration-300 text-center"
>
  Read More
</Button>

        </div>
      </div>
    </article>
  );
};

export default BlogCardList;
