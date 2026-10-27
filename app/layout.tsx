
import type { Metadata } from "next";
import { Bodoni_Moda } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { siteConfig } from "@/data/site";
import "./globals.css";

const nameFont = Bodoni_Moda({
  subsets: ["latin"],
  variable: "--font-name",
  weight: ["400", "500", "600"],
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const storedTheme = localStorage.getItem('theme');
                  const theme = storedTheme || 'dark';
                  document.documentElement.setAttribute('data-theme', theme);
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className={nameFont.variable}>
        <div className="site-root min-h-screen w-full flex flex-col justify-between">
          <div>
            <Header />
            <main>{children}</main>
          </div>
          <Footer />
        </div>
      </body>
    </html>
  );
}