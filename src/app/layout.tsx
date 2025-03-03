import type { Metadata } from "next";
import { Roboto_Condensed } from "next/font/google"; // Importing Roboto Condensed from Google Fonts
import localFont from "next/font/local"; // Importing local fonts for GeistSans and GeistMono
import "./globals.css";
import Navbar from "@/components/Navbar";
import { CustomProviders } from "./provider";

// Load the Roboto Condensed font from Google
const robotoCondensed = Roboto_Condensed({
  subsets: ["latin"],
  weight: ["400", "700"], // Choose the weights you need
  variable: "--font-roboto-condensed", // CSS variable for the font
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${robotoCondensed.className} bg-[#101525]`}>
        <CustomProviders>
          <Navbar />
          <main className="bg-[#101525]">{children}</main>
        </CustomProviders>
      </body>
    </html>
  );
}
