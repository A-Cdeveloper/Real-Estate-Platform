import type { Metadata } from "next";
import { SITE_URL } from "@/lib/constants";
import CustumImage from "@/components/shared/ui/CustumImage";
import { Typography } from "@/components/ui/typography";
import { Award, Users } from "lucide-react";
import AboutWidget from "@/features/frontend/about/AboutWidget";
import { generatePageMetadata } from "@/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  return await generatePageMetadata(
    "About Us",
    "Learn about our mission to connect real estate agencies. We're a B2B platform facilitating partnerships between agencies, enabling property sharing, collaboration, and mutual growth in the real estate industry.",
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
              We started Real Estate Pro with a vision to connect real estate
              agencies and facilitate meaningful partnerships. As a B2B platform,
              we enable agencies to share properties, collaborate on listings,
              and grow their businesses together through strategic partnerships.
            </Typography>
            <Typography>
              Our platform provides agencies with the tools and network needed
              to expand their reach, access a wider property portfolio, and
              create mutually beneficial relationships. Whether you&apos;re a small
              local agency or a large real estate firm, we&apos;re here to help you
              connect with partners and grow your business.
            </Typography>
            <div className="grid gap-6 sm:grid-cols-2">
              <AboutWidget
                title="10+ Years of Experience"
                description="Connecting real estate agencies with proven expertise in B2B partnerships and network building."
                icon={Award}
                variant="primary"
              />
              <AboutWidget
                title="500+ Partner Agencies"
                description="Real estate agencies connected through our platform, sharing properties and growing together."
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
