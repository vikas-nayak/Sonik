import type { Metadata } from "next"
import { DM_Sans } from "next/font/google"
import { ClerkProvider } from '@clerk/nextjs'
import "./globals.css"

const font = DM_Sans({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Sonik",
  description: "A Text to Audio Morpher Application",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${font.className} min-h-screen bg-blue-600`}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}