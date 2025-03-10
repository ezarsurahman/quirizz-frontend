import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Toaster } from "@/components/ui/sonner"



const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable:"--font-poppins",
  weight:["400","600","700"],
  subsets:["latin"],
  display:"swap"
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Quirizz",
  description: "Quizz by rizztech",
  icons: {
    icon: "favicon.ico"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} antialiased`}
      >
        <Navbar></Navbar>
        <div className="font-poppins">
          {children}
        </div>
        <Footer></Footer>
        <Toaster richColors closeButton theme="light"
        toastOptions={{style: {
          background: 'white',
        }}}/>
        
      </body>
    </html>
  );
}
