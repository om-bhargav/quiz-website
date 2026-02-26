import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Rahul S.",
    location: "Mumbai",
    quote: "I earned ₹5,000 in my first week just by playing quizzes on topics I love. The withdrawal was instant!",
    stars: 5,
    bg: "bg-neo-yellow",
  },
  {
    name: "Priya M.",
    location: "Delhi",
    quote: "Best quiz app ever! The 100 free tokens helped me start without spending anything. Now I play daily!",
    stars: 5,
    bg: "bg-neo-blue",
  },
  {
    name: "Amit K.",
    location: "Bangalore",
    quote: "The categories are amazing — I'm a cricket fan and there's always a sports quiz waiting. Super easy to cash out!",
    stars: 5,
    bg: "bg-neo-green",
  },
  {
    name: "Sneha R.",
    location: "Pune",
    quote: "I was skeptical at first, but the money really does hit your bank account. Withdrew ₹2,000 with no issues!",
    stars: 4,
    bg: "bg-neo-pink",
  },
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-block bg-neo-green neo-border neo-shadow px-6 py-2 mb-6">
            <span className="font-bold uppercase tracking-widest text-foreground">Testimonials</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            Real Players,{" "}
            <span className="bg-neo-pink neo-border px-2 text-primary-foreground">Real Wins 🎉</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {testimonials.map((t, i) => (
            <div key={i} className={`neo-card-hover p-6 ${t.bg}`}>
              <Quote className="w-8 h-8 text-foreground mb-3" />
              <p className="text-lg font-medium text-foreground mb-4">"{t.quote}"</p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-bold text-foreground">{t.name}</p>
                  <p className="text-foreground/70 text-sm font-medium">{t.location}</p>
                </div>
                <div className="flex gap-0.5">
                  {Array.from({ length: t.stars }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-foreground text-foreground" />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;