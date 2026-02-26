import Navbar from "./_components/Navbar";
import Hero from "./_components/Hero";
import About from "./_components/About";
import HowToUse from "./_components/HowToUse";
import Testimonials from "./_components/Testimonials";
import Contact from "./_components/Contact";
import Footer from "./_components/Footer";

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
