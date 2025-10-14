import React from "react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

const BlogCard = ({ blog }) => {
  const navigate = useNavigate();
  const date = new Date(blog.createdAt);
  const formattedDate = date.toLocaleDateString("en-GB");

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-5 rounded-2xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 flex flex-col">
      {/* Image */}
      <img
        src={blog.thumbnail}
        alt={blog.title}
        className="rounded-lg w-full h-48 object-cover"
      />

      {/* Title */}
      <h2 className="text-xl font-semibold mt-3 text-yellow-600 dark:text-yellow-500">
        {blog.title}
      </h2>

      {/* Subtitle */}
      <h3 className="text-gray-600 dark:text-gray-400 text-sm mt-1">
        {blog.subtitle}
      </h3>

      {/* Metadata badges */}
      <div className="flex flex-wrap gap-2 mt-2">
        <span className="px-3 py-1 text-xs font-medium rounded-full border border-yellow-400 text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/30">
          {blog.author?.firstName
            ? `${blog.author.firstName} ${blog.author?.lastName ?? ""}`.trim()
            : "Unknown"}
        </span>
        {blog.category && (
          <span className="px-3 py-1 text-xs font-medium rounded-full border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/50">
            {blog.category}
          </span>
        )}
        <span className="px-3 py-1 text-xs font-medium rounded-full border border-blue-300 dark:border-blue-600 text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30">
          {formattedDate}
        </span>
      </div>

      {/* Button */}
      <Button
        onClick={() => navigate(`/blogs/${blog._id}`)}
        className="mt-4 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white font-medium px-5 py-2 rounded-full shadow-md hover:shadow-lg transition-all duration-300"
      >
        Read More
      </Button>
    </div>
  );
};

export default BlogCard;
