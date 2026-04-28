import type { Metadata } from "next";
import { Barlow_Condensed, Space_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";
import { ScanlineOverlay } from "@/components/ScanlineOverlay";

const barlow = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-barlow",
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SPCTR — Lead Generation Intelligence",
  description:
    "Boutique lead generation agency. Precision pipeline engineering. We hunt. You close.",
  openGraph: {
    title: "SPCTR — Lead Generation Intelligence",
    description: "We hunt. You close. Precision outbound for operators who move fast.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${barlow.variable} ${spaceMono.variable} ${playfair.variable} antialiased bg-background`}
      >
        <ScanlineOverlay />
        {children}
      </body>
    </html>
  );
}
