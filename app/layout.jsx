import { Inter } from 'next/font/google';
import './globals.css';
import { ToastContainer } from 'react-toastify';

import MainNavigation from '@/components/navigation/MainNavigation';
import Footer from '@/components/footer/Footer';
const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <MainNavigation />
        {children}
        <ToastContainer position="top-right" autoClose={1500} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="colored" />
        <Footer />
      </body>
    </html>
  );
}
