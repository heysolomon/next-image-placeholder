import "./globals.css";
import { StripePanels } from "@/components/stripe-panels";
import { cn } from "@/lib/utils";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased font-sans">
        <div className="relative min-h-screen flex flex-col items-center overflow-x-hidden">
          <StripePanels />

          <div className="w-full max-w-6xl relative z-0 min-h-screen flex flex-col">
            {/* Header Line */}
            <div className="h-px w-full bg-neutral-200 dark:bg-neutral-800" />

            <header className="h-16 border-b border-neutral-200 dark:border-neutral-800 flex items-center px-6 justify-between bg-neutral-50/80 dark:bg-neutral-950/80 backdrop-blur-sm sticky top-0 z-50">
              <div className="font-bold text-neutral-900 dark:text-neutral-50">next-image-placeholder</div>
              <nav className="flex gap-4 text-sm text-neutral-500">
                <a href="/" className="hover:text-neutral-900 dark:hover:text-neutral-50 transition-colors">Home</a>
                <a href="https://github.com/heysolomon/next-image-placeholder" className="hover:text-neutral-900 dark:hover:text-neutral-50 transition-colors">GitHub</a>
              </nav>
            </header>

            <div className="flex-1 flex w-full">
              {/* Sidebar */}
              <aside className="w-64 border-r border-neutral-200 dark:border-neutral-800 hidden md:block shrink-0 sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto py-8 pr-6 pl-2">
                <div className="space-y-6">
                  <div>
                    <h4 className="font-medium text-sm text-neutral-900 dark:text-neutral-50 mb-3 px-2">Getting Started</h4>
                    <ul className="space-y-1">
                      <li><a href="#" className="block px-2 py-1.5 text-sm text-indigo-500 bg-indigo-50/50 dark:bg-indigo-900/20 rounded-md font-medium">Introduction</a></li>
                      <li><a href="#" className="block px-2 py-1.5 text-sm text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-50 transition-colors">Installation</a></li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm text-neutral-900 dark:text-neutral-50 mb-3 px-2">API Reference</h4>
                    <ul className="space-y-1">
                      <li><a href="#" className="block px-2 py-1.5 text-sm text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-50 transition-colors">getPlaceholder</a></li>
                      <li><a href="#" className="block px-2 py-1.5 text-sm text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-50 transition-colors">getBlurDataURL</a></li>
                    </ul>
                  </div>
                </div>
              </aside>

              {/* Main Content */}
              <main className="flex-1 min-w-0 py-12 px-8 prose-custom">
                {children}
              </main>

              {/* Table of Contents */}
              <aside className="w-64 border-l border-neutral-200 dark:border-neutral-800 hidden lg:block shrink-0 sticky top-16 h-[calc(100vh-4rem)] py-12 px-6">
                <h5 className="font-medium text-xs uppercase tracking-wider text-neutral-500 mb-4">On this page</h5>
                <ul className="space-y-2 text-sm text-neutral-500">
                  <li><a href="#introduction" className="hover:text-neutral-900 dark:hover:text-neutral-50 transition-colors">Introduction</a></li>
                  <li><a href="#features" className="hover:text-neutral-900 dark:hover:text-neutral-50 transition-colors">Features</a></li>
                  <li><a href="#installation" className="hover:text-neutral-900 dark:hover:text-neutral-50 transition-colors">Installation</a></li>
                </ul>
              </aside>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
