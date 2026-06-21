import { BUILDERS } from '../data/builders'
import { yearOneCosts, formatUSD } from '../lib/cost'
import { useReveal } from '../lib/useReveal'

export default function CostTable() {
  const [ref, visible] = useReveal()

  return (
    <section className="py-24 px-6 bg-paper text-ink" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <div className="max-w-2xl">
          <span className="text-xs font-mono uppercase tracking-widest text-amberDim">The math</span>
          <h2 className="font-display text-3xl sm:text-4xl mt-3 leading-tight">
            Roughly what a year looks like, either way.
          </h2>
          <p className="text-ink/70 mt-4 leading-relaxed">
            These are typical figures once a project is being used for real, not a guess at your exact bill.
            Your form above gives you the version specific to your stack.
          </p>
        </div>

        <div className={`mt-12 overflow-x-auto ${visible ? 'animate-rise' : 'opacity-0'}`}>
          <table className="w-full text-left border-collapse min-w-[640px]">
            <thead>
              <tr className="border-b border-ink/15">
                <th className="py-3 pr-4 text-sm font-medium text-ink/50">Builder</th>
                <th className="py-3 pr-4 text-sm font-medium text-ink/50">Stay, year one</th>
                <th className="py-3 pr-4 text-sm font-medium text-ink/50">Migrate &amp; self-host, year one</th>
                <th className="py-3 pr-4 text-sm font-medium text-ink/50">You'd keep</th>
              </tr>
            </thead>
            <tbody>
              {BUILDERS.filter((b) => b.id !== 'other').map((b) => {
                const { stayCost, migrateCost, savings } = yearOneCosts(b.monthlyLockIn)
                return (
                  <tr key={b.id} className="border-b border-ink/8 hover:bg-ink/[0.03] transition-colors">
                    <td className="py-4 pr-4 font-display text-lg">{b.name}</td>
                    <td className="py-4 pr-4 font-mono text-amberDim">{formatUSD(stayCost)}</td>
                    <td className="py-4 pr-4 font-mono text-tealDim">{formatUSD(migrateCost)}</td>
                    <td className="py-4 pr-4 font-mono font-semibold">{formatUSD(Math.max(savings, 0))}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        <p className="text-xs text-ink/40 mt-6 font-mono">
          Self-host estimate assumes a small VPS or cloud instance plus managed database, around $7/mo,
          and a one-time migration fee of $250. Savings grow every year after — year one mostly covers
          the move itself. Actual numbers depend on your traffic and stack.
        </p>
      </div>
    </section>
  )
}
