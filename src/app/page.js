"use client";
import { useState } from "react";
import Hero from "@/components/Hero/Hero";
import AboutSection from "@/components/About/About";
import How from "@/components/How/How";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";

export default function Home() {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      <Navbar showLogin={showLogin} setShowLogin={setShowLogin}/>
      <Hero showLogin={showLogin} setShowLogin={setShowLogin} />
      <AboutSection />
      <How />
      <Footer/>
    </>
  );
}