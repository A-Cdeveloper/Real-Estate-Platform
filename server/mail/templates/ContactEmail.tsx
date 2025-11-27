import { COPYRIGHT } from "@/lib/constants";
import {
  Body,
  Container,
  Head,
  Html,
  Img,
  Section,
  Text,
} from "@react-email/components";

type ContactEmailProps = {
  name: string;
  email: string;
  phone?: string;
  message: string;
  appName: string;
  logoLight: string;
};

export const ContactEmail = ({
  name,
  email,
  phone,
  message,
  appName,
  logoLight,
}: ContactEmailProps) => {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  return (
    <Html>
      <Head />

      <Body style={main}>
        <Container style={logoContainer}>
          <Img src={`${siteUrl}${logoLight}`} alt="Logo" width="140" />
        </Container>
        <Container style={container}>
          <Section style={section}>
            <Text style={label}>Name:</Text>
            <Text style={value}>{name}</Text>
          </Section>
          <Section style={section}>
            <Text style={label}>Email:</Text>
            <Text style={value}>{email}</Text>
          </Section>
          {phone && (
            <Section style={section}>
              <Text style={label}>Phone:</Text>
              <Text style={value}>{phone}</Text>
            </Section>
          )}
          <Section style={section}>
            <Text style={label}>Message:</Text>
            <Text style={messageText}>{message}</Text>
          </Section>
        </Container>
      </Body>
      <Container style={footer}>
        <Text style={footerText}>
          {COPYRIGHT.text} {COPYRIGHT.year} {appName}.
        </Text>
      </Container>
    </Html>
  );
};

const main = {
  backgroundColor: "#f6f9fc",
  padding: "10px 0 48px",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const logoContainer = {
  padding: "20px 0 20px 20px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const container = {
  backgroundColor: "#fff",
  margin: "0 auto",
  padding: "20px 0 20px 20px",
  marginBottom: "4px",
  borderBottom: "1px solid #e0e0e0",
  borderTop: "1px solid #e0e0e0",
};

const section = {
  padding: "0",
  marginBottom: "6px",
};

const label = {
  color: "#666",
  fontSize: "14px",
  fontWeight: "600",
  margin: "0 0 1px 0",
};

const value = {
  color: "#333",
  fontSize: "14px",
  margin: "0",
  fontWeight: "700",
};

const messageText = {
  color: "#333",
  fontSize: "16px",
  margin: "0",
  whiteSpace: "pre-wrap",
  lineHeight: "1.5",
  fontWeight: "700",
};

const footer = {
  margin: "0 auto",
  textAlign: "center" as const,
  padding: "10px 0 10px 0",
};

const footerText = {
  color: "#666",
  fontWeight: "600" as const,
  margin: "0",
  fontSize: "11px",
};
export default ContactEmail;
