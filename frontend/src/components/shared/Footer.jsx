import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-100 mt-4 py-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Quick Links</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-800">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-800">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-800">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Solutions */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Social</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-800">
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/choudharyabhishekk"
                  target="_blank"
                  className="text-gray-600 hover:text-gray-800"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-800">
                  Facebook
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Company</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-800">
                  Culture
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-800">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-800">
                  Early Talent
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Support</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-800">
                  FAQs
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-800">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-800">
                  (548) 123-456
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 text-center">
          <p className="text-sm text-gray-600">
            Designed with ❤️ by{" "}
            <a
              className=""
              href="https://github.com/choudharyabhishekk"
              target="_blank"
            >
              Abhishek Choudhary{" "}
            </a>
            • © Copyright 2024
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
