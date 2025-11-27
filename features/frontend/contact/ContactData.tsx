import { Typography } from "@/components/ui/typography";
import { getSettings } from "@/server/queries/settings";

const ContactData = async () => {
  const settings = await getSettings();
  const appName = settings?.appName || "Real Estate";
  const address = settings?.address || "Address not available";
  const phone = settings?.phone || "";
  const email = settings?.email || "";

  return (
    <aside
      className="rounded-2xl border bg-secondary/30 p-8 shadow-sm"
      aria-label="Contact information"
    >
      <Typography variant="h2" className="text-xl">
        Our office
      </Typography>
      <address className="mt-4 space-y-1 text-sm text-muted-foreground not-italic">
        <Typography variant="h3" className="font-semibold text-foreground">
          {appName}
        </Typography>
        <Typography variant="p">{address}</Typography>
      </address>
      <div className="mt-6 space-y-1 text-sm text-muted-foreground">
        {phone && (
          <p>
            <span className="font-semibold text-foreground">Phone:</span>{" "}
            <a
              href={`tel:${phone.replace(/\s/g, "")}`}
              className="text-primary hover:underline"
              aria-label={`Call us at ${phone}`}
            >
              {phone}
            </a>
          </p>
        )}
        {email && (
          <p>
            <span className="font-semibold text-foreground">Email:</span>{" "}
            <a
              href={`mailto:${email}`}
              className="text-primary hover:underline"
              aria-label={`Email us at ${email}`}
            >
              {email}
            </a>
          </p>
        )}
        <p>
          <span className="font-semibold text-foreground">Working hours:</span>{" "}
          <time>Monday – Friday, 9:00 – 18:00</time>
        </p>
      </div>
    </aside>
  );
};

export default ContactData;
