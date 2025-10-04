"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

// 声明 window.gtag，防止 TypeScript 报错
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

export function GoogleAnalytics() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window.gtag !== "undefined") {
      window.gtag("config", "G-Z59DMQHZ2X", {
        page_path: pathname,
      });
    }
  }, [pathname]);

  return (
    <>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-Z59DMQHZ2X"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-Z59DMQHZ2X', {
            page_path: window.location.pathname,
          });
        `}
      </Script>
    </>
  );
}
