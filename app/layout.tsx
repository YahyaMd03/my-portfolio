import type { Metadata } from "next";
import { Geist, Geist_Mono, Space_Grotesk } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { ThemeProvider } from "./components/ThemeProvider";
import { ToastProvider } from "./components/Toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3001"
  ),
  title: "Mohammed Yahya | Full-Stack Developer | DevOps & Cloud Infrastructure",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  description:
    "Full-Stack Developer specializing in DevOps, cloud infrastructure, and monitoring tools. Crafting scalable web applications with React, Next.js, TypeScript, Node.js, Docker, Kubernetes, and AWS.",
  keywords: [
    "Full-Stack Developer",
    "DevOps Engineer",
    "Cloud Infrastructure",
    "Web Developer",
    "React Developer",
    "Next.js Developer",
    "TypeScript",
    "JavaScript",
    "Docker",
    "Kubernetes",
    "AWS",
    "Monitoring Tools",
    "Portfolio",
    "Software Engineer",
  ],
  authors: [{ name: "Mohammed Yahya" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://yourwebsite.com",
    title: "Mohammed Yahya | Full-Stack Developer | DevOps & Cloud Infrastructure",
    description:
      "Full-Stack Developer specializing in DevOps, cloud infrastructure, and monitoring tools. Building scalable applications with modern technologies.",
    siteName: "Mohammed Yahya Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Mohammed Yahya - Full-Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohammed Yahya | Full-Stack Developer | DevOps & Cloud Infrastructure",
    description:
      "Full-Stack Developer specializing in DevOps, cloud infrastructure, and monitoring tools. Building scalable applications with modern technologies.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const clerkPublishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
  
  if (!clerkPublishableKey) {
    console.error(
      "NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY is not set. Please add it to your .env.local file."
    );
  }
  
  return (
    <ClerkProvider
      publishableKey={clerkPublishableKey || ""}
    >
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} antialiased`}
        >
          <ThemeProvider>
            <ToastProvider>{children}</ToastProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
