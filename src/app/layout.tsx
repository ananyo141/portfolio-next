import "./globals.css";
import { Inter } from "next/font/google";

import Navbar from "@components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Ananyo's Portfolio",
  description:
    "Website powered by NextJS + FramerMotion + TailwindCSS + TypeScript",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
