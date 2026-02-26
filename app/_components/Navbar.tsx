import { Smartphone } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="bg-background neo-border border-t-0 border-x-0 sticky top-0 z-50">
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        <a href="#" className="text-2xl font-bold text-foreground tracking-tight">
          Quiz<span className="bg-neo-pink neo-border px-1 text-primary-foreground">Win</span>
        </a>

        <div className="hidden md:flex items-center gap-6">
          <a href="#about" className="font-bold text-foreground hover:text-neo-pink transition-colors uppercase text-sm tracking-wide">
            About
          </a>
          <a href="#how-to-use" className="font-bold text-foreground hover:text-neo-pink transition-colors uppercase text-sm tracking-wide">
            How It Works
          </a>
          <a href="#testimonials" className="font-bold text-foreground hover:text-neo-pink transition-colors uppercase text-sm tracking-wide">
            Reviews
          </a>
          <a href="#contact" className="font-bold text-foreground hover:text-neo-pink transition-colors uppercase text-sm tracking-wide">
            Contact
          </a>
        </div>

        <a href="#" className="neo-btn bg-neo-yellow text-foreground text-sm py-2 px-4">
          <Smartphone className="inline w-4 h-4 mr-1" />
          Download
        </a>
      </div>
    </nav>
  );
};

export default Navbar;