import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BlogCardList from "./BlogCardList";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { setBlog } from "@/redux/blogSlice";
import axios from "axios";

const tags = [
  { category: "Investment & Finance" },
  { category: "Buying & Selling Guides" },
  { category: "Market Trend & Analysis" },
  { category: "Home Design & Renovation" },
  { category: "Legal & Regulatory" },
];

const RecentBlog = () => {
  const { blog } = useSelector((store) => store.blog);
  const dispatch = useDispatch();
  const [visibleCount, setVisibleCount] = useState(4); // initial number of blogs visible

  useEffect(() => {
    const getAllPublishedBlogs = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/v1/blog/get-published-blogs`,
          { withCredentials: true }
        );
        if (res.data.success) {
          dispatch(setBlog(res.data.blogs));
        }
      } catch (error) {
        console.log(error.response?.data || error.message);
      }
    };
    getAllPublishedBlogs();
  }, [dispatch]);

  const recentBlogs = useMemo(() => {
    if (!blog) return [];
    return [...blog]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 12);
  }, [blog]);

  const trendingBlogs = useMemo(() => {
    if (!blog) return [];
    const recentIds = new Set(recentBlogs.map((b) => b._id));
    return [...blog]
      .filter((b) => !recentIds.has(b._id))
      .sort((a, b) => {
        const scoreA =
          (a.likes?.length || 0) + 1 / (new Date() - new Date(a.createdAt));
        const scoreB =
          (b.likes?.length || 0) + 1 / (new Date() - new Date(b.createdAt));
        return scoreB - scoreA;
      })
      .slice(0, 8);
  }, [blog, recentBlogs]);

  const handleViewAll = () => {
    setVisibleCount((prev) => Math.min(prev + 4, recentBlogs.length));
  };

  return (
    <div
      className="bg-gray-100 dark:bg-gray-800 pb-10"
      style={{
        fontFamily:
          "'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif",
      }}
    >
      {/* Header */}
      <div className="max-w-6xl mx-auto flex flex-col space-y-4 items-center">
        <h1 className="text-4xl font-bold pt-10">Recent Blogs</h1>
        <hr className="w-24 text-center border-2 border-yellow-500 rounded-full" />
      </div>

      {/* Categories Navigation */}
      <div className="flex flex-wrap justify-center gap-3 mt-6 px-4">
        {tags.map((item, index) => (
          <Badge
            key={index}
            onClick={() => console.log(`Filter by: ${item.category}`)}
            className="
              cursor-pointer px-4 py-2 text-sm font-medium rounded-full
              border border-yellow-500 
              bg-yellow-50 text-yellow-700 
              dark:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-400
              hover:bg-yellow-500 hover:text-white 
              dark:hover:bg-yellow-600 dark:hover:text-white
              transition-all duration-300
            "
          >
            {item.category}
          </Badge>
        ))}
      </div>

      {/* Recent Blogs Grid */}
      <div className="max-w-7xl mx-auto mt-10 px-4 md:px-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {recentBlogs.slice(0, visibleCount).map((b) => (
            <BlogCardList key={b._id} blog={b} />
          ))}
        </div>

        {/* View All Button */}
        {visibleCount < recentBlogs.length && (
          <div className="flex justify-center mt-8">
            <Button
              onClick={handleViewAll}
              className="
                bg-yellow-500 hover:bg-yellow-600 
                text-white px-6 py-2 font-medium
                shadow-md transition-all duration-300
              "
            >
              View More Articles
            </Button>
          </div>
        )}
      </div>

      {/* Trending Section */}
      {trendingBlogs.length > 0 && (
        <>
          <div className="max-w-6xl mx-auto flex flex-col space-y-4 items-center mt-16">
            <h1 className="text-4xl font-bold">Trending</h1>
            <hr className="w-24 text-center border-2 border-yellow-500 rounded-full" />
          </div>

          <div className="max-w-7xl mx-auto mt-10 px-4 md:px-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {trendingBlogs.map((b) => (
                <BlogCardList key={b._id} blog={b} />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default RecentBlog;
