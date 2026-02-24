'use client';

import { Inter } from "next/font/google";
import "./globals.css";
import { LibrarySidebar } from "@/components/LibrarySidebar";
import { Navbar } from "@/components/Navbar";
import { usePathname } from "next/navigation";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // No chrome for preview or page-preview routes
  const isPreview = pathname.startsWith('/preview') || pathname.startsWith('/page-preview');
  // Page builder gets full-height main area but keeps the sidebar
  const isPageBuilder = pathname.startsWith('/page-builder');

  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${inter.className} antialiased text-neutral-1000 bg-white`}>
        {isPreview ? (
          /* PREVIEW MODE: No Sidebar, No Navbar, No Padding */
          <div className="w-full min-h-screen bg-white">
            {children}
          </div>
        ) : (
          /* DASHBOARD MODE: Persistent Sidebar and Navbar */
          <div className="flex h-screen w-full overflow-hidden">
            <div className="w-64 flex flex-col border-gray-thin shrink-0">
              <Navbar />
              <LibrarySidebar />
            </div>
            <main className="flex-1 bg-white overflow-hidden relative flex flex-col">
              {isPageBuilder ? (
                /* PAGE BUILDER: full-height, no padding */
                <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
                  {children}
                </div>
              ) : (
                /* NORMAL PAGES: scrollable with padding */
                <div className="flex-1 overflow-y-auto">
                  <div className="max-w-[1600px] mx-auto w-full p-4 md:p-12">
                    {children}
                  </div>
                </div>
              )}
            </main>
          </div>
        )}
      </body>
    </html>
  );
}