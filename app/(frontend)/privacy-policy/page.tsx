import { Typography } from "@/components/ui/typography";

const PrivacyPolicyPage = () => {
  return (
    <section className="container mx-auto px-4 lg:px-8 py-16">
      <div className="mx-auto max-w-4xl space-y-12">
        <header className="space-y-3">
          <Typography variant="h1" className="text-4xl">
            Privacy Policy
          </Typography>
          <Typography className="text-muted-foreground">
            Last updated: {new Date().toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </Typography>
          <Typography>
            We are committed to protecting your personal information. This policy
            explains what we collect, how we use it, and the choices you can make
            about your data when using Real Estate Pro.
          </Typography>
        </header>

        <div className="space-y-10">
          <section className="space-y-4">
            <Typography variant="h2">Information We Collect</Typography>
            <Typography>
              We collect information you provide directly, such as when you create
              an account, request property details, or contact an agent. This may
              include your name, email address, phone number, and any preferences
              you share. We also collect usage data automatically, including IP
              addresses, device information, and browsing behavior across our
              platform.
            </Typography>
          </section>

          <section className="space-y-4">
            <Typography variant="h2">How We Use Your Information</Typography>
            <Typography>
              We use your information to provide and improve our services, respond
              to inquiries, personalize property recommendations, and deliver
              marketing communications you opt into. Aggregated, anonymized data
              may be used to analyze market trends and improve the customer
              experience.
            </Typography>
          </section>

          <section className="space-y-4">
            <Typography variant="h2">Sharing & Disclosure</Typography>
            <Typography>
              We do not sell your personal data. We may share information with
              trusted service providers who support our operations (such as
              hosting, analytics, and email delivery) under strict confidentiality
              agreements. We may also share data when required by law or to
              protect our rights, users, or the public.
            </Typography>
          </section>

          <section className="space-y-4">
            <Typography variant="h2">Cookies & Tracking Technologies</Typography>
            <Typography>
              We use cookies and similar technologies to remember your settings,
              measure site performance, and deliver relevant content. You can
              control cookies through your browser settings; however, disabling
              them may impact certain features.
            </Typography>
          </section>

          <section className="space-y-4">
            <Typography variant="h2">Data Security & Retention</Typography>
            <Typography>
              We implement administrative, technical, and physical safeguards to
              protect your information. Data is retained only as long as necessary
              to fulfill the purposes outlined in this policy or to comply with
              legal obligations. When data is no longer needed, we securely delete
              or anonymize it.
            </Typography>
          </section>

          <section className="space-y-4">
            <Typography variant="h2">Your Choices & Rights</Typography>
            <Typography>
              You may update your account details, opt out of marketing emails,
              or request deletion of your personal data by contacting us. Depending
              on your location, you may have additional rights related to data
              access, portability, or restriction of processing.
            </Typography>
          </section>

          <section className="space-y-4">
            <Typography variant="h2">Third-Party Links</Typography>
            <Typography>
              Our platform may contain links to third-party websites. We are not
              responsible for their privacy practices. We encourage you to review
              the privacy policies of any external sites you visit.
            </Typography>
          </section>

          <section className="space-y-4">
            <Typography variant="h2">Contact Us</Typography>
            <Typography>
              If you have any questions about this Privacy Policy or how we handle
              your data, please contact us at
              {" "}
              <a
                href="mailto:privacy@realestatepro.com"
                className="font-semibold text-primary hover:underline"
              >
                privacy@realestatepro.com
              </a>
              .
            </Typography>
          </section>
        </div>
      </div>
    </section>
  );
};

export default PrivacyPolicyPage;
