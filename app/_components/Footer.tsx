import { SITE_NAME } from "@/lib/constants";
const Footer = () => {
  const breakPoint = 3;
  return (
    <footer className="bg-foreground py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-background font-bold text-lg">
            {SITE_NAME.slice(0,breakPoint)}<span className="bg-neo-pink neo-border px-1 text-primary-foreground">{SITE_NAME.slice(breakPoint)}</span>
          </p>
          <p className="text-background/70 font-medium text-sm">
            © 2026 {SITE_NAME}. All rights reserved. Play responsibly.
          </p>
          <div className="flex gap-4">
            <a href="#" className="text-background/70 hover:text-background font-bold text-sm uppercase">Privacy</a>
            <a href="#" className="text-background/70 hover:text-background font-bold text-sm uppercase">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;