"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = ({ setShowLogin }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsOpen(false); 
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-white shadow-md font-montserrat relative">
      <div 
      className="flex items-center relative" 
      onMouseEnter={() => setIsHovered(true)} 
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.img
        src="Logo.svg"
        alt="MedEsi Logo"
        className="h-12 cursor-pointer"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        whileHover={{ rotate: 360, transition: { duration: 0.6 } }}
      />

      <motion.h1
        className="ml-2 text-2xl font-bold bg-gradient-to-r from-[#2FD9FF] to-[#2E00FF] text-transparent bg-clip-text"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : -20 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        MedEsi
      </motion.h1>
    </div>

      <ul className="hidden md:flex space-x-8 font-semibold text-[16px] capitalize">
        {["About", "Services", "Technologies", "How To"].map((item, index) => (
          <li key={index} className="cursor-pointer hover:text-blue-500">
            {item}
          </li>
        ))}
      </ul>

      <div className="hidden md:flex space-x-4">
        <button className="px-4 py-2 border border-black rounded-lg font-semibold hover:bg-black hover:text-white cursor-pointer transition-all duration-300">
          Contact Us
        </button>
        <button
          className="px-8 py-2 bg-gradient-to-r from-[#2FD9FF] to-[#2E00FF] text-white rounded-lg font-semibold cursor-pointer hover:scale-105 transition-all duration-300"
          onClick={() => setShowLogin(true)}
        >
          Login
        </button>
      </div>

      {isMobile && (
        <button className="md:hidden" onClick={() => setIsOpen(true)}>
          <img src="Hamburger-Button.svg"alt="Menu Icon" className="h-8 w-8 cursor-pointer" />
        </button>
      )}

      <AnimatePresence>
  {isOpen && (
    <motion.div
      className="fixed inset-0 bg-white z-50 flex flex-col p-6"
      initial={{ x: "100%", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: "100%", opacity: 0 }} 
      transition={{ duration: 0.4, ease: "easeInOut" }}
    >
      <div className="flex justify-between items-center">
        <motion.img
          src="Logo.svg"
          alt="MedEsi Logo"
          className="h-12 cursor-pointer"
          whileHover={{ rotate: 360, transition: { duration: 0.5 } }}
        />
        <button onClick={() => setIsOpen(false)} className="cursor-pointer">
          <img src="clear.svg" alt="Close" className="h-8 w-8" />
        </button>
      </div>

      <ul className="mt-8 space-y-4 text-[16px] font-semibold text-[#B5B5B5] text-left pl-4">
        {["About", "Services", "Technologies", "How To", "Login", "Contact"].map(
          (item, index) => (
            <li
              key={index}
              className="cursor-pointer border-b border-[#B5B5B5] pb-3"
              onClick={() => {
                if (item === "Login") setShowLogin(true);
                setIsOpen(false);
              }}
            >
              {item}
            </li>
          )
        )}
      </ul>
    </motion.div>
  )}
</AnimatePresence>

    </nav>
  );
};

export default Navbar;
