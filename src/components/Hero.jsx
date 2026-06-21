import { useEffect, useState } from 'react'
import Counter from './Counter'

const SCENARIOS = [
  { tool: 'Bolt.new', before: 600, after: 334 },
  { tool: 'Lovable', before: 600, after: 334 },
  { tool: 'Replit', before: 420, after: 334 },
  { tool: 'Base44', before: 480, after: 334 },
  { tool: 'v0', before: 360, after: 334 },
]

export default function Hero() {
  const [index, setIndex] = useState(0)
  const [flipping, setFlipping] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setFlipping(true)
      setTimeout(() => {
        setIndex((i) => (i + 1) % SCENARIOS.length)
        setFlipping(false)
      }, 280)
    }, 3400)
    return () => clearInterval(interval)
  }, [])

  const current = SCENARIOS[index]

  const scrollTo = (id) => (e) => {
    e.preventDefault()
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="top" className="relative pt-24 pb-24 px-6 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-amber/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto relative">
        <div className="flex items-center gap-2 text-xs font-mono text-teal mb-6 animate-rise">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-teal animate-pulseDot" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-teal" />
          </span>
          NOW TAKING MIGRATION REQUESTS
        </div>

        <h1 className="font-display text-[2.75rem] sm:text-6xl lg:text-7xl leading-[1.05] text-paper max-w-3xl animate-rise" style={{ animationDelay: '60ms' }}>
          You built it with AI.
          <br />
          <span className="text-slate">You shouldn't rent it forever.</span>
        </h1>

        <p className="mt-6 text-lg text-slate max-w-xl animate-rise" style={{ animationDelay: '140ms' }}>
          Bolt, Lovable, Replit, v0 and the rest are great for getting an app off the ground —
          and expensive places to leave it running. Buioolt looks at what you built,
          tells you what it's really costing you, and moves it to your own hosting.
        </p>

        <div className="mt-9 animate-rise" style={{ animationDelay: '220ms' }}>
          <a
            href="#migrate"
            onClick={scrollTo('migrate')}
            className="block w-full sm:w-auto sm:inline-block text-center bg-amber text-ink font-semibold px-6 py-3.5 rounded-full hover:bg-paper transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-amber/20"
          >
            Get my migration estimate
          </a>
        </div>

        {/* Signature element: the flipping cost ledger */}
        <div className="mt-16 max-w-md animate-rise" style={{ animationDelay: '300ms' }}>
          <div className="border border-line rounded-2xl bg-inkSoft/60 overflow-hidden">
            <div className="flex items-center justify-between px-5 py-3 border-b border-line">
              <span className="text-xs font-mono text-slate">YEAR ONE, RUNNING ON</span>
              <span
                key={current.tool}
                className="text-xs font-mono text-paper px-2 py-1 rounded-full bg-ink border border-line"
              >
                {current.tool}
              </span>
            </div>
            <div className="grid grid-cols-2 divide-x divide-line">
              <div className="px-5 py-5">
                <div className="text-xs text-slate mb-1">Stay on the builder</div>
                <div
                  className={`font-mono text-2xl sm:text-3xl text-amber transition-all duration-300 ${
                    flipping ? 'opacity-0 -translate-y-1' : 'opacity-100 translate-y-0'
                  }`}
                >
                  <Counter value={current.before} prefix="$" trigger={!flipping} duration={500} />
                </div>
              </div>
              <div className="px-5 py-5">
                <div className="text-xs text-slate mb-1">Self-host with Buioolt</div>
                <div
                  className={`font-mono text-2xl sm:text-3xl text-teal transition-all duration-300 ${
                    flipping ? 'opacity-0 -translate-y-1' : 'opacity-100 translate-y-0'
                  }`}
                >
                  <Counter value={current.after} prefix="$" trigger={!flipping} duration={500} />
                </div>
              </div>
            </div>
          </div>
          <p className="text-xs text-slate mt-3 font-mono">
            Estimate rotates by builder · actual numbers run on your project below
          </p>
        </div>
      </div>
    </section>
  )
}
