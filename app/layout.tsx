import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Footer from '@/components/Footer'
import { PrimeReactProvider } from "primereact/api";
import Tailwind from 'primereact/passthrough/tailwind';
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Nodes",
  description: "Gamify your productivity",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <html lang="en">
      <PrimeReactProvider value={{ unstyled: true, pt: Tailwind }}>
        <body className={inter.className}>
          {children}
          <Footer />
        </body>
      </PrimeReactProvider>
    </html>
  );
}
