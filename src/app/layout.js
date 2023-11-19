
import { Inter } from 'next/font/google';
import Navbar from './components/Navbar';
import './global.css';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'UK Police Stats',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <Navbar />
      {children}
      </body>
    </html>
  )
}
