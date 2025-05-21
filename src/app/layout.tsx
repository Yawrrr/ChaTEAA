import type { Metadata } from "next";
import { Inter, Cormorant } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const cormorant = Cormorant({
  subsets: ["latin"],
  variable: "--font-cormorant",
});

export const metadata: Metadata = {
  title: "ChaTEAA Order Summary",
  description: "ChaTEA 🧋 – Runner service delivering Chagee Milk Tea to KTDI, UTM Skudai. Preorder, relax, and sip.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${cormorant.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}
