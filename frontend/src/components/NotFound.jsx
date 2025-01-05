import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-red-500">404</h1>
        <p className="text-2xl text-gray-700">
          Oops! The page you are looking for does not exist.
        </p>
        <p className="text-xl text-gray-500 mt-4">
          The page may have been moved or deleted.
        </p>
        <Link
          to="/"
          className="mt-6 inline-block text-blue-500 hover:underline"
        >
          Go back to Homepage
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
