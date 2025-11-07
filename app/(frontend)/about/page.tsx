import CustumImage from "@/components/frontend/CustumImage";
import { Typography } from "@/components/ui/typography";

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
              <div className="rounded-lg border bg-card p-6 shadow-sm">
                <Typography variant="h3" className="text-2xl">
                  10+ Years
                </Typography>
                <Typography className="text-muted-foreground">
                  Navigating the real-estate market with data-driven insights
                  and local expertise.
                </Typography>
              </div>
              <div className="rounded-lg border bg-card p-6 shadow-sm">
                <Typography variant="h3" className="text-2xl">
                  500+ Clients
                </Typography>
                <Typography className="text-muted-foreground">
                  Families and investors we have supported through sales,
                  rentals, and property management.
                </Typography>
              </div>
            </div>
          </div>
          <CustumImage
            src="https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?q=80&fm=jpg&w=1600&fit=crop"
            alt="Modern real estate team collaborating in an office"
            className="h-80 w-full lg:h-[480px]"
            imageClassName="object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default AboutPage;
