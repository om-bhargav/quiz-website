import { UserPlus, Gamepad2, BadgeDollarSign, ArrowDown } from "lucide-react";

const steps = [
  {
    step: "01",
    icon: UserPlus,
    title: "Download & Sign Up",
    description: "Install QuizWin from the Play Store and create your free account. Instantly get 100 bonus tokens!",
    bg: "bg-neo-yellow",
  },
  {
    step: "02",
    icon: Gamepad2,
    title: "Choose & Play",
    description: "Browse quiz categories — from Science to Bollywood. Use tokens to enter a game and start answering!",
    bg: "bg-neo-blue",
  },
  {
    step: "03",
    icon: BadgeDollarSign,
    title: "Win & Withdraw",
    description: "Answer correctly to win prize money. Withdraw your earnings directly to your bank account instantly!",
    bg: "bg-neo-pink",
  },
];

const HowToUse = () => {
  return (
    <section id="how-to-use" className="py-16 md:py-24 bg-neo-orange/40">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-block bg-background neo-border neo-shadow px-6 py-2 mb-6">
            <span className="font-bold uppercase tracking-widest text-foreground">How It Works</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            3 Simple Steps to{" "}
            <span className="bg-background neo-border px-2">Start Winning 💰</span>
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-4">
          {steps.map((step, i) => (
            <div key={i} className="flex flex-col lg:flex-row items-center gap-4 lg:gap-4 w-full lg:w-auto">
              <div className={`neo-card-hover p-8 ${step.bg} flex-1 w-full lg:max-w-sm`}>
                <div className="bg-foreground text-background neo-border w-12 h-12 flex items-center justify-center font-bold text-xl mb-4">
                  {step.step}
                </div>
                <div className="bg-background neo-border neo-shadow w-16 h-16 flex items-center justify-center mb-4">
                  <step.icon className="w-8 h-8 text-foreground" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-foreground">{step.title}</h3>
                <p className="text-foreground/80 font-medium text-lg">{step.description}</p>
              </div>
              {i < steps.length - 1 && (
                <div className="text-foreground">
                  <ArrowDown className="w-10 h-10 lg:rotate-[-90deg]" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowToUse;