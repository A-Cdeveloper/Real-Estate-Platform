import localFont from "next/font/local";

export const nunito = localFont({
  src: [
    {
      path: "../public/fonts/nunito-v32-latin-regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/nunito-v32-latin-600.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/nunito-v32-latin-700.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-nunito",
  display: "swap",
});

export const nunitoSans = localFont({
  src: [
    {
      path: "../public/fonts/nunito-sans-v19-latin-regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/nunito-sans-v19-latin-600.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/nunito-sans-v19-latin-700.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-nunito-sans",
  display: "swap",
});

