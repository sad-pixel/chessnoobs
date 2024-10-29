import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navigation from "@/components/navigation";
import Link from "next/link";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "ChessNoobs",
  description: "Free Chess Training Tools",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen bg-amber-50 text-amber-900`}
      >
        <Navigation />
        <main className="flex-1 flex flex-col items-center">
          {children}
        </main>
        <footer className="w-full py-6 bg-amber-900">
          <div className="container mx-auto px-4 md:px-5 xl:px-8">
            <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
              <p className="text-sm text-amber-100">
                © 2024 ChessNoobs. All rights reserved.
              </p>
              <nav className="flex gap-4 sm:gap-5">
                <Link
                  className="text-sm hover:underline underline-offset-4 text-amber-100 hover:text-amber-50"
                  href="#"
                >
                  Terms of Service
                </Link>
                <Link
                  className="text-sm hover:underline underline-offset-4 text-amber-100 hover:text-amber-50"
                  href="#"
                >
                  Privacy
                </Link>
                <Link
                  className="text-sm hover:underline underline-offset-4 text-amber-100 hover:text-amber-50"
                  href="https://github.com/chessnoobs/chessnoobs"
                >
                  GitHub
                </Link>
              </nav>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
