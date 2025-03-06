// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "./../providers/providers"; 

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DoIt - Todo App",
  description: "A beautiful and functional todo app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}