import { useState, useEffect } from 'react'
import Hero from './components/Hero'
import Services from './components/Services'
import HowItWorks from './components/HowItWorks'
import QualifierFlow from './components/QualifierFlow'
import Footer from './components/Footer'

function NavBar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { label: 'Services', href: '#services' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Get Started', href: '#qualifier' },
  ]

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-[#0F172A]/95 backdrop-blur-sm shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#hero" className="flex items-center gap-2 group">
          <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 4 L28 28 H4 Z" fill="none" stroke="#3B82F6" strokeWidth="2.5" strokeLinejoin="round"/>
            <circle cx="16" cy="12" r="2.5" fill="#3B82F6"/>
          </svg>
          <span className="text-white font-semibold text-sm tracking-wide">Ascend AI</span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {links.map(l => (
            <a
              key={l.label}
              href={l.href}
              className="text-slate-300 hover:text-white text-sm font-medium transition-colors duration-200"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#qualifier"
            className="bg-blue-500 hover:bg-blue-400 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors duration-200"
          >
            Book a call
          </a>
        </div>

        <button
          onClick={() => setMenuOpen(o => !o)}
          className="md:hidden text-white p-1"
          aria-label="Toggle menu"
        >
          <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            {menuOpen
              ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            }
          </svg>
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-[#0F172A] border-t border-white/10 px-6 py-4 flex flex-col gap-4">
          {links.map(l => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="text-slate-300 hover:text-white text-base font-medium transition-colors"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#qualifier"
            onClick={() => setMenuOpen(false)}
            className="bg-blue-500 text-white text-sm font-medium px-4 py-2 rounded-lg text-center"
          >
            Book a call
          </a>
        </div>
      )}
    </nav>
  )
}

export default function App() {
  return (
    <div className="min-h-screen font-sans">
      <NavBar />
      <main>
        <Hero />
        <Services />
        <HowItWorks />
        <QualifierFlow />
      </main>
      <Footer />
    </div>
  )
}
