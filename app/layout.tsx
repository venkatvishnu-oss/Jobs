import type { Metadata } from "next";
import { Almarai, Instrument_Serif } from "next/font/google";
import "./globals.css";

const almarai = Almarai({ 
  subsets: ["latin"], 
  weight: ["300", "400", "700", "800"],
  variable: "--font-almarai"
});

const instrumentSerif = Instrument_Serif({ 
  subsets: ["latin"], 
  weight: "400", 
  style: "italic",
  variable: "--font-instrument"
});

export const metadata: Metadata = {
  title: "Prisma Studio",
  description: "A worldwide network of visual artists and storytellers.",
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${almarai.variable} ${instrumentSerif.variable} bg-black text-primary min-h-screen`}>
        {children}
      </body>
    </html>
  );
}
