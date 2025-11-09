import { Typography } from "@/components/ui/typography";
import {
  APP_NAME,
  CONTACT_ADDRESS,
  CONTACT_EMAIL,
  CONTACT_PHONE,
} from "@/lib/constants";

const ContactData = () => {
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
          {APP_NAME}
        </Typography>
        <Typography variant="p">{CONTACT_ADDRESS}</Typography>
      </address>
      <div className="mt-6 space-y-1 text-sm text-muted-foreground">
        <p>
          <span className="font-semibold text-foreground">Phone:</span>{" "}
          <a
            href={`tel:${CONTACT_PHONE.replace(/\s/g, "")}`}
            className="text-primary hover:underline"
            aria-label={`Call us at ${CONTACT_PHONE}`}
          >
            {CONTACT_PHONE}
          </a>
        </p>
        <p>
          <span className="font-semibold text-foreground">Email:</span>{" "}
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="text-primary hover:underline"
            aria-label={`Email us at ${CONTACT_EMAIL}`}
          >
            {CONTACT_EMAIL}
          </a>
        </p>
        <p>
          <span className="font-semibold text-foreground">Working hours:</span>{" "}
          <time>Monday – Friday, 9:00 – 18:00</time>
        </p>
      </div>
    </aside>
  );
};

export default ContactData;
