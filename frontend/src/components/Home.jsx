import React from "react";
import { useNavigate } from "react-router-dom";
import FeaturedInternships from "./FeaturedInternships";
import FeaturedCompanies from "./FeaturedCompanies";
import Benefits from "./Benefits";
import Testimonials from "./Testimonials";
import Hero from "./Hero";
const Home = () => {
  const navigate = useNavigate();
  return (
    <>
      <Hero />
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
    </>
  );
};

export default Home;
