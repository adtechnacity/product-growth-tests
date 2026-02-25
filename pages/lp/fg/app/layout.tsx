import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Amazon's Worst Nightmare: People Canceling Prime For This Clever Hack",
  description:
    "Millions are ditching Amazon Prime after discovering this free browser tool that finds lower prices and applies coupon codes automatically.",
  robots: "noindex,nofollow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700;900&family=Roboto:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
