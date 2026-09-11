import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion'
import useReveal from '../hooks/useReveal'
import './BrandMoment.css'

gsap.registerPlugin(ScrollTrigger)

const WORDS = ['WE BUILD', 'EXPERIENCES.', 'PRODUCTS.', 'IMPACT.']

export default function BrandMoment() {
  const wrapRef = useRef(null)
  const pinRef = useRef(null)
  const captionRef = useRef(null)
  const wordRefs = useRef([])
  const finalRef = useRef(null)
  const reducedMotion = usePrefersReducedMotion()
  const [staticRef, staticVisible] = useReveal()

  useEffect(() => {
    if (reducedMotion) return undefined

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia()

      mm.add('(min-width: 768px)', () => {
        const words = wordRefs.current
        gsap.set(captionRef.current, { autoAlpha: 0, y: 16 })
        gsap.set(words[0], { autoAlpha: 1 })
        gsap.set(words.slice(1), { autoAlpha: 0 })
        gsap.set(finalRef.current, { autoAlpha: 0, y: 24 })

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: wrapRef.current,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.7,
            pin: pinRef.current,
            anticipatePin: 1,
          },
        })

        tl.to(captionRef.current, { autoAlpha: 1, y: 0, duration: 0.4 })
          .to({}, { duration: 0.35 })

        for (let i = 0; i < words.length - 1; i++) {
          tl.to(words[i], { autoAlpha: 0, y: -14, duration: 0.3 })
            .fromTo(words[i + 1], { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.3 }, '<')
            .to({}, { duration: 0.4 })
        }

        tl.to(captionRef.current, { autoAlpha: 0, duration: 0.3 })
          .to(words[words.length - 1], { autoAlpha: 0, y: -14, duration: 0.3 }, '<')
          .fromTo(finalRef.current, { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.5 }, '<+0.1')
          .to({}, { duration: 0.4 })

        return () => tl.scrollTrigger?.kill()
      })
    }, wrapRef)

    return () => ctx.revert()
  }, [reducedMotion])

  return (
    <section className="brand-moment" aria-label="What we build">
      <div className="brand-moment-wrap" ref={wrapRef}>
        <div className="brand-moment-pin" ref={pinRef}>
          {!reducedMotion ? (
            <>
              <p className="brand-moment-caption" ref={captionRef}>
                We don&rsquo;t just build software.
              </p>
              <div className="brand-moment-words">
                {WORDS.map((w, i) => (
                  <h2 key={w} className="brand-moment-word" ref={(el) => (wordRefs.current[i] = el)}>
                    {w}
                  </h2>
                ))}
              </div>
              <div className="brand-moment-final" ref={finalRef}>
                <h2>
                  Your Vision.
                  <br />
                  <span className="accent">Our Code.</span>
                </h2>
              </div>
            </>
          ) : (
            <div ref={staticRef} className={`brand-moment-static reveal ${staticVisible ? 'is-visible' : ''}`}>
              <p className="brand-moment-caption is-static">We don&rsquo;t just build software.</p>
              <h2 className="brand-moment-word is-static">We build experiences, products, impact.</h2>
              <h2>
                Your Vision.
                <br />
                <span className="accent">Our Code.</span>
              </h2>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
