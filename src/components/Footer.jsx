import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaInstagram,
  FaPinterest,
  FaTwitterSquare,
} from "react-icons/fa";
import { FaTiktok } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer
      className="bg-black text-white pt-12 pb-6"
      style={{
        fontFamily: `'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif`,
      }}
    >
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-10">
        {/* Logo & Info */}
        <div>
          <Link to="/" className="flex gap-2 items-center mb-4">
            <h1 className="text-2xl font-extrabold tracking-wide">
              Nairobi<span className="text-yellow-400">Estate</span>
            </h1>
          </Link>
          <p className="text-sm leading-relaxed">
            Sharing insights, tutorials, and fresh ideas on Real Estate across
            Nairobi and beyond.
          </p>
          <div className="mt-4 space-y-1 text-sm">
            <p>Nairobi,Kenya </p>
            <p>✉ NairobiEstate@blog.com</p>
            <p>📞 +254 0466 9973</p>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link
                to="/"
                className="hover:text-yellow-400 transition-colors duration-300"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/blogs"
                className="hover:text-yellow-400 transition-colors duration-300"
              >
                Blogs
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="hover:text-yellow-400 transition-colors duration-300"
              >
                About Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
          <div className="flex space-x-4 text-2xl">
            <a
              href="https://www.facebook.com/nairobiestate"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-yellow-400 transition-colors duration-300"
            >
              <FaFacebook />
            </a>
            <a
              href="https://www.instagram.com/nairobiestate"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-yellow-400 transition-colors duration-300"
            >
              <FaInstagram />
            </a>
            <a
              href="https://www.tiktok.com/@nairobiestate"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-yellow-400 transition-colors duration-300"
            >
              <FaTiktok />
            </a>
          </div>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Stay in the Loop</h3>
          <p className="text-sm mb-4">
            Subscribe for offers, market insights, and more.
          </p>
          <form className="flex">
            <input
              type="email"
              placeholder="Your email address"
              className="w-full p-2 rounded-l-md bg-white text-black placeholder-black focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <button
              type="submit"
              className="bg-yellow-400 text-black font-semibold px-4 rounded-r-md hover:bg-black hover:text-yellow-400 transition-colors duration-300"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-10 border-t border-white pt-4 text-center text-sm">
        <p>
          &copy; {new Date().getFullYear()}{" "}
          <span className="font-semibold">
            Nairobi<span className="text-yellow-400">Estate</span>
          </span>
          . All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
