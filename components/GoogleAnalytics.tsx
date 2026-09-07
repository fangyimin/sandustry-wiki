import Script from "next/script";

/** Reads NEXT_PUBLIC_GA_ID from .env.local (or build env). */
const gaId = process.env.NEXT_PUBLIC_GA_ID?.replace(/^["']|["']$/g, "").trim();

export function GoogleAnalytics() {
  if (!gaId) return null;

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}');
        `}
      </Script>
    </>
  );
}
