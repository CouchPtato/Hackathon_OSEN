import type { Metadata, Viewport } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Sprouted 🌱",
  description:
    "Grow your hobbies like a garden — track progress, gain XP, and evolve your plants with consistency.",
};

export const viewport: Viewport = {
  themeColor: "#6b9b6b",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`
          ${dmSans.variable} font-sans 
          bg-gradient-to-br from-green-50 via-background to-green-100 
          dark:from-[#0f1a0f] dark:via-background dark:to-[#071207]
          min-h-screen antialiased
        `}
      >
        {/* 🌿 SAFE BACKGROUND */}
        <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
          <div className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] bg-green-300/20 blur-3xl rounded-full" />
          <div className="absolute bottom-[-120px] right-[-120px] w-[300px] h-[300px] bg-emerald-400/20 blur-3xl rounded-full" />
        </div>

        <div className="relative z-0">
          {children}
        </div>
      </body>
    </html>
  );
}