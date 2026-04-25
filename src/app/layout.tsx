import type { Metadata } from "next";
import { Playfair_Display, Inter, JetBrains_Mono } from "next/font/google";
import { ToastContainer } from "react-toastify";

import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import Nav from "@components/nav";
import Footer from "@components/footer";
import site from "@data/site.json";

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
    default: site.name,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  metadataBase: new URL(site.domain),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: site.name,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable} ${jetbrains.variable}`}>
      <body className="font-sans antialiased">
        <Nav />
        <main id="main-content">{children}</main>
        <Footer />
        <ToastContainer
          position="bottom-right"
          autoClose={4000}
          hideProgressBar
          closeOnClick
          pauseOnHover
          theme="light"
        />
      </body>
    </html>
  );
}
