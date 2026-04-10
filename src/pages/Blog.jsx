import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../axiosConfig";
import { setBlog } from "@/redux/blogSlice";
import BlogCardList from "@/components/BlogCardList";

const Blog = () => {
  const dispatch = useDispatch();
  const { blog } = useSelector((store) => store.blog);

  useEffect(() => {
    const getAllPublishedBlogs = async () => {
      try {
        const res = await axiosInstance.get(`/blog/get-published-blogs`);
        if (res.data.success) {
          dispatch(setBlog(res.data.blogs));
        }
      } catch (error) {
        console.log(error);
      }
    };
    getAllPublishedBlogs();
  }, [dispatch]);

  return (
    <div
      className="pt-16 min-h-screen bg-black text-white"
      style={{
        fontFamily: "'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif",
      }}
    >
      <div className="max-w-6xl mx-auto text-center flex flex-col space-y-4 items-center">
        <h1 className="text-4xl font-bold pt-10">Our Blogs</h1>
        <hr className="w-24 text-center border-2 border-white rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 py-12 px-4 md:px-0">
        {blog?.length > 0 ? (
          blog.map((b) => <BlogCardList blog={b} key={b._id} />)
        ) : (
          <p className="text-center text-white col-span-full">
            No blogs available.
          </p>
        )}
      </div>
    </div>
  );
};

export default Blog;
