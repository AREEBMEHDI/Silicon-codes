import { useEffect, useRef, useState } from 'react'

function noObserverSupport() {
  return typeof window === 'undefined' || typeof IntersectionObserver === 'undefined'
}

export default function useReveal({ threshold = 0.2, once = true } = {}) {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(noObserverSupport)

  useEffect(() => {
    const node = ref.current
    if (!node || noObserverSupport()) return undefined

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          if (once) observer.unobserve(node)
        } else if (!once) {
          setIsVisible(false)
        }
      },
      { threshold }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [threshold, once])

  return [ref, isVisible]
}
