import React from "react";

const Footer = () => {
  return (
    <footer className="w-full py-4 mt-6 px-6 md:px-12 flex flex-col md:flex-row items-center justify-between text-gray-600 text-sm">
      <div className="mb-6 md:mb-0 text-center md:text-left">
        © 2025 <span className="font-semibold">MedEsi</span>
      </div>

      <div className="flex space-x-6 mb-6 md:mb-0">
        <img src="Button.svg" alt="Twitter" className="w-7 h-7 cursor-pointer hover:opacity-80" />
        <img src="Button-1.svg" alt="LinkedIn" className="w-7 h-7 cursor-pointer hover:opacity-80" />
        <img src="Button-2.svg" alt="Instagram" className="w-7 h-7 cursor-pointer hover:opacity-80" />
        <img src="Button-3.svg" alt="Facebook" className="w-7 h-7 cursor-pointer hover:opacity-80" />
        <img src="Button-4.svg" alt="Dribbble" className="w-7 h-7 cursor-pointer hover:opacity-80" />
        <img src="Button-5.svg" alt="GitHub" className="w-7 h-7 cursor-pointer hover:opacity-80" />
      </div>

      <div className="flex items-center space-x-8">
        <a href="#" className="hover:underline">Privacy</a>
        <a href="#" className="hover:underline">Terms</a>
        <a href="#" className="hover:underline">Cookies</a>
      </div>
    </footer>
  );
};

export default Footer;
