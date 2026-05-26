import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bubbles | The AI That Cares",
  description: "The first agentic AI swarm for the Indian mass market.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased selection:bg-blue-100 selection:text-blue-900 scroll-smooth`}
    >
      <body className="min-h-full flex flex-col relative overflow-x-hidden">{children}</body>
    </html>
  );
}
