// import link f÷rom next link - msg for om ~

import Link from "next/link";
import { SITE_NAME } from "@/lib/constants";

const Footer = () => {
  const breakPoint = 3;
  return (
    <footer className="bg-foreground py-8">
      <div className=" px-6">
        <div className="flex flex-col md:flex-row items-center text-center justify-between gap-4">
          <p className="text-background font-bold text-lg">
            {SITE_NAME.slice(0,breakPoint)}<span className="bg-neo-pink neo-border px-1 text-primary-foreground">{SITE_NAME.slice(breakPoint)}</span>
          </p>
          <p className="text-background/70 font-medium text-sm">
            © 2026 {SITE_NAME}. All rights reserved. Play responsibly.
          </p>
          <div className="flex max-md:flex-col gap-4">
            <Link href={"/privacy-policy"} className="text-background/70 hover:text-background font-bold text-sm uppercase">Privacy Policy</Link> <span className="mx-2 text-background/70 max-md:hidden">|</span>
            <Link href={"/terms-and-conditions"} className="text-background/70 hover:text-background font-bold text-sm uppercase">Terms & Conditions</Link> <span className="mx-2 text-background/70 max-md:hidden">|</span>
            <Link href={"/refund-policy"} className="text-background/70 hover:text-background font-bold text-sm uppercase">Refund Policy</Link> <span className="mx-2 text-background/70 max-md:hidden">|</span>
            <Link href={"/withdraw-policy"} className="text-background/70 hover:text-background font-bold text-sm uppercase">Widthdraw Policy</Link> <span className="mx-2 text-background/70 max-md:hidden">|</span>
            <Link href={"/gaming-policy"} className="text-background/70 hover:text-background font-bold text-sm uppercase">Responsible Gaming Policy</Link>

          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
