import type { Metadata } from "next";
import { Bodoni_Moda, Geist, Geist_Mono, Caveat } from "next/font/google";
import { ToastContainer } from "react-toastify";

import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import Nav from "@components/nav";
import Footer from "@components/footer";
import { ThemeProvider } from "@components/theme-provider";
import { ThemeScript } from "@components/theme-script";
import contact from "@data/contact.json";
import site from "@data/site.json";

const bodoni = Bodoni_Moda({
  subsets: ["latin"],
  variable: "--font-bodoni",
  display: "swap",
});

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-caveat",
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

const siteUrl = site.domain.replace(/\/$/, "");

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  url: siteUrl,
  email: contact.email,
  sameAs: [contact.social.github, contact.social.linkedin, contact.social.twitter],
  jobTitle: "Software Engineer",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Kolkata, India",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${bodoni.variable} ${geist.variable} ${geistMono.variable} ${caveat.variable}`}
    >
      <head>
        <ThemeScript />
      </head>
      <body className="font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <ThemeProvider>
          <Nav />
          <main id="main-content">{children}</main>
          <Footer />
          <ToastContainer
            position="bottom-right"
            autoClose={4000}
            hideProgressBar
            closeOnClick
            pauseOnHover
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
