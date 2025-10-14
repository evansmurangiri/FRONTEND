// src/App.jsx
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Import Axios defaults
import "./axiosConfig";

// Pages
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import About from "./pages/About";
import SearchList from "./pages/SearchList";
import BlogView from "./pages/BlogView";
import CreateBlog from "./pages/CreateBlog";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";
import YourBlog from "./pages/YourBlog";
import Comments from "./pages/Comments";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import UpdateBlog from "./pages/UpdateBlog";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Navbar />
        <Home />
        <Footer />
      </>
    ),
  },
  {
    path: "/blogs",
    element: (
      <>
        <Navbar />
        <Blog />
        <Footer />
      </>
    ),
  },
  {
    path: "/about",
    element: (
      <>
        <Navbar />
        <About />
        <Footer />
      </>
    ),
  },
  {
    path: "/search",
    element: (
      <>
        <Navbar />
        <SearchList />
        <Footer />
      </>
    ),
  },
  {
    path: "/blogs/:blogId",
    element: (
      <>
        <Navbar />
        <ProtectedRoute>
          <BlogView />
        </ProtectedRoute>
      </>
    ),
  },
  {
    path: "/write-blog",
    element: (
      <>
        <Navbar />
        <CreateBlog />
      </>
    ),
  },
  {
    path: "/profile",
    element: (
      <>
        <Navbar />
        <Profile />
      </>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <>
        <Navbar />
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      </>
    ),
    children: [
      { path: "write-blog", element: <CreateBlog /> },
      { path: "write-blog/:blogId", element: <UpdateBlog /> },
      { path: "your-blog", element: <YourBlog /> },
      { path: "comments", element: <Comments /> },
      { path: "profile", element: <Profile /> },
    ],
  },
  {
    path: "/signup",
    element: (
      <>
        <Navbar />
        <Signup />
      </>
    ),
  },
  {
    path: "/login",
    element: (
      <>
        <Navbar />
        <Login />
      </>
    ),
  },
  {
    path: "/admin",
    element: (
      <>
        <Navbar />
        <ProtectedRoute>
          <AdminDashboard />
        </ProtectedRoute>
      </>
    ),
  },
]);

const App = () => <RouterProvider router={router} />;

export default App;
