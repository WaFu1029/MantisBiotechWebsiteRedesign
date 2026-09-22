import type { Metadata } from "next";
import { Geist_Mono, Plus_Jakarta_Sans } from "next/font/google";
import { PixelWordmark } from "@/components/pixel-wordmark";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Mantis Biotech",
    template: "%s - Mantis Biotech",
  },
  description: "Predictive models of human beings.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <div className="flex min-h-dvh flex-col bg-white px-4 sm:px-8">
          <SiteHeader />
          {children}
        </div>
        <div className="@container bg-white px-4 pt-12 pb-10 sm:px-8 sm:pt-20 sm:pb-16">
          <PixelWordmark />
          <SiteFooter className="mt-12 sm:mt-16" />
        </div>
      </body>
    </html>
  );
}
