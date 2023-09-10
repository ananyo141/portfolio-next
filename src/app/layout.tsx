import "./globals.css";
import "react-toastify/dist/ReactToastify.css";

import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";

import Navbar from "@components/Navbar";
import Footer from "@components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Portfolio",
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
        <ToastContainer />
        <Footer />
      </body>
    </html>
  );
}
