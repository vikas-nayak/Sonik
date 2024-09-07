import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { DM_Sans } from "next/font/google";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'


const font = DM_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sonik",
  description: "A Text to Audio Morpher Application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={font.className}
        >
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
