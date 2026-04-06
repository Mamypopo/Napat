import type { Metadata } from "next";
import { IBM_Plex_Sans_Thai, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const ibmPlexSansThai = IBM_Plex_Sans_Thai({
  variable: "--font-sans",
  subsets: ["thai", "latin"],
  weight: ["300", "400", "600", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Napat — Full-Stack Developer",
  description: "Ship software peacefully. Portfolio of Napat — Full-Stack Developer based in Bangkok.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="th"
      suppressHydrationWarning
    >
      <head />
      <body
        className={`${ibmPlexSansThai.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <Script id="theme-init" strategy="beforeInteractive">{`
          try {
            var t = localStorage.getItem('theme');
            if (t === 'light') document.documentElement.classList.add('light');
            else document.documentElement.classList.add('dark');
          } catch(e) {
            document.documentElement.classList.add('dark');
          }
        `}</Script>
        {children}
      </body>
    </html>
  );
}
