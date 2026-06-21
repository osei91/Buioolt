import { useReveal } from '../lib/useReveal'

const POINTS = [
  {
    title: 'The builder did its job',
    body: "AI app builders are genuinely good at getting an idea into something real, fast. That part isn't the problem.",
  },
  {
    title: 'Then the bill caught up',
    body: 'Once real users show up, the same builder that was free or cheap to prototype in starts charging for every edit, every build, every bit of traffic.',
  },
  {
    title: "And you're stuck building inside it",
    body: 'Your app, your database, and your auth are often wired directly into that one platform. Leaving means rebuilding, not just exporting.',
  },
]

export default function Problem() {
  const [ref, visible] = useReveal()

  return (
    <section className="py-24 px-6 bg-paper text-ink" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <div className="max-w-2xl">
          <span className="text-xs font-mono uppercase tracking-widest text-amberDim">The problem</span>
          <h2 className="font-display text-3xl sm:text-4xl mt-3 leading-tight">
            AI builders make it easy to start. Nobody designed an easy way to leave.
          </h2>
        </div>

        <div className="mt-14 grid sm:grid-cols-3 gap-8">
          {POINTS.map((p, i) => (
            <div
              key={p.title}
              className={`border-t-2 border-ink/10 pt-6 ${visible ? 'animate-rise' : 'opacity-0'}`}
              style={{ animationDelay: `${i * 120}ms` }}
            >
              <h3 className="font-display text-xl mb-2">{p.title}</h3>
              <p className="text-ink/70 leading-relaxed">{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
