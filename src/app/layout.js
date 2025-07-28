import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import 'bootstrap/dist/css/bootstrap.min.css';

import { Geist, Geist_Mono } from "next/font/google";

import Header from '@/ui/components/Header';
import Footer from '@/ui/components/Footer';
import GoogleAnalytics from '@/ui/components/GoogleAnalytics';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Estação Rodoviária de Cerro Largo",
  description: "O Terminal Rodoviário de Cerro Largo no Rio Grande do Sul oferece a seus passageiros trechos estaduais e interestaduais.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <GoogleAnalytics />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ToastContainer />
        <SpeedInsights />
        <Analytics />
        <Header />
          {children}
        <Footer />
      </body>
    </html>
  );
}
