import React from "react";
import {
  Building2,
  BarChart3,
  Users,
  BookOpen,
  Globe2,
  MapPin,
  LineChart,
} from "lucide-react";

const features = [
  { icon: Building2, title: "Market Leadership", description: "Recognized as one of Kenya's leading real estate information platforms, trusted by thousands of investors and professionals." },
  { icon: Users, title: "Professional Network", description: "Connected with top real estate agents, developers, and industry professionals throughout Kenya." },
  { icon: BookOpen, title: "Expert Analysis", description: "In-depth market research and professional insights from experts with decades of experience in Nairobi's property market." },
  { icon: Globe2, title: "Community Focused", description: "Building a community of informed investors, buyers, and sellers who make confident decisions in Kenya's real estate landscape." },
  { icon: MapPin, title: "Local Expertise", description: "Deep understanding of Nairobi's neighborhoods, from Westlands to Karen, helping you find the perfect property match." },
  { icon: LineChart, title: "Market Trends", description: "Real-time updates on property values, investment opportunities, and emerging developments." },
];

const Popular = () => {
  return (
    <div
      className="max-w-7xl mx-auto px-4 md:px-0 mt-12 font-sans"
      style={{
        fontFamily: `'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif`,
      }}
    >
      {/* Section Header */}
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100">
          Your Trusted Partner in{" "}
          <span className="text-green-600 dark:text-green-400">Nairobi Real Estate</span>
        </h2>
        <p className="mt-4 text-gray-700 dark:text-gray-300 text-base md:text-lg leading-relaxed">
          NairobiEstate has been at the forefront of Kenya's real estate market for over a
          decade. We provide comprehensive insights, market analysis, and expert
          guidance to help you navigate one of Africa's most dynamic property markets.
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          const isLast = index === features.length - 1;
          return (
            <div
              key={index}
              className={`bg-white dark:bg-gray-800 shadow-lg dark:shadow-gray-700 rounded-2xl p-6 text-center hover:shadow-2xl transition ${isLast ? "mb-12" : ""}`}
            >
              <div className="flex justify-center items-center w-14 h-14 rounded-full bg-green-100 dark:bg-green-900/30 mx-auto mb-4">
                <Icon className="text-green-600 dark:text-green-400" size={28} />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                {feature.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Popular;
