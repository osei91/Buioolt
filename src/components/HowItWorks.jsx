import { useReveal } from '../lib/useReveal'

const STEPS = [
  {
    mark: 'Send',
    title: 'Tell me what you built',
    body: 'Share the builder you used, where the project stands, and what it should do. Two minutes, no code required.',
  },
  {
    mark: 'Read',
    title: 'I look under the hood',
    body: "I check what your project depends on, what it'll actually cost to keep running there, and what a clean self-hosted setup looks like.",
  },
  {
    mark: 'Move',
    title: 'I migrate it for you',
    body: 'You get a plain-English cost comparison first. If it makes sense, I move your app to hosting you own and control.',
  },
]

export default function HowItWorks() {
  const [ref, visible] = useReveal()

  return (
    <section id="how" className="py-24 px-6" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <div className="flex items-end justify-between flex-wrap gap-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-teal">How it works</span>
            <h2 className="font-display text-3xl sm:text-4xl mt-3 text-paper">Three steps, in that order.</h2>
          </div>
        </div>

        <div className="mt-14 grid sm:grid-cols-3 gap-6">
          {STEPS.map((s, i) => (
            <div
              key={s.title}
              className={`group relative border border-line rounded-2xl p-7 bg-inkSoft/40 hover:bg-inkSoft transition-colors duration-300 ${
                visible ? 'animate-rise' : 'opacity-0'
              }`}
              style={{ animationDelay: `${i * 130}ms` }}
            >
              <span className="font-mono text-xs text-amber tracking-widest uppercase">{s.mark}</span>
              <h3 className="font-display text-xl text-paper mt-3 mb-2">{s.title}</h3>
              <p className="text-slate leading-relaxed text-[0.95rem]">{s.body}</p>
              <div className="absolute bottom-0 left-7 right-7 h-px bg-line group-hover:bg-teal/40 transition-colors duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
