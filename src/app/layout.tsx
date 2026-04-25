import type { Metadata } from "next";
import { Playfair_Display, Inter, JetBrains_Mono } from "next/font/google";

import "./globals.css";
import Nav from "@components/nav";
import Footer from "@components/footer";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Ananyo Bhowmick",
    template: "%s | Ananyo Bhowmick",
  },
  description:
    "Software engineer writing about system design, scalable architecture, and the craft of building software.",
  metadataBase: new URL("https://ananyobhowmick.dev"),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Ananyo Bhowmick",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable} ${jetbrains.variable}`}>
      <body className="font-sans antialiased">
        <Nav />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
