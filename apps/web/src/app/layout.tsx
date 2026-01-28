import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "next-image-placeholder | Lightweight Server-Side Blur for Next.js",
  description: "Generate beautiful, lightweight server-side blur placeholders and dominant colors for your Next.js images. Zero client-side JavaScript required for generation.",
  keywords: ["next.js", "image", "placeholder", "blur", "server-side", "blurhash", "performance", "optimization"],
  authors: [{ name: "Solomon", url: "https://twitter.com/heysolomon" }],
  openGraph: {
    title: "next-image-placeholder",
    description: "Lightweight server-side blur placeholders for Next.js. Zero client JS.",
    url: "https://next-image-placeholder.vercel.app",
    siteName: "next-image-placeholder",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "next-image-placeholder",
    description: "Lightweight server-side blur placeholders for Next.js.",
    creator: "@heysolomon",
  },
  metadataBase: new URL("https://next-image-placeholder.vercel.app"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
