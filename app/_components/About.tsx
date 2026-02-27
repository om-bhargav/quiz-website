import { Trophy, Coins, Brain, Wallet } from "lucide-react";
import { SITE_NAME } from "@/lib/constants";
const features = [
  {
    icon: Coins,
    title: "100 Free Tokens",
    description: "Sign up and instantly receive 100 tokens as a login bonus. No purchase required!",
    bg: "bg-neo-yellow",
  },
  {
    icon: Brain,
    title: "Pick Your Category",
    description: "Play quizzes on topics you love — Science, Sports, Movies, History and more.",
    bg: "bg-neo-blue",
  },
  {
    icon: Trophy,
    title: "Win Real Money",
    description: "Answer correctly, climb the leaderboard, and earn real prize money every day.",
    bg: "bg-neo-pink",
  },
  {
    icon: Wallet,
    title: "Easy Withdrawals",
    description: "Cash out your winnings directly to your bank account — fast and hassle-free.",
    bg: "bg-neo-green",
  },
];

const About = () => {
  return (
    <section id="about" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-block bg-neo-blue neo-border neo-shadow px-6 py-2 mb-6">
            <span className="font-bold uppercase tracking-widest text-foreground">About {SITE_NAME}</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            Your Brain is Your{" "}
            <span className="bg-neo-yellow neo-border px-2">Superpower 🧠</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {SITE_NAME} is the ultimate quiz platform where knowledge pays off. Use your free tokens, play on categories you're passionate about, and earn real money!
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => (
            <div
              key={i}
              className={`neo-card-hover p-6 ${feature.bg}`}
            >
              <div className="bg-background neo-border neo-shadow w-14 h-14 flex items-center justify-center mb-4">
                <feature.icon className="w-7 h-7 text-foreground" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-foreground">{feature.title}</h3>
              <p className="text-foreground/80 font-medium">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;