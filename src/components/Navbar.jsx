import { useEffect, useState } from 'react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id) => (e) => {
    e.preventDefault()
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-ink/90 backdrop-blur-md border-b border-line' : 'bg-transparent border-b border-transparent'
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#top" onClick={scrollTo('top')} className="font-display text-lg tracking-tight text-paper">
          Buioolt
        </a>
        <div className="hidden md:flex items-center gap-8 text-sm text-slate">
          <a href="#how" onClick={scrollTo('how')} className="hover:text-paper transition-colors">How it works</a>
          <a href="#calculator" onClick={scrollTo('calculator')} className="hover:text-paper transition-colors">Lock-in score</a>
          <a href="#pricing" onClick={scrollTo('pricing')} className="hover:text-paper transition-colors">Pricing</a>
          <a href="#migrate" onClick={scrollTo('migrate')} className="hover:text-paper transition-colors">Start a migration</a>
        </div>
        <a
          href="#migrate"
          onClick={scrollTo('migrate')}
          className="text-sm font-medium bg-paper text-ink px-4 py-2 rounded-full hover:bg-teal transition-colors duration-200"
        >
          Get my estimate
        </a>
      </nav>
    </header>
  )
}
