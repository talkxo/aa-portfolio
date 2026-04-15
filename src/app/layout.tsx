import type { Metadata } from "next";
import { Playfair_Display, DM_Sans, Gochi_Hand } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({ 
  subsets: ["latin"], 
  variable: "--font-display",
  display: "swap" 
});

const dmSans = DM_Sans({ 
  subsets: ["latin"], 
  variable: "--font-body",
  display: "swap" 
});

const gochiHand = Gochi_Hand({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-name",
  display: "swap"
});

export const metadata: Metadata = {
  title: "Aradhya Aanjna | Actor & Artist",
  description: "Official portfolio of Aradhya Aanjna — child actor from Gurgaon. Starred in Netflix's Kaala Paani, Sony Liv's Potluck, and 20+ brand campaigns.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable} ${gochiHand.variable}`}>
      <body>{children}</body>
    </html>
  );
}
