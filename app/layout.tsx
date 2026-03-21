import type { Metadata, Viewport } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "AI Hobby Garden",
  description:
    "Grow your hobbies like a garden - AI guides you, your garden grows with your consistency",
};

export const viewport: Viewport = {
  themeColor: "#6b9b6b",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${dmSans.variable} font-sans`}>{children}</body>
    </html>
  );
}
