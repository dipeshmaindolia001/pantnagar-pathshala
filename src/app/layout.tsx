import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Pantnagar Exam Mock Tests | Practice for University Entrance",
  description:
    "Prepare for Pantnagar University entrance exam with our PCB and PCM mock tests. 200 MCQs, 3-hour timer, instant results with relative ranking.",
  keywords: "Pantnagar University, entrance exam, mock test, PCB, PCM, GBPUAT",
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
