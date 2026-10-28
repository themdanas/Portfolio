import type { Metadata, Viewport } from "next";
import { Hanken_Grotesk, Geist_Mono } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Backdrop from "@/components/Backdrop";
import EdgeBlur from "@/components/EdgeBlur";
import SmoothScroll from "@/components/SmoothScroll";
import { siteConfig } from "@/data/site";
import "./globals.css";

const sans = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
});

const mono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
  authors: [{ name: siteConfig.name }],
  metadataBase: new URL("https://mdanas.dev"),
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fcfcfc" },
    { media: "(prefers-color-scheme: dark)", color: "#0d0d0d" },
  ],
};

// Resolve the theme before first paint: stored choice wins, otherwise follow the OS.
const themeScript = `
(function () {
  try {
    var stored = localStorage.getItem('theme');
    var theme = stored === 'light' || stored === 'dark'
      ? stored
      : (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', theme);
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <meta name="color-scheme" content="light dark" />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body suppressHydrationWarning>
        <Backdrop />
        <SmoothScroll />
        <div className="relative z-[1] min-h-dvh flex flex-col">
          <Header />
          <main className="wrap flex-1 pt-10 sm:pt-16 pb-24">{children}</main>
          <Footer />
        </div>
        <EdgeBlur />
      </body>
    </html>
  );
}
