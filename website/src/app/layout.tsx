import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bubbles",
  description: "Your executive assistant. It lives on WhatsApp.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="h-full scroll-smooth antialiased"
    >
      <head>
        <link rel="icon" href="/icon.png?v=2" type="image/png" />
      </head>
      <body className="min-h-full flex flex-col relative overflow-x-hidden">{children}</body>
    </html>
  );
}
