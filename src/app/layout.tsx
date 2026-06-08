import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Pantnagar Pathshala | Complete Preparation for Pantnagar Entrance Exam",
  description:
    "Pantnagar Pathshala is your complete companion for Pantnagar University (GBPUAT) entrance exam preparation. Free resources, mock tests, mentorship, and YouTube lectures — all in one place.",
  keywords: "Pantnagar Pathshala, Pantnagar University, GBPUAT entrance exam, mock test, PCB, PCM, free resources, mentorship",
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      signInUrl="/sign-in"
      signUpUrl="/sign-up"
      afterSignOutUrl="/"
    >
      <html lang="en">
        <body className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
