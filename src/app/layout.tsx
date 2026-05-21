
import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"

export const metadata: Metadata = {
  title: 'OurJourney | Shared Couple Life',
  description: 'Track your days together, expenses, wishlist, and milestones.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased bg-background text-foreground min-h-screen pb-24 md:pb-0">
        <main className="max-w-xl mx-auto min-h-screen shadow-xl bg-background md:my-4 md:rounded-3xl md:min-h-[90vh] overflow-hidden flex flex-col relative">
          <div className="flex-1 overflow-y-auto">
            {children}
          </div>
        </main>
        <Toaster />
      </body>
    </html>
  );
}
