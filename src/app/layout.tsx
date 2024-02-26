import type { Metadata } from "next";
import Image from "next/image";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Unbooked.io - Helping the community and local businesses grow.",
  description: "A marketplace where community and local business can connect.",
  icons: {
    icon: [
      {
        url: "/o.svg",
        href: "/o.svg",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="h-full min-h-svh bg-white">
          {/* Header */}
          <header className="absolute inset-x-0 top-0 z-50">
            <nav
              className="flex items-center justify-between p-6 lg:px-8"
              aria-label="Global"
            >
              <div className="flex lg:flex-1">
                <a href="#" className="-m-1.5 p-1.5">
                  <span className="sr-only">unbooked.io</span>
                  <Image
                    className="h-12 w-auto md:h-12"
                    src="/unbooked.png"
                    alt=""
                    width={64}
                    height={64}
                  ></Image>
                </a>
              </div>
            </nav>
          </header>

          <main className="flex h-full min-h-svh">{children}</main>
        </div>
      </body>
    </html>
  );
}
