import { useEffect, useRef, useState } from 'react'

export default function useCountUp(target, { duration = 1400, start = false } = {}) {
  const [value, setValue] = useState(0)
  const started = useRef(false)

  useEffect(() => {
    if (!start || started.current) return
    started.current = true

    const numericTarget = parseFloat(String(target).replace(/[^\d.]/g, '')) || 0
    const t0 = performance.now()

    const easeOutExpo = (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t))

    let raf
    const tick = (now) => {
      const progress = Math.min((now - t0) / duration, 1)
      setValue(Math.round(numericTarget * easeOutExpo(progress)))
      if (progress < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [start, target, duration])

  return value
}
