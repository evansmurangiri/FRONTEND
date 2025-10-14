// src/components/Navbar.jsx
import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Logo from "../assets/Lgo.png";
import userLogo from "../assets/user.jpg";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/redux/authSlice";
import axios from "axios";
import { toast } from "sonner";
import { HiMenuAlt1, HiMenuAlt3 } from "react-icons/hi";
import { FaMoon, FaSun, FaRegEdit } from "react-icons/fa";
import { LiaCommentSolid } from "react-icons/lia";
import { Search, User, LogOut, BarChart2 } from "lucide-react";

const Navbar = () => {
  const { user } = useSelector((s) => s.auth);
  const { theme } = useSelector((s) => s.theme ?? {});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showSearch, setShowSearch] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [desktopDropdown, setDesktopDropdown] = useState(null);
  const [mobileDropdown, setMobileDropdown] = useState(null);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 900) setMobileOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // ---------- FIXED LOGOUT HANDLER ----------
  const logoutHandler = async () => {
    try {
      // Make sure this matches your backend logout endpoint
      const res = await axios.get("/api/v1/user/logout", {
        withCredentials: true,
      });

      if (res.data?.success) {
        dispatch(setUser(null));
        toast.success(res.data.message || "Logged out successfully");

        // Close mobile menu
        setMobileOpen(false);
        setMobileDropdown(null);

        navigate("/"); // redirect to homepage
      } else {
        toast.error(res.data?.message || "Logout failed");
      }
    } catch (err) {
      console.error("Logout error:", err);
      toast.error(err?.response?.data?.message || "Logout failed");
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
    setSearchTerm("");
    setShowSearch(false);
    setMobileOpen(false);
  };

  const navItems = [
    // { title: "Home", to: "/" },
    // { title: "Latest", to: "/trending" },
    // { title: "Blog", to: "/blogs" },
    {
      title: "Categories",
      children: [
        "Investment & Finance",
        "Buying & Selling Guides",
        "Market Trend & Analysis",
        "Home Design & Renovation",
        "Legal & Regulatory",
      ],
    },
    { title: "About", to: "/about" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black font-[ProximaNova] shadow-md" aria-label="Main navigation">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3" onClick={() => setMobileOpen(false)}>
          <img src={Logo} alt="Logo" className="w-12 h-12 md:w-14 md:h-14 drop-shadow" />
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-6 font-semibold">
          {navItems.map((item, idx) =>
            item.children ? (
              <li
                key={idx}
                className="relative"
                onMouseEnter={() => setDesktopDropdown(idx)}
                onMouseLeave={() => setDesktopDropdown(null)}
              >
                <button className="text-white drop-shadow hover:text-yellow-400 transition-colors">
                  {item.title} ▾
                </button>
                <ul
                  className={`absolute left-0 mt-2 min-w-[220px] bg-white dark:bg-gray-800 rounded-md shadow-lg transition-all ${
                    desktopDropdown === idx ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                  }`}
                >
                  {item.children.map((child, i) => (
                    <li key={i}>
                      <Link
                        to={`/search?q=${encodeURIComponent(child)}`}
                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        {child}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            ) : (
              <li key={idx}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    `transition-colors ${isActive ? "text-yellow-400" : "text-white drop-shadow"} hover:text-yellow-400`
                  }
                >
                  {item.title}
                </NavLink>
              </li>
            )
          )}
        </ul>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="hidden md:flex items-center">
            {!showSearch ? (
              <button
                onClick={() => setShowSearch(true)}
                className="p-2 text-white hover:text-yellow-400"
                aria-label="Open search"
              >
                <Search className="w-5 h-5" />
              </button>
            ) : (
              <form onSubmit={handleSearchSubmit} className="flex items-center">
                <input
                  autoFocus
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-64 px-3 py-2 rounded-md outline-none bg-white/90 dark:bg-gray-800/90 text-gray-900 dark:text-gray-100"
                  placeholder="Search..."
                />
                <button type="button" onClick={() => setShowSearch(false)} className="ml-2 text-white">
                  ✕
                </button>
              </form>
            )}
          </div>

          {/* Theme toggle */}
          <button
            className="hidden md:inline-flex p-2 text-white"
            onClick={() => document.body.classList.toggle("dark")}
            aria-label="Toggle theme"
          >
            {theme === "light" ? <FaMoon className="w-5 h-5" /> : <FaSun className="text-yellow-400 w-5 h-5" />}
          </button>

          {/* Auth */}
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="cursor-pointer">
                  <Avatar className="h-10 w-10 border-2 border-yellow-400">
                    <AvatarImage src={user.photoUrl || userLogo} />
                    <AvatarFallback>{(user.firstName || "U").slice(0, 1)}</AvatarFallback>
                  </Avatar>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem onClick={() => navigate("/dashboard/profile")}>
                    <User className="mr-2" /> Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/dashboard/your-blog")}>
                    <BarChart2 className="mr-2" /> Your Blog
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/dashboard/comments")}>
                    <LiaCommentSolid className="mr-2" /> Comments
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/dashboard/write-blog")}>
                    <FaRegEdit className="mr-2" /> Write Blog
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logoutHandler}>
                  <LogOut className="mr-2" /> Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="hidden md:flex gap-4">
              <Link to="/login" className="text-white hover:text-yellow-400">
                Login
              </Link>
              <Link to="/signup" className="text-white hover:text-yellow-400">
                Register
              </Link>
            </div>
          )}

          {/* Mobile menu toggle */}
          <button
            className="md:hidden text-white z-50"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label="Toggle mobile menu"
          >
            {mobileOpen ? <HiMenuAlt1 className="w-7 h-7" /> : <HiMenuAlt3 className="w-7 h-7" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30"
          onClick={() => {
            setMobileOpen(false);
            setMobileDropdown(null);
          }}
        ></div>
      )}

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 left-0 z-40 h-screen w-[75%] bg-white dark:bg-gray-800 px-8 pb-6 pt-16 text-black dark:text-gray-100 md:hidden transition-transform duration-300 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <nav className="flex flex-col gap-6">
          {navItems.map((item, idx) =>
            item.children ? (
              <div key={idx}>
                <button
                  onClick={() =>
                    setMobileDropdown(mobileDropdown === idx ? null : idx)
                  }
                  className="flex justify-between w-full text-left text-xl font-semibold"                >
                  {item.title} {mobileDropdown === idx ? "▾" : "▸"}
                </button>
                {mobileDropdown === idx && (
                  <ul className="pl-4 mt-2 flex flex-col gap-2">
                    {item.children.map((child, i) => (
                      <li key={i}>
                        <Link
                          to={`/search?q=${encodeURIComponent(child)}`}
                          onClick={() => {
                            setMobileOpen(false); // close mobile menu
                            setMobileDropdown(null); // close submenu
                          }}
                          className="text-lg hover:text-yellow-400 transition-colors"
                        >
                          {child}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ) : (
              <Link
                key={idx}
                to={item.to}
                onClick={() => setMobileOpen(false)} // close mobile menu
                className="text-xl font-semibold hover:text-yellow-400 transition-colors"
              >
                {item.title}
              </Link>
            )
          )}
          {/* Mobile Logout Button */}
          {user && (
            <button
              onClick={logoutHandler}
              className="text-left text-xl font-semibold hover:text-yellow-400 transition-colors mt-4"
            >
              <LogOut className="inline mr-2" />
              Logout
            </button>
          )}
        </nav>
      </div>
    </nav>
  );
};

export default Navbar;
               
