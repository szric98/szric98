import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { StarCursor } from "@/components/star-cursor";
import { Starfield } from "@/components/starfield";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Richard Szabo",
  description:
    "Full Stack Engineer with 5 years of experience building web applications and GraphQL APIs using modern AI tools and workflows.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <Starfield />
        <StarCursor />
        {children}
      </body>
    </html>
  );
}
