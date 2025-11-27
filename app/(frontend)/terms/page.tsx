import type { Metadata } from "next";
import { SITE_URL } from "@/lib/constants";
import { Typography } from "@/components/ui/typography";
import { generatePageMetadata } from "@/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  return {
    ...(await generatePageMetadata(
      "Terms & Conditions",
      "Review our Terms & Conditions. Understand your rights and responsibilities when using our platform, including property listings, account usage, and intellectual property.",
      `${SITE_URL}/terms`
    )),
    robots: {
      index: true,
      follow: true,
    },
  };
}

const TermsPage = () => {
  return (
    <section className="container mx-auto px-4 lg:px-8 py-16">
      <div className="mx-auto max-w-4xl space-y-12">
        <header className="space-y-3">
          <Typography variant="h1" className="text-4xl">
            Terms & Conditions
          </Typography>
          <Typography className="text-muted-foreground">
            Last updated: {new Date().toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </Typography>
          <Typography>
            These Terms govern your access to and use of the Real Estate Pro
            platform, including all content, features, and services we offer.
            By using our site, you agree to be bound by these Terms. If you do not
            agree, please discontinue use immediately.
          </Typography>
        </header>

        <div className="space-y-10">
          <section className="space-y-4">
            <Typography variant="h2">Eligibility & Account Responsibility</Typography>
            <Typography>
              You must be at least 18 years old to use our services. When creating
              an account, you agree to provide accurate information and maintain
              the confidentiality of your login credentials. You are responsible
              for all activities that occur under your account.
            </Typography>
          </section>

          <section className="space-y-4">
            <Typography variant="h2">Use of the Platform</Typography>
            <Typography>
              You agree not to use the platform for unlawful purposes, transmit
              harmful content, or interfere with site functionality. We reserve the
              right to suspend or terminate access for violations of these Terms or
              behavior that threatens the safety of other users.
            </Typography>
          </section>

          <section className="space-y-4">
            <Typography variant="h2">Property Listings</Typography>
            <Typography>
              Property details are provided by owners, agents, or public sources.
              We strive for accuracy but cannot guarantee that listings are
              error-free. Always verify property information, pricing, and
              availability with the assigned agent or owner before making
              decisions.
            </Typography>
          </section>

          <section className="space-y-4">
            <Typography variant="h2">Intellectual Property</Typography>
            <Typography>
              All content on Real Estate Pro, including trademarks, graphics,
              text, and software, is owned by us or our licensors and is protected
              by intellectual property laws. You may not copy, modify, or
              redistribute materials without prior written consent.
            </Typography>
          </section>

          <section className="space-y-4">
            <Typography variant="h2">Third-Party Services</Typography>
            <Typography>
              Our platform may include links to or integrations with third-party
              services. We are not responsible for the content, policies, or
              practices of these third parties. Use of external services is at your
              own risk and subject to their terms.
            </Typography>
          </section>

          <section className="space-y-4">
            <Typography variant="h2">Limitation of Liability</Typography>
            <Typography>
              Real Estate Pro is not liable for indirect, incidental, or
              consequential damages arising from your use of the platform. Our
              total liability for any claim related to the service is limited to
              the amount paid, if any, for accessing the platform during the six
              months preceding the claim.
            </Typography>
          </section>

          <section className="space-y-4">
            <Typography variant="h2">Indemnification</Typography>
            <Typography>
              You agree to indemnify and hold harmless Real Estate Pro, its
              affiliates, and partners from any claims, damages, or expenses
              arising from your use of the platform or violation of these Terms.
            </Typography>
          </section>

          <section className="space-y-4">
            <Typography variant="h2">Changes to These Terms</Typography>
            <Typography>
              We may update these Terms periodically. Material changes will be
              communicated through the platform or via email. Continued use of the
              service after changes become effective indicates your acceptance of
              the updated Terms.
            </Typography>
          </section>

          <section className="space-y-4">
            <Typography variant="h2">Governing Law</Typography>
            <Typography>
              These Terms are governed by the laws of the jurisdiction in which
              Real Estate Pro operates, without regard to conflict-of-law
              principles. Any disputes will be resolved in the courts of that
              jurisdiction.
            </Typography>
          </section>

          <section className="space-y-4">
            <Typography variant="h2">Contact</Typography>
            <Typography>
              Questions about these Terms can be directed to
              {" "}
              <a
                href="mailto:legal@realestatepro.com"
                className="font-semibold text-primary hover:underline"
              >
                legal@realestatepro.com
              </a>
              .
            </Typography>
          </section>
        </div>
      </div>
    </section>
  );
};

export default TermsPage;
