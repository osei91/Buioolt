import { useEffect, useRef, useState } from 'react'

// Counts up from 0 to `value`. Re-animates whenever `value` changes (so it
// works both for a one-time scroll reveal and for a repeating rotation like
// the hero ledger) but never restarts for the same value while still trigger=true.
export default function Counter({ value, prefix = '', suffix = '', duration = 900, trigger = true }) {
  const [display, setDisplay] = useState(0)
  const lastAnimatedValue = useRef(null)

  useEffect(() => {
    if (!trigger || lastAnimatedValue.current === value) return
    lastAnimatedValue.current = value
    const start = performance.now()
    const from = 0
    const to = value

    function tick(now) {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplay(Math.round(from + (to - from) * eased))
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [trigger, value, duration])

  return (
    <span className="tnum">
      {prefix}
      {display.toLocaleString('en-US')}
      {suffix}
    </span>
  )
}
