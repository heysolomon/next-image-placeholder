import "./globals.css";
import { StripePanels } from "@/components/stripe-panels";
import { Sidebar } from "@/components/sidebar";
import { TableOfContents } from "@/components/toc";
import { Logo } from "@/components/logo";
import { Pager } from "@/components/pager";
import { cn } from "@/lib/utils";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased font-sans">
        <div className="relative h-screen flex flex-col items-center overflow-hidden bg-white dark:bg-neutral-950">
          <StripePanels />

          <div className="w-full max-w-6xl relative z-0 h-full flex flex-col bg-white/50 dark:bg-neutral-950/50">
            {/* Header Line */}
            <div className="h-px w-full bg-neutral-200 dark:bg-neutral-800 shrink-0" />

            <header className="h-16 shrink-0 border-b border-neutral-200 dark:border-neutral-800 flex items-center px-6 justify-between bg-neutral-50/80 dark:bg-neutral-950/80 backdrop-blur-sm z-50">
              <Logo />
              <nav className="flex gap-4 text-sm text-neutral-500">
                <a href="/" className="hover:text-neutral-900 dark:hover:text-neutral-50 transition-colors">Home</a>
                <a href="https://github.com/heysolomon/next-image-placeholder" className="hover:text-neutral-900 dark:hover:text-neutral-50 transition-colors">GitHub</a>
              </nav>
            </header>

            <div className="flex-1 flex w-full overflow-hidden">
              {/* Sidebar */}
              <Sidebar />

              {/* Main Content */}
              <main className="flex-1 min-w-0 py-12 px-8 prose-custom overflow-y-auto h-full">
                {children}
                <Pager />
              </main>

              {/* Table of Contents */}
              <TableOfContents />
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
