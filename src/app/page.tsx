'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Music, Zap, Headphones, Github, Twitter, Menu, Mic, Users, Globe, X } from 'lucide-react'
import Head from 'next/head'

export default function LandingPage() {
  const canonicalUrl = `https://sonikai.vercel.app/`

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const smoothScroll = (e: MouseEvent) => {
      // Only process if the click was on an anchor tag
      const target = e.target as HTMLElement;
      const anchor = target.closest('a') as HTMLAnchorElement;

      if (!anchor) return;

      const targetId = anchor.getAttribute('href');

      // Only process internal hash links
      if (targetId && targetId.startsWith('#')) {
        e.preventDefault();

        const element = document.querySelector(targetId);
        if (element) {
          // Account for fixed header height (assuming header height is 80px)
          const headerOffset = 80;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }
    };

    // Add event listener to the document body for better event delegation
    document.body.addEventListener('click', smoothScroll);

    return () => {
      document.body.removeEventListener('click', smoothScroll);
    };
  }, []);

  // Close menu when clicking a link
  const handleNavClick = () => {
    setIsMenuOpen(false);
  };


  return (
    <>
      <Head>
        <link rel="canonical" href={canonicalUrl} />
      </Head>
      <div className="min-h-screen bg-gradient-to-b from-blue-600 via-blue-600 to-fuchsia-500">
        {/* Navigation */}
        <nav className="border-b border-yellow-200/20 backdrop-blur-sm fixed w-full z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div className="flex items-center">
                <span className="text-xl sm:text-2xl font-bold text-yellow-200">Sonik</span>
              </div>
              <div className="hidden md:flex items-center space-x-8">
                <Link href="#features" className="text-yellow-200 hover:text-yellow-300">Features</Link>
                <Link href="#pricing" className="text-yellow-200 hover:text-yellow-300">Pricing</Link>
                <Link href="#about" className="text-yellow-200 hover:text-yellow-300">About</Link>
                <Link href="/dashboard/new-sonik">
                  <Button className="bg-yellow-200 text-blue-600 hover:bg-yellow-300">
                    Get Started
                  </Button>
                </Link>
              </div>
              <button
                className="md:hidden text-yellow-200"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
              <div className="md:hidden absolute top-full left-0 w-full bg-blue-600/95 backdrop-blur-sm border-b border-yellow-200/20">
                <div className="px-4 py-6 space-y-4">
                  <Link
                    href="#features"
                    className="block text-yellow-200 hover:text-yellow-300"
                    onClick={handleNavClick}
                  >
                    Features
                  </Link>
                  <Link
                    href="#pricing"
                    className="block text-yellow-200 hover:text-yellow-300"
                    onClick={handleNavClick}
                  >
                    Pricing
                  </Link>
                  <Link
                    href="#about"
                    className="block text-yellow-200 hover:text-yellow-300"
                    onClick={handleNavClick}
                  >
                    About
                  </Link>
                  <Link
                    href="/dashboard/new-sonik"
                    onClick={handleNavClick}
                  >
                    <Button className="w-full bg-yellow-200 text-blue-600 hover:bg-yellow-300 hidden md:block">
                      Get Started
                    </Button>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* Hero Section */}
        <section className="relative pt-32 pb-20 px-4">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[120%] h-[120%] bg-[radial-gradient(circle,rgba(120,53,15,0.1)_1px,transparent_1px)] [background-size:24px_24px]"></div>
          </div>
          <div className="max-w-7xl mx-auto relative">
            <div className="text-center mb-16">
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-yellow-200 mb-6 [text-shadow:0_4px_8px_rgba(0,0,0,0.1)]">
                Transform Text to
                <span className="relative whitespace-nowrap">
                  <span className="relative block sm:inline"> Audio Magic</span>
                  <svg aria-hidden="true" viewBox="0 0 418 42" className="absolute left-0 top-full h-[0.4em] w-full fill-yellow-200/40 hidden sm:block" preserveAspectRatio="none">
                    <path d="M203.371.916c-26.013-2.078-76.686 1.963-124.73 9.946L67.3 12.749C35.421 18.062 18.2 21.766 6.004 25.934 1.244 27.561.828 27.778.874 28.61c.07 1.214.828 1.121 9.595-1.176 9.072-2.377 17.15-3.92 39.246-7.496C123.565 7.986 157.869 4.492 195.942 5.046c7.461.108 19.25 1.696 19.17 2.582-.107 1.183-7.874 4.31-25.75 10.366-21.992 7.45-35.43 12.534-36.701 13.884-2.173 2.308-.202 4.407 4.442 4.734 2.654.187 3.263.157 15.593-.78 35.401-2.686 57.944-3.488 88.365-3.143 46.327.526 75.721 2.23 130.788 7.584 19.787 1.924 20.814 1.98 24.557 1.332l.066-.011c1.201-.203 1.53-1.825.399-2.335-2.911-1.31-4.893-1.604-22.048-3.261-57.509-5.556-87.871-7.36-132.059-7.842-23.239-.254-33.617-.116-50.627.674-11.629.54-42.371 2.494-46.696 2.967-2.359.259 8.133-3.625 26.504-9.81 23.239-7.825 27.934-10.149 28.304-14.005.417-4.348-3.529-6-16.878-7.066Z"></path>
                  </svg>
                </span>
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-yellow-100 mb-12 max-w-3xl mx-auto px-4">
                Experience the future of audio generation with our AI-powered platform.
                Create natural, expressive voices in seconds.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
                <Link href="/dashboard/new-sonik" className="w-full sm:w-auto">
                  <Button className="w-full sm:w-auto bg-yellow-200 text-blue-600 hover:bg-yellow-300 text-lg px-8 py-6 rounded-xl relative overflow-hidden group">
                    <span className="relative z-10">Start Creating</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-yellow-200 transform translate-y-full transition-transform group-hover:translate-y-0"></div>
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  className="w-full sm:w-auto border-2 border-yellow-200 text-yellow-200 hover:bg-yellow-200/10 text-lg px-8 py-6 rounded-xl"
                >
                  Watch Demo
                </Button>
              </div>
            </div>

            {/* 3D Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-5xl mx-auto px-4">
              {[
                {
                  icon: Mic,
                  title: "AI Voice Morphing",
                  description: "Transform your voice into any character or persona. Instantly transform your text into speech with our AI-powered voice generator."
                },
                {
                  icon: Users,
                  title: "Voice Cloning",
                  description: "Create a perfect digital copy of any voice with just a few minutes of sample audio. Create realistic voice clones for your projects, utilizing cutting-edge AI technology"
                },
                {
                  icon: Globe,
                  title: "Real-time Translation",
                  description: "Break language barriers instantly. Our text-to-speech generator turns text into lifelike voiceovers suitable for any content."
                }
              ].map((feature, i) => (
                <div key={i} className="relative group">
                  <div className="absolute -inset-2 bg-gradient-to-r from-yellow-200 to-fuchsia-500 rounded-xl blur opacity-20 group-hover:opacity-40 transition-opacity"></div>
                  <div className="relative">
                    <div className="absolute bottom-0 right-0 w-full h-full bg-blue-500 rounded-xl transform translate-x-2 translate-y-2"></div>
                    <div className="absolute bottom-0 right-0 w-full h-full bg-fuchsia-500 rounded-xl transform translate-x-1 translate-y-1"></div>
                    <div className="relative w-full bg-yellow-200 rounded-xl p-6 flex flex-col items-center justify-center min-h-[320px]">
                      <feature.icon className="w-12 h-12 mb-4 text-blue-600" />
                      <h3 className="text-blue-600 text-xl font-bold text-center mb-2">{feature.title}</h3>
                      <p className="text-blue-600 text-sm text-center">{feature.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 px-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-600/0 via-fuchsia-500/10 to-fuchsia-500/20"></div>
          <div className="max-w-7xl mx-auto relative">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-yellow-200 text-center mb-16">
              Powerful AI Features
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {[
                { icon: Mic, title: "AI Voice Morphing", desc: "Transform your voice into any character or persona" },
                { icon: Users, title: "Voice Cloning", desc: "Create a digital copy of any voice with just a few samples" },
                { icon: Globe, title: "Real-time Translation", desc: "Instantly translate and dub content into multiple languages" },
                { icon: Music, title: "Emotion Synthesis", desc: "Add realistic emotions and intonations to generated speech" },
                { icon: Zap, title: "Lightning Fast", desc: "Generate hours of audio in minutes with our optimized AI" },
                { icon: Headphones, title: "Studio Quality", desc: "Produce broadcast-ready audio for any professional use case" }
              ].map((feature, i) => (
                <div key={i} className="relative group">
                  <div className="absolute -inset-2 bg-gradient-to-r from-yellow-200 to-fuchsia-500 rounded-xl blur opacity-20 group-hover:opacity-40 transition-opacity"></div>
                  <Card className="relative bg-blue-600 text-yellow-200 border-2 border-yellow-200/20 backdrop-blur-sm h-full">
                    <CardHeader>
                      <feature.icon className="w-12 h-12 mb-4" />
                      <CardTitle className="text-xl sm:text-2xl">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-yellow-100">{feature.desc}</p>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-20 px-4 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-fuchsia-500/20 to-blue-600/20"></div>
          <div className="max-w-7xl mx-auto relative">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-yellow-200 text-center mb-16">
              Affordable Pricing for AI Voice and Text-to-Speech Solutions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: "Starter", price: "$9", features: ["100 minutes of audio", "Basic voice morphing", "5 voice clones", "Email support"] },
                { title: "Pro", price: "$29", features: ["500 minutes of audio", "Advanced voice morphing", "20 voice clones", "Real-time translation", "Priority support"] },
                { title: "Enterprise", price: "Custom", features: ["Unlimited audio generation", "Custom voice development", "Dedicated account manager", "API access", "24/7 support"] }
              ].map((plan, i) => (
                <div key={i} className="relative group">
                  <div className="absolute -inset-2 bg-gradient-to-r from-yellow-200 to-fuchsia-500 rounded-xl blur opacity-20 group-hover:opacity-40 transition-opacity"></div>
                  <div className="relative">
                    <div className="absolute bottom-0 right-0 w-full h-full bg-blue-500 rounded-xl transform translate-x-2 translate-y-2"></div>
                    <div className="absolute bottom-0 right-0 w-full h-full bg-fuchsia-500 rounded-xl transform translate-x-1 translate-y-1"></div>
                    <Card className="relative bg-yellow-200 border-0 h-full">
                      <CardHeader>
                        <CardTitle className="text-xl sm:text-2xl font-bold text-blue-600">{plan.title}</CardTitle>
                        <p className="text-3xl sm:text-4xl font-bold text-blue-600">
                          {plan.price}<span className="text-base sm:text-lg">/mo</span>
                        </p>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-4">
                          {plan.features.map((feature, j) => (
                            <li key={j} className="flex items-center text-blue-600">
                              <CheckCircle className="w-5 h-5 mr-2 flex-shrink-0" />
                              <span className="text-sm sm:text-base">{feature}</span>
                            </li>
                          ))}
                        </ul>
                        <Button className="w-full mt-8 bg-blue-600 text-yellow-200 hover:bg-blue-700 ">
                          Get Started
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer id="about" className="border-t border-yellow-200/20 py-12 px-4">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
            <div>
              <h3 className="text-2xl sm:text-3xl font-bold text-yellow-200 mb-6">Sonik</h3>
              <div className="space-y-4 text-yellow-100">
                <p className="text-sm sm:text-base">
                  Follow SonikAI for updates on AI-generated voices, voice cloning technology, and more. Join us on our journey in the evolving world of AI-powered audio. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Error quisquam repellat velit dicta a laudantium doloremque doloribus cum unde similique atque sunt ipsa, harum quos aliquid.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
              <div>
                <h4 className="font-bold text-yellow-200 mb-4">Product</h4>
                <ul className="space-y-2 text-yellow-100">
                  <li>
                    <Link href="#features" className="text-sm sm:text-base hover:text-yellow-200">
                      Features
                    </Link>
                  </li>
                  <li>
                    <Link href="#pricing" className="text-sm sm:text-base hover:text-yellow-200">
                      Pricing
                    </Link>
                  </li>
                  <li>
                    <Link href="/" className="text-sm sm:text-base hover:text-yellow-200">
                      API
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-yellow-200 mb-4">Company</h4>
                <ul className="space-y-2 text-yellow-100">
                  <li>
                    <Link href="#about" className="text-sm sm:text-base hover:text-yellow-200">
                      About
                    </Link>
                  </li>
                  <li>
                    <Link href="/" className="text-sm sm:text-base hover:text-yellow-200">
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link href="/" className="text-sm sm:text-base hover:text-yellow-200">
                      Careers
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-yellow-200 mb-4">Connect</h4>
                <div className="flex space-x-4">
                  <Link href="https://www.github.com/vikas-nayak" className="text-yellow-200 hover:text-yellow-300">
                    <Github className="w-5 h-5 sm:w-6 sm:h-6" />
                  </Link>
                  <Link href="https://www.x.com/viikasnayak" className="text-yellow-200 hover:text-yellow-300">
                    <Twitter className="w-5 h-5 sm:w-6 sm:h-6" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="max-w-7xl mx-auto pt-8 border-t border-yellow-200/20 text-center text-yellow-100">
            <p className="text-sm sm:text-base">
              2024 Sonik. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </>
  )
}