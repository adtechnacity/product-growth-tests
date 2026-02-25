import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Native Travel",
  description: "Seniors 55+ Are Now Flying Business Class For The Price of Economy",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Shadows+Into+Light&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-cream min-h-screen">{children}</body>
    </html>
  );
}
