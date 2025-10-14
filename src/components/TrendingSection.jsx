// src/components/TrendingSection.jsx
import React from "react";
import BlogCardList from "./BlogCardList"; // reuse your card
import { Link } from "react-router-dom";

const TrendingSection = ({ trendingBlogs = [] }) => {
  if (!trendingBlogs || trendingBlogs.length === 0) return null;

  return (
    <section className="py-12 bg-transparent dark:bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
              🔥 Trending
            </h2>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              Popular posts based on engagement
            </p>
          </div>

          {/* optional: "View all trending" link */}
          <div className="hidden sm:block">
            <Link
              to="/trending"
              className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
            >
              View all
            </Link>
          </div>
        </div>

        {/* Grid: 4 per row on large screens */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {trendingBlogs.map((b) => (
            <BlogCardList key={b._id} blog={b} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrendingSection;
