import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <main role="main" className="min-h-screen">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
