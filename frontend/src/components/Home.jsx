import React from "react";
import banner from "../assets/banner.png";
import Navbar from "./shared/Navbar";
import Footer from "./shared/Footer";
import { useNavigate } from "react-router-dom";
import abtImg from "../assets/about.png";
import Stats from "./Stats";
import FeaturedInternships from "./FeaturedInternships";
import FeaturedCompanies from "./FeaturedCompanies";
import Benefits from "./Benefits";
import Testimonials from "./Testimonials";
const Home = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="font-sans">
        {/* Hero Section */}
        <section
          className="relative bg-center text-white py-44 text-center"
          style={{
            backgroundImage: `url(${banner})`, // Apply the imported banner image
          }}
        >
          {/* Overlay to darken the background */}
          <div className="absolute inset-0 bg-black opacity-50"></div>

          <div className="relative z-10 max-w-4xl mx-auto px-4">
            <h1 className="text-5xl font-bold tracking-tight text-white sm:text-6xl md:text-6xl">
              Launch Your Career
            </h1>
            <p className="mt-6 text-xl text-white/90 mb-6 max-w-2xl mx-auto">
              Start your career journey with our exclusive internship
              opportunities.
            </p>

            <button
              className="px-4 py-3 border  text-white-400 font-bold text-lg rounded-lg hover:bg-blue-500 transition duration-500 ease-in-out"
              onClick={() => {
                navigate("/jobs");
              }}
            >
              Browse Internships
            </button>
          </div>
        </section>
        <Benefits />
        <FeaturedInternships />
        <Testimonials />
        <FeaturedCompanies />
        <section className="bg-gradient-to-r from-blue-400 to-indigo-600 py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-6">
              Ready to Start Your Journey?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Join thousands of students who have found their dream internships
              through InternHub.
            </p>
            <button
              onClick={() => {
                navigate("/signup");
              }}
              className="bg-white text-blue-600 px-8 py-3 rounded-md font-semibold hover:bg-blue-50 transition"
            >
              Get Started Today
            </button>
          </div>
        </section>
        {/* Footer */}
      </div>
    </>
  );
};

export default Home;
