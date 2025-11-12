import ContactData from "@/features/frontend/contact/ContactData";
import ContactFormular from "@/features/frontend/contact/ContactFormular";
import ContactMap from "@/features/frontend/contact/ContactMap";
import { Typography } from "@/components/ui/typography";
import { APP_NAME, CONTACT_PHONE, SITE_URL } from "@/lib/constants";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `Contact Us | ${APP_NAME}`,
  description: `Get in touch with ${APP_NAME}. Visit our office, call us at ${CONTACT_PHONE}, or send us a message. We're here to help with all your real estate needs.`,
  openGraph: {
    title: `Contact Us | ${APP_NAME}`,
    description: `Get in touch with ${APP_NAME}. Visit our office, call us at ${CONTACT_PHONE}, or send us a message. We're here to help with all your real estate needs.`,
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
            <ContactMap />
            <ContactFormular />
          </div>

          <aside>
            <ContactData />
          </aside>
        </div>
      </div>
    </section>
  );
};

export default ContactPage;
