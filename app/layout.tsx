import type { Metadata } from "next";
import { Hanken_Grotesk } from "next/font/google";

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-hanken",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SPCTR · AI implementation studio",
  description:
    "SPCTR is an AI implementation studio. We book you meetings with buyers who need what you sell, and build custom AI that takes work off your plate.",
  openGraph: {
    title: "SPCTR · AI that brings in business",
    description: "Booked meetings, pay per meeting. Custom AI builds, one flat quote.",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={hanken.variable}>{children}</body>
    </html>
  );
}
