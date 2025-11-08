import type { Metadata } from "next";
import { APP_NAME, SITE_URL } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Typography } from "@/components/ui/typography";

export const metadata: Metadata = {
  title: `Contact Us | ${APP_NAME}`,
  description:
    "Get in touch with Real Estate Pro. Visit our office in Toronto, call us at +1 (647) 987-4321, or send us a message. We're here to help with all your real estate needs.",
  openGraph: {
    title: `Contact Us | ${APP_NAME}`,
    description:
      "Get in touch with Real Estate Pro. Visit our office in Toronto, call us at +1 (647) 987-4321, or send us a message. We're here to help with all your real estate needs.",
    url: `${SITE_URL}/contact`,
    type: "website",
  },
};

const ContactPage = () => {
  return (
    <section className="container mx-auto px-4 lg:px-8 py-16">
      <div className="mx-auto max-w-6xl space-y-12">
        <header className="space-y-3 text-center lg:text-left">
          <Typography variant="h1" className="text-4xl">
            Get in Touch
          </Typography>
          <Typography className="text-muted-foreground max-w-2xl">
            Whether you are buying, selling, or just exploring the market, our
            team is here to guide you. Reach out using the form below or visit
            us at our office for a personal consultation.
          </Typography>
        </header>

        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:items-start">
          <div className="space-y-8">
            <div className="overflow-hidden rounded-2xl shadow-lg ring-1 ring-border/50">
              <iframe
                title="Real Estate Pro office location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2886.5353721262867!2d-79.39252372388835!3d43.65188785372852!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882b34d719ca95ab%3A0xbf73f45c7cfb3523!2sFinancial%20District%2C%20Toronto%2C%20ON%2C%20Canada!5e0!3m2!1sen!2srs!4v1730970212345!5m2!1sen!2srs"
                className="h-[360px] w-full border-0"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            <div className="rounded-2xl border bg-card p-8 shadow-sm">
              <Typography variant="h2" className="mb-6 text-2xl">
                Send us a message
              </Typography>
              <form className="grid gap-4">
                <div className="grid gap-2">
                  <label
                    className="font-nunito-sans text-sm font-semibold"
                    htmlFor="name"
                  >
                    Full name
                  </label>
                  <Input id="name" placeholder="Jane Doe" required />
                </div>
                <div className="grid gap-2">
                  <label
                    className="font-nunito-sans text-sm font-semibold"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="jane@company.com"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <label
                    className="font-nunito-sans text-sm font-semibold"
                    htmlFor="phone"
                  >
                    Phone (optional)
                  </label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
                <div className="grid gap-2">
                  <label
                    className="font-nunito-sans text-sm font-semibold"
                    htmlFor="message"
                  >
                    How can we help?
                  </label>
                  <Textarea
                    id="message"
                    placeholder="Tell us a bit about your needs or the property you are interested in."
                    rows={5}
                    required
                  />
                </div>
                <Button type="submit" className="mt-2 w-full sm:w-auto">
                  Submit message
                </Button>
              </form>
            </div>
          </div>

          <aside className="space-y-8">
            <div className="rounded-2xl border bg-secondary/30 p-8 shadow-sm">
              <Typography variant="h2" className="text-2xl">
                Visit our office
              </Typography>
              <div className="mt-4 space-y-3 text-sm text-muted-foreground">
                <p className="font-semibold text-foreground">
                  Real Estate Pro HQ
                </p>
                <p>120 Bay Street, Suite 1800</p>
                <p>Toronto, ON M5J 2N8</p>
                <p>Canada</p>
              </div>
              <div className="mt-6 space-y-3 text-sm text-muted-foreground">
                <p>
                  <span className="font-semibold text-foreground">Phone:</span>{" "}
                  +1 (647) 987-4321
                </p>
                <p>
                  <span className="font-semibold text-foreground">Email:</span>{" "}
                  <a
                    href="mailto:hello@realestatepro.com"
                    className="text-primary hover:underline"
                  >
                    hello@realestatepro.com
                  </a>
                </p>
                <p>
                  <span className="font-semibold text-foreground">
                    Working hours:
                  </span>{" "}
                  Monday – Friday, 9:00 – 18:00
                </p>
              </div>
            </div>

            <div className="rounded-2xl border bg-card p-8 shadow-sm">
              <Typography variant="h2" className="text-2xl">
                Need an instant response?
              </Typography>
              <Typography className="mt-3 text-sm text-muted-foreground">
                Chat with our on-call agent team between 8:00 and 22:00. We are
                ready to help with property tours, valuations, or contract
                questions.
              </Typography>
              <Button variant="secondary" className="mt-6 w-full">
                Start live chat
              </Button>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default ContactPage;
