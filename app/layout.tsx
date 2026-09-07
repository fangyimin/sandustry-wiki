import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { Fraunces, Outfit } from "next/font/google";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import siteConfig from "@/config/site.json";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || siteConfig.siteUrl;

const display = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const body = Outfit({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteConfig.seo.defaultTitle,
    template: siteConfig.seo.titleTemplate,
  },
  description: siteConfig.seo.description,
  keywords: siteConfig.seo.keywords,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const theme = siteConfig.theme;
  const themeStyle = {
    ["--background"]: theme.background,
    ["--foreground"]: theme.foreground,
    ["--amber"]: `hsl(${theme.amber})`,
    ["--amber-light"]: `hsl(${theme.amberLight})`,
  } as CSSProperties;

  return (
    <html lang={siteConfig.locale}>
      <head>
        <GoogleAnalytics />
      </head>
      <body className={`${display.variable} ${body.variable} font-[family-name:var(--font-body)] antialiased`} style={themeStyle}>
        {children}
      </body>
    </html>
  );
}
