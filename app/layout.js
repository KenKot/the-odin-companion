import Navbar from "@/components/Navbar";
import "./globals.css";
import { Inter } from "next/font/google";
import { NextAuthProvider } from "./Providers";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "The Odin Companion",
  description: "the odin project flashcards",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthProvider>
          <div className="h-screen mx-8 mx-auto">
            <Navbar />
            <br />
            {children}
          </div>
        </NextAuthProvider>
        <Analytics />
      </body>
    </html>
  );
}
