"use client";
import About from "../_components/About";
import Contact from "../_components/Contact";
import Footer from "../_components/Footer";
import Hero from "../_components/Hero";
import HowToUse from "../_components/HowToUse";
import Navbar from "../_components/Navbar";
import Testimonials from "../_components/Testimonials";

const Index = () => {
  return (
    <div className="min-h-screen grid bg-background">
      <Navbar />
      <Hero />
      <About />
      <HowToUse />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
