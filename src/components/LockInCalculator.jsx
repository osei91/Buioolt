import { useState } from 'react'
import { analyzePackageJson } from '../lib/lockInScore'
import { useReveal } from '../lib/useReveal'

const SAMPLE = `{
  "dependencies": {
    "react": "^18.2.0",
    "@supabase/supabase-js": "^2.39.0",
    "@clerk/clerk-react": "^4.30.0"
  }
}`

export default function LockInCalculator() {
  const [ref, visible] = useReveal()
  const [description, setDescription] = useState('')
  // `description` isn't used in the automated score — it's free-text context
  // a human reviews later when a visitor follows up through the migration form.
  const [pkgText, setPkgText] = useState('')
  const [result, setResult] = useState(null)
  const [touched, setTouched] = useState(false)

  function handleAnalyze(e) {
    e.preventDefault()
    setTouched(true)
    if (!pkgText.trim()) return
    const analysis = analyzePackageJson(pkgText)
    setResult(analysis)
  }

  function fillSample() {
    setPkgText(SAMPLE)
    setResult(null)
    setTouched(false)
  }

  const tierColor =
    result?.tier?.color === 'teal' ? 'text-teal' : result?.tier?.color === 'amber' ? 'text-amber' : 'text-paper'

  return (
    <section id="calculator" className="py-24 px-6 bg-paper text-ink" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <div className="max-w-2xl">
          <span className="text-xs font-mono uppercase tracking-widest text-amberDim">Lock-in score</span>
          <h2 className="font-display text-3xl sm:text-4xl mt-3 leading-tight">
            How wired in is your project, really?
          </h2>
          <p className="text-ink/70 mt-4 leading-relaxed">
            Describe the app, then paste in your <code className="font-mono bg-ink/5 px-1.5 py-0.5 rounded">package.json</code>.
            I'll scan its dependencies for the packages that tend to tie a project to one platform's
            hosting, database, or auth — and score how hard a move would be.
          </p>
        </div>

        <div className={`mt-12 grid lg:grid-cols-2 gap-8 ${visible ? 'animate-rise' : 'opacity-0'}`}>
          <form onSubmit={handleAnalyze} className="space-y-5">
            <div>
              <label htmlFor="app-desc" className="block text-sm font-medium mb-2">
                What does the app do?
              </label>
              <textarea
                id="app-desc"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="e.g. A booking tool for my dog grooming business, built in Lovable. Customers book slots and pay a deposit."
                className="w-full rounded-xl border border-ink/15 bg-white px-4 py-3 text-sm focus:border-ink/40 outline-none transition-colors resize-none placeholder:text-ink/35"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="pkg-json" className="block text-sm font-medium">
                  Paste your package.json
                </label>
                <button
                  type="button"
                  onClick={fillSample}
                  className="text-xs font-mono text-ink/50 hover:text-ink underline underline-offset-2"
                >
                  use a sample
                </button>
              </div>
              <textarea
                id="pkg-json"
                rows={9}
                value={pkgText}
                onChange={(e) => {
                  setPkgText(e.target.value)
                  setResult(null)
                }}
                placeholder={SAMPLE}
                spellCheck={false}
                className="w-full rounded-xl border border-ink/15 bg-ink text-paper px-4 py-3 text-sm font-mono focus:border-teal/60 outline-none transition-colors resize-none placeholder:text-paper/30"
              />
              {touched && !pkgText.trim() && (
                <p className="text-xs text-amberDim mt-2">Paste your package.json contents to get a score.</p>
              )}
            </div>

            <button
              type="submit"
              className="bg-ink text-paper font-semibold px-6 py-3 rounded-full hover:bg-ink/85 transition-colors duration-200"
            >
              Calculate my lock-in score
            </button>
          </form>

          <div className="rounded-2xl border border-ink/10 bg-white p-7 flex flex-col">
            {!result && (
              <div className="flex-1 flex flex-col items-center justify-center text-center text-ink/40 py-12">
                <span className="font-mono text-4xl mb-3">— / 100</span>
                <p className="text-sm max-w-xs">
                  Your score appears here once you analyze a package.json. Higher means harder to leave.
                </p>
              </div>
            )}

            {result?.error && (
              <div className="flex-1 flex flex-col items-center justify-center text-center py-12">
                <p className="text-amberDim font-medium">{result.error}</p>
              </div>
            )}

            {result && !result.error && (
              <div className="animate-rise">
                <div className="flex items-baseline gap-3">
                  <span className={`font-mono text-5xl font-semibold ${tierColor}`}>{result.score}</span>
                  <span className="text-ink/40 font-mono text-lg">/ 100</span>
                </div>
                <p className={`font-display text-xl mt-1 ${tierColor}`}>{result.tier.label}</p>

                <div className="mt-5 h-2 rounded-full bg-ink/10 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${
                      result.tier.color === 'teal' ? 'bg-teal' : 'bg-amber'
                    }`}
                    style={{ width: `${result.score}%` }}
                  />
                </div>

                <p className="text-sm text-ink/60 mt-4">
                  Scanned {result.depCount} dependenc{result.depCount === 1 ? 'y' : 'ies'}.
                </p>

                {result.findings.length > 0 ? (
                  <ul className="mt-4 space-y-2">
                    {result.findings.map((f, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm">
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber shrink-0" />
                        <span>
                          <code className="font-mono text-ink/80">{f.name}</code>
                          <span className="text-ink/55"> — {f.label}</span>
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-teal mt-4">
                    No strong platform-coupling signals found in these dependencies. That's a good sign for a self-hosted move.
                  </p>
                )}

                <a
                  href="#migrate"
                  onClick={(e) => {
                    e.preventDefault()
                    document.getElementById('migrate')?.scrollIntoView({ behavior: 'smooth' })
                  }}
                  className="mt-6 inline-block text-sm font-semibold text-ink underline underline-offset-4 hover:text-amberDim"
                >
                  Get a real migration estimate for this app →
                </a>
              </div>
            )}
          </div>
        </div>

        <p className="text-xs text-ink/40 mt-6 font-mono max-w-2xl">
          This score is a quick read based on dependency names, not a full audit. The migration form below gets you an actual estimate.
        </p>
      </div>
    </section>
  )
}
