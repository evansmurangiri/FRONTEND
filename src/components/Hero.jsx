// src/components/Hero.jsx
import React from "react";
import heroImg from "../assets/tb2.jpg";
import { Button } from "./ui/button";

const Hero = () => {
  return (
    <section
      className="w-full relative overflow-hidden"
      style={{
        backgroundImage: `url(${heroImg})`,
        backgroundSize: "cover",
        backgroundPosition: "top center",
        fontFamily: "'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif",
      }}
    >
      {/* overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70"></div>

      {/* hero content */}
      <div className="relative z-20 max-w-6xl mx-auto px-6 py-32 md:py-40 text-center">
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight drop-shadow-md">
          <span className="text-yellow-400">Your Trusted Partner</span>{" "}
          <span className="text-white">in Real Estate</span>
        </h1>
        <p className="mt-6 text-gray-200 max-w-3xl mx-auto text-base md:text-lg leading-relaxed">
          Expert insights, guides and stories to help you navigate the property market with confidence.
        </p>
        <div className="mt-8 flex justify-center">
          <Button
            className="px-6 py-3 text-lg font-semibold bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-white transition-all duration-300 rounded-md"
            onClick={() =>
              window.scrollTo({ top: document.body.scrollHeight / 6, behavior: "smooth" })
            }
          >
            Explore Blogs
          </Button>
        </div>
      </div>

      {/* decorative big text */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div
          className="text-white/5 text-[200px] font-extrabold select-none"
          style={{
            fontFamily: "'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif",
            transform: "translateY(-15%)",
          }}
        >
          PROPERTY
        </div>
      </div>
    </section>
  );
};

export default Hero;
