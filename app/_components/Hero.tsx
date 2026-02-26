import { Smartphone, Star, Zap } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-background py-16 md:py-24">
      {/* Subtle decorative elements */}
      <div className="absolute top-20 right-10 w-16 h-16 neo-border rotate-12 hidden md:block opacity-10 bg-muted" />
      <div className="absolute bottom-32 left-16 w-10 h-10 neo-border -rotate-6 hidden lg:block opacity-10 bg-muted" />

      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Left content */}
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-block neo-border neo-shadow px-4 py-2 mb-6 bg-card">
              <span className="text-foreground font-bold uppercase tracking-widest text-sm">
                🧠 Learn. Play. Earn.
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 text-foreground">
              Turn Your
              <br />
              <span className="bg-neo-blue/20 neo-border px-3 inline-block mt-2">Knowledge</span>
              <br />
              <span className="bg-neo-pink/20 neo-border px-3 inline-block mt-2">
                Into Rewards 🏆
              </span>
            </h1>

            <p className="text-lg md:text-xl font-medium mb-8 max-w-lg mx-auto lg:mx-0 text-muted-foreground">
              Sign up and get <strong className="text-foreground">100 free tokens</strong> instantly. 
              Choose from your favourite quiz categories, answer questions, and withdraw your winnings 
              straight to your bank account.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a
                href="#"
                className="neo-btn bg-foreground text-background text-center text-lg">
                <Smartphone className="inline-block mr-2 w-5 h-5" />
                Download for Android
              </a>
              <a
                href="#how-to-use"
                className="neo-btn bg-card text-foreground text-center text-lg">
                How It Works →
              </a>
            </div>

            <div className="flex items-center gap-6 mt-8 justify-center lg:justify-start">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((i) =>
                  <Star key={i} className="w-5 h-5 fill-foreground text-foreground" />
                )}
              </div>
              <span className="font-bold text-muted-foreground">4.8/5 · 10K+ Downloads</span>
            </div>
          </div>

          {/* Right - Phone mockup */}
          <div className="flex-1 flex justify-center">
            <div className="relative">
              {/* Phone frame */}
              <div className="relative w-[280px] md:w-[300px]">
                {/* Phone body */}
                <div className="bg-foreground rounded-[40px] p-[6px] neo-shadow-xl">
                  {/* Phone inner bezel */}
                  <div className="bg-foreground rounded-[36px] p-[2px] relative">
                    {/* Notch */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-foreground rounded-b-2xl z-10" />
                    {/* Screen */}
                    <div className="rounded-[34px] overflow-hidden bg-background">
                      <img
                        src={"/hero-phone.png"}
                        alt="QuizWin App Screenshot"
                        className="w-full h-auto block"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating badges */}
              <div className="absolute -top-4 -right-6 bg-card neo-border neo-shadow px-3 py-2 rotate-6 animate-bounce-subtle">
                <span className="font-bold text-foreground text-sm">100 FREE TOKENS!</span>
              </div>
              <div className="absolute -bottom-4 -left-6 bg-card neo-border neo-shadow px-3 py-2 -rotate-3">
                <Zap className="inline w-4 h-4 text-foreground" />
                <span className="font-bold text-foreground text-sm ml-1">INSTANT WITHDRAW</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Marquee bar */}
      <div className="mt-20 bg-foreground neo-border py-3 overflow-hidden">
        <div className="marquee whitespace-nowrap">
          <span className="text-background font-bold text-lg tracking-widest">
            ★ PLAY QUIZ ★ WIN MONEY ★ FREE TOKENS ★ EASY WITHDRAW ★ MULTIPLE CATEGORIES ★ PLAY QUIZ ★ WIN MONEY ★ FREE TOKENS ★ EASY WITHDRAW ★ MULTIPLE CATEGORIES ★ PLAY QUIZ ★ WIN MONEY ★ FREE TOKENS ★ EASY WITHDRAW ★ MULTIPLE CATEGORIES ★
          </span>
        </div>
      </div>
    </section>
  );
};

export default Hero;