import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/components/AuthProvider";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Toaster } from "react-hot-toast";
import SessionSync from "@/components/SessionSync";
import TrackTraffic from "@/components/TrackTraffic";
import { SITE_NAME } from "@/lib/constants";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: SITE_NAME,
  description: `${SITE_NAME} is a plateform for organizers to organize their events!`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Toaster />
        <ThemeProvider attribute={"class"} defaultTheme="light" enableSystem>
          <AuthProvider>
            <SessionSync>
              <TrackTraffic>
                <div className="min-h-screen grid">{children}</div>
              </TrackTraffic>
            </SessionSync>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
