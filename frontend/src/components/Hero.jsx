import React from "react";
import { useNavigate } from "react-router-dom";
import bannerImg from "../assets/b1.avif";
const Hero = () => {
  const navigate = useNavigate();
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <div className="grid lg:grid-cols-2 gap-4 items-center">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-8">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-500">
              Launch Your Career
            </span>
            <br />
            with the Perfect Internship
          </h1>
          <p className="text-xl text-gray-600 mb-10">
            Connect with top companies, gain real-world experience, and
            kickstart your professional journey.
          </p>

          <div className="flex flex-wrap gap-4">
            <button
              className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white px-8 py-3 rounded-full font-semibold hover:opacity-90 transition-opacity"
              onClick={() => navigate("/jobs")}
            >
              Browse Internships
            </button>
            <button
              className="bg-white text-gray-800 px-8 py-3 rounded-full font-semibold hover:bg-gray-50 transition-colors border border-gray-200"
              onClick={() => navigate("/signup")}
            >
              For Companies
            </button>
          </div>
        </div>

        <div className="hidden lg:block">
          <img
            src={bannerImg}
            width={700}
            height={450}
            alt="Students collaborating"
            className="rounded-2xl shadow-3xl"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
