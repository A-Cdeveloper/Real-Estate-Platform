import { COPYRIGHT, APP_NAME } from "@/lib/constants";
import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Img,
  Section,
  Text,
} from "@react-email/components";

type PasswordResetEmailProps = {
  resetToken: string;
};

export const PasswordResetEmail = ({ resetToken }: PasswordResetEmailProps) => {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const resetUrl = `${siteUrl}/reset-password?token=${resetToken}`;

  return (
    <Html>
      <Head />
      <Body style={main}>
        <Container style={logoContainer}>
          <Img src={`${siteUrl}/real-estate-logo.png`} alt="Logo" width="140" />
        </Container>
        <Container style={container}>
          <Section style={section}>
            <Text style={heading}>Reset Your Password</Text>
            <Text style={text}>
              You requested to reset your password for your {APP_NAME} account.
              Click the button below to reset your password:
            </Text>
            <Button style={button} href={resetUrl}>
              Reset Password
            </Button>
            <Text style={text}>
              Or copy and paste this link into your browser:
            </Text>
            <Text style={link}>{resetUrl}</Text>
            <Text style={text}>
              This link will expire in 1 hour. If you didn&apos;t request a
              password reset, please ignore this email.
            </Text>
          </Section>
        </Container>
        <Container style={footer}>
          <Text style={footerText}>
            {COPYRIGHT.text} {COPYRIGHT.year} {COPYRIGHT.company}.
          </Text>
        </Container>
      </Body>
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

const heading = {
  color: "#333",
  fontSize: "20px",
  fontWeight: "700",
  margin: "0 0 20px 0",
};

const text = {
  color: "#333",
  fontSize: "14px",
  margin: "0 0 16px 0",
  lineHeight: "1.5",
};

const button = {
  backgroundColor: "#ffb353",
  borderRadius: "5px",
  color: "#fff",
  fontSize: "15px",
  fontWeight: "600",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  padding: "12px 24px",
  margin: "20px 0",
  width: "fit-content",
};

const link = {
  color: "#ffb353",
  fontSize: "14px",
  margin: "0 0 16px 0",
  wordBreak: "break-all" as const,
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

export default PasswordResetEmail;
