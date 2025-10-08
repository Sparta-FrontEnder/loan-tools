"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

// 防止 TS 报错
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

export function GoogleAnalytics() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== "undefined" && typeof window.gtag === "function") {
      window.gtag("event", "page_view", {
        page_path: pathname,
      });
    }
  }, [pathname]);

  return (
    <>
      {/* 加载 GA 脚本 */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-Z59DMQHZ2X"
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-Z59DMQHZ2X');
        `}
      </Script>
    </>
  );
}
