import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "Majesty Mandi House | Premium Authentic Arabian Dining",
  description: "Experience the Legacy of Authentic Arabian Dining in Hanamkonda. Jaw-dropping ambience and the finest Mandi.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} scroll-smooth`}>
      <body className="bg-[#0B0B0C] text-white min-h-screen overflow-x-hidden flex flex-col selection:bg-[#DFB15B] selection:text-[#0B0B0C]">
        {/*
          ClerkProvider must live inside <body>, never wrapping <html>.
          It is passive for public pages — no auth UI is shown to customers.
          The /admin routes are the only ones that enforce authentication.
        */}
        <ClerkProvider>
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}
