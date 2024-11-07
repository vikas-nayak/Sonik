import type { Metadata } from "next"
import { DM_Sans } from "next/font/google"
import { ClerkProvider } from '@clerk/nextjs'
import "./globals.css"
import Head from "next/head"




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
    <>
      <Head>
        <meta name="google-site-verification" content="bqU9EeOff6xDVeDvMhJ9fQU6Rep_7pSlTD0lLbuBS5A" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "SonikAI",
              "url": "https://sonikai.vercel.app",
              "applicationCategory": "AI Voice Generator",
              "description": "AI-driven voice generator and voice cloning platform",
              "operatingSystem": "All",
              "offers": {
                "@type": "Offer",
                "price": "0.00",
                "priceCurrency": "USD"
              }
            })
          }}
        />
      </Head>

      <ClerkProvider>
        <html lang="en">
          <body className={`${font.className} min-h-screen bg-blue-600`}>
            {children}
          </body>
        </html>
      </ClerkProvider>
    </>
  )
}