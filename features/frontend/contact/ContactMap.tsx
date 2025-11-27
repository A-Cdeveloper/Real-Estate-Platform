import { getSettings } from "@/server/queries/settings";

const ContactMap = async () => {
  const settings = await getSettings();
  const appName = settings?.appName || "Real Estate";

  return (
    <div className="overflow-hidden rounded-2xl shadow-lg ring-1 ring-border/50">
      <iframe
        title={appName}
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2886.5353721262867!2d-79.39252372388835!3d43.65188785372852!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882b34d719ca95ab%3A0xbf73f45c7cfb3523!2sFinancial%20District%2C%20Toronto%2C%20ON%2C%20Canada!5e0!3m2!1sen!2srs!4v1730970212345!5m2!1sen!2srs"
        className="h-[360px] w-full border-0"
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
};

export default ContactMap;
