import { Poppins, Lora, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--font-poppins' });
const lora = Lora({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-lora' });
const jetbrains = JetBrains_Mono({ subsets: ['latin'], weight: ['400'], variable: '--font-jetbrains' });

export const metadata = {
  title: 'JobRadar AI',
  description: 'AI job discovery platform powered by automated scraping and verification.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${poppins.variable} ${lora.variable} ${jetbrains.variable}`}>
      <body className="bg-cl-light min-h-screen flex flex-col">
        <nav className="bg-cl-dark px-6 py-4 flex justify-between items-center sticky top-0 z-50">
          <div className="font-display font-semibold text-cl-light text-xl">
            JobRadar <span className="text-cl-orange">AI</span>
          </div>
          <button className="bg-cl-orange text-white px-5 py-2 rounded-pill font-display text-[13px] font-medium hover:brightness-90 transition-all">
            Post Job
          </button>
        </nav>
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
