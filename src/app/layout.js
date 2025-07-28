import './global.scss';

import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import 'bootstrap/dist/css/bootstrap.min.css';

import { Geist, Geist_Mono } from "next/font/google";

import Header from '@/ui/shared/Header';
import Footer from '@/ui/shared/Footer';

import IubendaConsent from '@/ui/components/IubendaConsent';
import GoogleAnalytics from '@/ui/components/GoogleAnalytics';

import WhatsappButton from '@/ui/components/WhatsappButton';

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
      <IubendaConsent />
      <GoogleAnalytics />
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ToastContainer />
        <SpeedInsights />
        <Analytics />
        <Header />
          {children}
        <Footer />

        <WhatsappButton />
      </body>
    </html>
  );
}
