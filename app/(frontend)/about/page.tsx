import type { Metadata } from "next";
import { SITE_URL } from "@/lib/constants";
import CustumImage from "@/components/shared/CustumImage";
import { Typography } from "@/components/ui/typography";
import { Award, Users } from "lucide-react";
import AboutWidget from "@/features/frontend/about/AboutWidget";
import { generatePageMetadata } from "@/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  return await generatePageMetadata(
    "About Us",
    "Learn about our mission, values, and team. With over 10 years of experience and 500+ satisfied clients, we're here to help you find your perfect property.",
    `${SITE_URL}/about`
  );
}

const AboutPage = () => {
  return (
    <section className="container mx-auto px-4 lg:px-8 py-16">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="space-y-6">
            <Typography variant="h1" className="text-4xl">
              Our Story
            </Typography>
            <Typography>
              We started Real Estate Pro with a simple belief: finding and
              selling property should feel transparent, guided, and personal.
              Our team of experienced agents and analysts combines market
              expertise with hands-on support to help you make confident
              decisions at every step.
            </Typography>
            <Typography>
              From curated listings to in-depth neighborhood insights, we focus
              on tailoring the buying and selling experience to your goals.
              Whether you are purchasing your first home or expanding your
              investment portfolio, we are here to build a lasting partnership.
            </Typography>
            <div className="grid gap-6 sm:grid-cols-2">
              <AboutWidget
                title="10+ Years of Experience"
                description="Navigating the real-estate market with data-driven insights and local expertise."
                icon={Award}
                variant="primary"
              />
              <AboutWidget
                title="500+ Satisfied Clients"
                description="Families and investors we have supported through sales, rentals, and property management."
                icon={Users}
                variant="secondary"
              />
            </div>
          </div>
          <CustumImage
            src="https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?w=800&h=600&fit=crop"
            alt="Modern real estate team collaborating in an office"
            className="h-80 w-full lg:h-[480px]"
            imageClassName="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
      </div>
    </section>
  );
};

export default AboutPage;
