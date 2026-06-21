import { PRICING_TIERS } from '../data/pricing'
import { useReveal } from '../lib/useReveal'

export default function Pricing() {
  const [ref, visible] = useReveal()

  const scrollToMigrate = (e) => {
    e.preventDefault()
    document.getElementById('migrate')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="pricing" className="py-24 px-6" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <div className="max-w-2xl">
          <span className="text-xs font-mono uppercase tracking-widest text-teal">Pricing</span>
          <h2 className="font-display text-3xl sm:text-4xl mt-3 leading-tight text-paper">
            Flat fees, matched to how much is on the line.
          </h2>
          <p className="text-slate mt-4 leading-relaxed">
            A prototype and a live app with paying users need very different levels of care.
            Pick the one that matches where your project actually is.
          </p>
        </div>

        <div className="mt-12 grid sm:grid-cols-2 gap-6 max-w-4xl">
          {PRICING_TIERS.map((tier, i) => (
            <div
              key={tier.id}
              className={`relative rounded-2xl p-8 border transition-colors duration-300 ${
                tier.highlight
                  ? 'border-teal/50 bg-teal/[0.06]'
                  : 'border-line bg-inkSoft/40'
              } ${visible ? 'animate-rise' : 'opacity-0'}`}
              style={{ animationDelay: `${i * 130}ms` }}
            >
              {tier.highlight && (
                <span className="absolute -top-3 left-8 text-[0.65rem] font-mono uppercase tracking-widest bg-teal text-ink px-3 py-1 rounded-full">
                  Most requested
                </span>
              )}

              <h3 className="font-display text-2xl text-paper">{tier.name}</h3>
              <div className="mt-3 flex items-baseline gap-1.5">
                <span className="font-mono text-4xl text-paper">${tier.price}</span>
                <span className="text-slate text-sm">flat</span>
              </div>
              <p className="text-slate text-sm mt-3">{tier.audience}</p>

              <ul className="mt-6 space-y-3">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-paper/90">
                    <svg
                      className={`mt-0.5 shrink-0 ${tier.highlight ? 'text-teal' : 'text-amber'}`}
                      width="16" height="16" viewBox="0 0 16 16" fill="none"
                    >
                      <path d="M3.5 8.5l3 3 6-6.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>

              <a
                href="#migrate"
                onClick={scrollToMigrate}
                className={`mt-8 block text-center font-semibold px-6 py-3 rounded-full transition-all duration-200 hover:-translate-y-0.5 ${
                  tier.highlight
                    ? 'bg-teal text-ink hover:bg-paper'
                    : 'bg-paper text-ink hover:bg-amber'
                }`}
              >
                Start with {tier.name}
              </a>
            </div>
          ))}
        </div>

        <p className="text-xs text-slate mt-8 font-mono max-w-2xl">
          Flat fees cover the migration itself. Ongoing self-hosting costs (server, database) are separate and shown in the calculator above.
        </p>
      </div>
    </section>
  )
}
