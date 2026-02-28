import { MessageCircle, Mail, MapPin } from "lucide-react";
import { SITE_NAME } from "@/lib/constants";
import { Facebook, Instagram, Twitter } from "lucide-react";

const Contact = () => {
  const whatsappLink = `https://wa.me/919999999999?text=Hi%2C%20I%20want%20to%20know%20more%20about%20${SITE_NAME}!`;

  return (
    <section id="contact" className="py-16 md:py-24 bg-neo-purple/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-block bg-background neo-border neo-shadow px-6 py-2 mb-6">
            <span className="font-bold uppercase tracking-widest text-foreground">
              Contact Us
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            Got Questions?{" "}
            <span className="bg-neo-yellow neo-border px-2">
              Let's Talk! 💬
            </span>
          </h2>
          <p className="text-lg text-foreground/80 max-w-xl mx-auto">
            Reach out to us anytime — we'd love to hear from you. Drop a message
            on WhatsApp or fill out the form below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Contact Form */}
          <div className="neo-card bg-background p-8">
            <h3 className="text-2xl font-bold mb-6 text-foreground">
              Send us a Message
            </h3>
            <form className="space-y-4">
              <div>
                <label className="block font-bold text-foreground mb-1 text-sm uppercase tracking-wide">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Your name"
                  className="w-full neo-border px-4 py-3 bg-background text-foreground font-medium focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block font-bold text-foreground mb-1 text-sm uppercase tracking-wide">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full neo-border px-4 py-3 bg-background text-foreground font-medium focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block font-bold text-foreground mb-1 text-sm uppercase tracking-wide">
                  Message
                </label>
                <textarea
                  rows={4}
                  placeholder="Tell us what's on your mind..."
                  className="w-full neo-border px-4 py-3 bg-background text-foreground font-medium resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <button
                type="submit"
                className="neo-btn bg-neo-pink text-primary-foreground w-full text-center"
              >
                Send Message 🚀
              </button>
            </form>
          </div>

          {/* WhatsApp + Info */}
          <div className="flex flex-col gap-6">
            <div className="neo-card bg-neo-blue p-6 text-center">
              <div className="flex justify-center items-center gap-6">
                <a
                  href="https://www.facebook.com/yourpage"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-foreground hover:opacity-80 transition flex items-center gap-2"
                >
                  <Facebook size={20} strokeWidth={3} />
                  Facebook
                </a>
                <a
                  href="https://www.instagram.com/yourpage"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-foreground hover:opacity-80 transition flex items-center gap-2"
                >
                  <Instagram size={20} strokeWidth={3} />
                  Instagram
                </a>
                <a
                  href="https://twitter.com/yourpage"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-foreground hover:opacity-80 transition flex items-center gap-2"
                >
                  <Twitter size={20} strokeWidth={3} />
                  Twitter
                </a>
              </div>
            </div>

            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="neo-card-hover bg-neo-green p-8 flex items-center gap-6 group"
            >
              <div className="bg-background neo-border neo-shadow w-16 h-16 flex items-center justify-center flex-shrink-0">
                <MessageCircle className="w-8 h-8 text-foreground" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-1">
                  Chat on WhatsApp
                </h3>
                <p className="text-foreground/80 font-medium">
                  Get instant support and quick answers. Tap to start chatting!
                </p>
              </div>
            </a>

            <div className="neo-card bg-neo-yellow p-8">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-background neo-border neo-shadow w-12 h-12 flex items-center justify-center">
                  <Mail className="w-6 h-6 text-foreground" />
                </div>
                <div>
                  <p className="font-bold text-foreground">Email Us</p>
                  <p className="text-foreground/70 font-medium">
                    support@{SITE_NAME}.app
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="bg-background neo-border neo-shadow w-12 h-12 flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-foreground" />
                </div>
                <div>
                  <p className="font-bold text-foreground">Location</p>
                  <p className="text-foreground/70 font-medium">India</p>
                </div>
              </div>
            </div>

            <div className="neo-card bg-neo-blue p-6 text-center">
              <p className="font-bold text-foreground text-lg">
                📱 Available on Android — Download Now!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
