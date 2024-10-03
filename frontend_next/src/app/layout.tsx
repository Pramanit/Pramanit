import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import clsx from "clsx";
import "./globals.css";

const dmSans = DM_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pramanit",
  description: "Certificate Verification System",
  icons: {
    icon: '/favicon.ico', // Path to your favicon
  },
  openGraph: {
    title: 'Pramanit | Blockchain-Powered Certificate Verification',
    description: 'Secure, transparent, and efficient certificate management and verification system using cutting-edge blockchain technology.',
    url: 'https://pramanit.co',
    siteName: 'Pramanit',
    images: [
      {
        url: 'https://pramanit.co/hero.jpg',
        width: 1200,
        height: 630,
        alt: 'Our homepage',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={clsx(dmSans.className, "antialiased")}>{children}</body>
    </html>
  );
}
