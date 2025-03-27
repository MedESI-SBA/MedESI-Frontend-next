"use client"; 
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const AboutSection = () => {
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsLargeScreen(window.innerWidth >= 1024);
      const handleResize = () => setIsLargeScreen(window.innerWidth >= 1024);
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  return (
    <div 
      className="relative flex flex-col md:flex-row items-center justify-center min-h-screen bg-cover bg-center px-8 md:px-16 py-16 md:py-20"
      style={{ backgroundImage: `url(bgabout.svg)` }}
    >
      <div className="w-full md:w-1/2 flex justify-center">
        <motion.img 
          src="Phone.svg" 
          alt="Phone Mockup" 
          className="w-[220px] sm:w-[270px] md:w-[320px] lg:w-[370px] xl:w-[420px] max-w-full sm:mb-6 h-[400px] sm:h-[450px] md:h-[500px] lg:h-[550px] xl:h-[600px] object-contain"
          animate={isLargeScreen ? { y: [0, -20, 0] } : {}} // Only animate on large screens
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
      <div className="w-full md:w-1/2 text-center md:text-left space-y-4 md:space-y-6">
        <h2 className="text-2xl md:text-3xl text-black-600 font-bold">ABOUT</h2>
        <h3 className="text-xl md:text-4xl text-transparent font-semibold">
          <span className="bg-gradient-to-r from-[#2FD9FF] to-[#2E00FF] text-transparent bg-clip-text">
            MedEsi
          </span>
        </h3>
        <p className="text-gray-600 text-lg leading-relaxed px-2 sm:px-0">
          At MedEsi, we are dedicated to revolutionizing healthcare by combining innovation and compassion.  
          Our goal is to provide cutting-edge medical solutions that enhance your well-being, ensuring a healthier  
          and brighter future. Whether it’s advanced diagnostics or personalized care, we put your health first.  
          Join us in shaping the future of healthcare, where every individual receives the care they truly deserve.
        </p>
        <button className="mt-6 px-12 py-2 text-white font-semibold text-lg bg-gradient-to-r from-[#2FD9FF] to-[#2E00FF] rounded-lg shadow-lg transition-all duration-300 hover:scale-105">
          Contact
        </button>
      </div>
    </div>
  );
};

export default AboutSection;
