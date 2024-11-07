import type { Metadata } from "next"
import { DM_Sans } from "next/font/google"
import { ClerkProvider } from '@clerk/nextjs'
import "./globals.css"

const font = DM_Sans({ subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL("https://sonikai.vercel.app/"),
  keywords: [
    "ai voice generator",
    "voice",
    "artificial intelligence voice",
    "voice over voice",
    "voice over",
    "free ai voice generator",
    "text to speech",
    "text to voice",
    "voice changer",
    "voice generator free",
    "voice cloning",
    "voice generator",
    "voice gen",
    "voice over",
    "speech generator",
    "voice text to speech",
    "text voice maker",
    "text to speech generator",
    "text to speech voice generator",
    "text voice maker",
    "ai image",
    "ai generated",
    "ai models",
    "fashion",
    "ai",
    "clothing",
    "style",
    "trends"
  ],
  title: "Sonik - AI-Powered Voice Morpher",
  description: "Generate and clone human-like voices with AI. Create voiceovers, voice changers, and more with Sonik's AI voice generator.",
};

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