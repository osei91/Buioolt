import { useState } from 'react'
import { BUILDERS, STATUS_OPTIONS } from '../data/builders'
import { yearOneCosts, formatUSD } from '../lib/cost'
import { useReveal } from '../lib/useReveal'

// Replace this with your own Formspree endpoint (or any form-to-email service).
// See the setup note in README.md — takes about two minutes, no backend needed.
const FORM_ENDPOINT = 'https://formspree.io/f/mlgyrlgr'

const initialState = {
  tool: '',
  status: '',
  email: '',
  goal: '',
}

export default function MigrateForm() {
  const [ref, visible] = useReveal()
  const [form, setForm] = useState(initialState)
  const [submitState, setSubmitState] = useState('idle') // idle | sending | sent | error

  const selectedBuilder = BUILDERS.find((b) => b.id === form.tool)
  const preview = selectedBuilder ? yearOneCosts(selectedBuilder.monthlyLockIn) : null

  function update(field) {
    return (e) => setForm((f) => ({ ...f, [field]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!form.tool || !form.status || !form.email || !form.goal) return

    setSubmitState('sending')
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          _subject: `New migration request — ${selectedBuilder?.name || form.tool}`,
          tool: selectedBuilder?.name || form.tool,
          appStatus: form.status,
          email: form.email,
          primaryGoal: form.goal,
        }),
      })
      if (!res.ok) throw new Error('Request failed')
      setSubmitState('sent')
      setForm(initialState)
    } catch {
      setSubmitState('error')
    }
  }

  if (submitState === 'sent') {
    return (
      <section id="migrate" className="py-24 px-6">
        <div className="max-w-xl mx-auto text-center border border-line rounded-2xl p-12 bg-inkSoft/40 animate-rise">
          <div className="h-12 w-12 rounded-full bg-teal/15 text-teal flex items-center justify-center mx-auto mb-5 text-2xl">
            ✓
          </div>
          <h2 className="font-display text-2xl text-paper mb-2">Got it. That's on its way.</h2>
          <p className="text-slate">
            I'll look at what you've shared and reply at the email you gave with a real cost comparison
            and next steps. Usually within a couple of days.
          </p>
        </div>
      </section>
    )
  }

  return (
    <section id="migrate" className="py-24 px-6" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <div className="max-w-2xl">
          <span className="text-xs font-mono uppercase tracking-widest text-amber">Start here</span>
          <h2 className="font-display text-3xl sm:text-4xl mt-3 leading-tight text-paper">
            Tell me about your project.
          </h2>
          <p className="text-slate mt-4 leading-relaxed">
            Four questions. I'll send back what your current setup is likely costing you over a year,
            against what moving it to your own hosting would cost instead.
          </p>
        </div>

        <div className={`mt-12 grid lg:grid-cols-[1.3fr_1fr] gap-10 ${visible ? 'animate-rise' : 'opacity-0'}`}>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="tool" className="block text-sm font-medium text-paper mb-2">
                Which tool or stack did you build with?
              </label>
              <div className="relative">
                <select
                  id="tool"
                  required
                  value={form.tool}
                  onChange={update('tool')}
                  className="w-full rounded-xl border border-line bg-inkSoft text-paper px-4 py-3 pr-10 text-sm outline-none focus:border-teal/60 transition-colors appearance-none"
                >
                  <option value="" disabled className="bg-inkSoft text-paper">Select a builder</option>
                  {BUILDERS.map((b) => (
                    <option key={b.id} value={b.id} className="bg-inkSoft text-paper">{b.name}</option>
                  ))}
                </select>
                <svg
                  className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate"
                  width="14" height="14" viewBox="0 0 14 14" fill="none"
                >
                  <path d="M3 5l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>

            <div>
              <label htmlFor="status" className="block text-sm font-medium text-paper mb-2">
                Where's the app right now?
              </label>
              <div className="grid grid-cols-2 gap-3">
                {STATUS_OPTIONS.map((opt) => (
                  <label
                    key={opt.id}
                    className={`cursor-pointer text-sm text-center px-4 py-3 rounded-xl border transition-colors duration-150 ${
                      form.status === opt.id
                        ? 'border-teal bg-teal/10 text-teal'
                        : 'border-line text-slate hover:border-paper/30'
                    }`}
                  >
                    <input
                      type="radio"
                      name="status"
                      value={opt.id}
                      checked={form.status === opt.id}
                      onChange={update('status')}
                      className="sr-only"
                      required
                    />
                    {opt.label}
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-paper mb-2">
                Your email
              </label>
              <input
                id="email"
                type="email"
                required
                value={form.email}
                onChange={update('email')}
                placeholder="you@example.com"
                className="w-full rounded-xl border border-line bg-inkSoft text-paper px-4 py-3 text-sm outline-none focus:border-teal/60 transition-colors placeholder:text-slate/50"
              />
            </div>

            <div>
              <label htmlFor="goal" className="block text-sm font-medium text-paper mb-2">
                What's the main thing you want out of this?
              </label>
              <textarea
                id="goal"
                rows={4}
                required
                value={form.goal}
                onChange={update('goal')}
                placeholder="e.g. I want to stop paying $60/month for a side project that gets 20 visits a day."
                className="w-full rounded-xl border border-line bg-inkSoft text-paper px-4 py-3 text-sm outline-none focus:border-teal/60 transition-colors resize-none placeholder:text-slate/50"
              />
            </div>

            <button
              type="submit"
              disabled={submitState === 'sending'}
              className="w-full sm:w-auto bg-amber text-ink font-semibold px-7 py-3.5 rounded-full hover:bg-paper transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {submitState === 'sending' ? 'Sending…' : 'Send my project details'}
            </button>

            {submitState === 'error' && (
              <p className="text-sm text-amber">
                Something went wrong sending that. Mind trying again in a moment?
              </p>
            )}
          </form>

          <div className="border border-line rounded-2xl p-7 bg-inkSoft/40 h-fit sticky top-24">
            <h3 className="font-display text-lg text-paper mb-1">Live estimate</h3>
            <p className="text-xs text-slate mb-6 font-mono">UPDATES AS YOU PICK A BUILDER</p>

            {!selectedBuilder && (
              <p className="text-sm text-slate">Select a tool to see a year-one comparison.</p>
            )}

            {selectedBuilder && preview && (
              <div className="space-y-4 animate-rise">
                <div className="flex justify-between items-baseline">
                  <span className="text-sm text-slate">Stay on {selectedBuilder.name}</span>
                  <span className="font-mono text-xl text-amber">{formatUSD(preview.stayCost)}</span>
                </div>
                <div className="flex justify-between items-baseline">
                  <span className="text-sm text-slate">Migrate &amp; self-host</span>
                  <span className="font-mono text-xl text-teal">{formatUSD(preview.migrateCost)}</span>
                </div>
                <div className="h-px bg-line" />
                <div className="flex justify-between items-baseline">
                  <span className="text-sm text-paper font-medium">Year-one savings</span>
                  <span className="font-mono text-xl text-paper">{formatUSD(Math.max(preview.savings, 0))}</span>
                </div>
                <p className="text-xs text-slate leading-relaxed pt-2">{selectedBuilder.note}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
