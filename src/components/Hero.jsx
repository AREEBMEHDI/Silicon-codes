import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion'
import './Hero.css'

gsap.registerPlugin(ScrollTrigger)

const STEPS = [
  { key: 'ideas', word: 'IDEAS', tag: '/ concept & strategy', graphic: 'circuit' },
  { key: 'code', word: 'CODE', tag: '/ engineering', graphic: 'code' },
  { key: 'product', word: 'PRODUCT', tag: '/ interface & experience', graphic: 'product' },
  { key: 'impact', word: 'IMPACT', tag: '/ growth & results', graphic: 'impact' },
]

function CircuitGraphic() {
  return (
    <svg viewBox="0 0 320 220" fill="none" className="graphic graphic-circuit" aria-hidden="true">
      <path d="M10 40H90L110 60H210L230 40H310" stroke="currentColor" strokeOpacity="0.25" strokeWidth="1.5" />
      <path d="M10 110H70L90 90H160" stroke="currentColor" strokeOpacity="0.25" strokeWidth="1.5" />
      <path d="M160 90H240L260 110H310" stroke="currentColor" strokeOpacity="0.25" strokeWidth="1.5" />
      <path d="M10 180H100L120 160H200L220 180H310" stroke="currentColor" strokeOpacity="0.25" strokeWidth="1.5" />
      <path d="M160 90V150" stroke="currentColor" strokeOpacity="0.25" strokeWidth="1.5" />
      {[
        [10, 40], [90, 40], [210, 40], [310, 40],
        [10, 110], [90, 90], [160, 90], [240, 90], [310, 110],
        [10, 180], [120, 160], [200, 160], [310, 180], [160, 150],
      ].map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="4.5" className="node" style={{ animationDelay: `${(i % 7) * 0.22}s` }} />
      ))}
    </svg>
  )
}

function CodeGraphic() {
  const lines = [90, 60, 75, 40, 68, 50, 82]
  return (
    <div className="graphic graphic-code" aria-hidden="true">
      <div className="code-card">
        <div className="code-dots">
          <span /><span /><span />
        </div>
        <div className="code-lines">
          {lines.map((w, i) => (
            <div key={i} className={`code-line ${i === 3 ? 'is-accent' : ''}`} style={{ width: `${w}%`, animationDelay: `${i * 0.09}s` }} />
          ))}
          <span className="code-cursor" />
        </div>
      </div>
      <div className="code-card code-card-back" />
    </div>
  )
}

function ProductGraphic() {
  return (
    <div className="graphic graphic-product" aria-hidden="true">
      <div className="ui-frag frag-dash">
        <div className="frag-bar" style={{ width: '60%' }} />
        <div className="frag-chart">
          {[40, 65, 30, 80, 55].map((h, i) => (
            <span key={i} style={{ height: `${h}%`, animationDelay: `${i * 0.08}s` }} />
          ))}
        </div>
      </div>
      <div className="ui-frag frag-stat">
        <span className="frag-stat-label">Growth</span>
        <span className="frag-stat-value">+128%</span>
      </div>
      <div className="ui-frag frag-pill">Deploy ✓</div>
      <div className="ui-frag frag-toggle">
        <span className="frag-toggle-dot" />
      </div>
    </div>
  )
}

function ImpactGraphic() {
  return (
    <div className="graphic graphic-impact" aria-hidden="true">
      <svg viewBox="0 0 260 140" fill="none" className="impact-line">
        <polyline points="0,120 40,95 80,105 120,60 160,70 200,25 260,10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <div className="impact-bars">
        {[35, 55, 45, 70, 60, 90, 78].map((h, i) => (
          <span key={i} style={{ height: `${h}%`, animationDelay: `${i * 0.06}s` }} />
        ))}
      </div>
      <div className="impact-badge">▲ 3.2x ROI</div>
    </div>
  )
}

const GRAPHICS = {
  circuit: CircuitGraphic,
  code: CodeGraphic,
  product: ProductGraphic,
  impact: ImpactGraphic,
}

export default function Hero() {
  const wrapRef = useRef(null)
  const pinRef = useRef(null)
  const leftRef = useRef(null)
  const frameRef = useRef(null)
  const stepRefs = useRef([])
  const finalRef = useRef(null)
  const cueRef = useRef(null)
  const glowRef = useRef(null)
  const reducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    if (reducedMotion) return undefined

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia()

      mm.add('(min-width: 900px)', () => {
        const steps = stepRefs.current
        gsap.set(steps[0], { autoAlpha: 1 })
        gsap.set(steps.slice(1), { autoAlpha: 0 })
        gsap.set(finalRef.current, { autoAlpha: 0, y: 30 })

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: wrapRef.current,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.8,
            pin: pinRef.current,
            anticipatePin: 1,
          },
        })

        tl.to(cueRef.current, { autoAlpha: 0, duration: 0.25 })
          .to({}, { duration: 0.35 })

        for (let i = 0; i < steps.length - 1; i++) {
          tl.to(steps[i], { autoAlpha: 0, y: -16, duration: 0.32 })
            .fromTo(steps[i + 1], { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.32 }, '<')
            .to({}, { duration: 0.42 })
        }

        tl.to(leftRef.current, { autoAlpha: 0, y: -24, duration: 0.4 })
          .to(steps[steps.length - 1], { autoAlpha: 0, y: -16, duration: 0.4 }, '<')
          .to(frameRef.current, { autoAlpha: 0, scale: 0.94, duration: 0.4 }, '<')
          .fromTo(finalRef.current, { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 0.5 }, '<+0.12')
          .to({}, { duration: 0.4 })

        return () => tl.scrollTrigger?.kill()
      })
    }, wrapRef)

    return () => ctx.revert()
  }, [reducedMotion])

  useEffect(() => {
    if (reducedMotion) return undefined
    const el = pinRef.current
    if (!el || window.matchMedia('(max-width: 899px)').matches) return undefined

    let raf = null
    const onMove = (e) => {
      if (raf) return
      raf = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect()
        el.style.setProperty('--mx', `${((e.clientX - rect.left) / rect.width) * 100}%`)
        el.style.setProperty('--my', `${((e.clientY - rect.top) / rect.height) * 100}%`)
        raf = null
      })
    }
    el.addEventListener('mousemove', onMove)
    return () => el.removeEventListener('mousemove', onMove)
  }, [reducedMotion])

  const scrollToStory = () => {
    const target = wrapRef.current
    if (!target) return
    window.scrollTo({ top: target.offsetTop + window.innerHeight * 0.95, behavior: 'smooth' })
  }

  return (
    <section id="home" className="hero" aria-label="Introduction">
      <div className="hero-pin-wrap" ref={wrapRef}>
        <div className="hero-pin" ref={pinRef}>
          <div className="hero-cursor-glow" ref={glowRef} aria-hidden="true" />

          <div className="hero-grid">
            <div className="hero-left" ref={leftRef}>
              <p className="eyebrow hero-eyebrow">IDEAS <span aria-hidden="true">→</span> CODE <span aria-hidden="true">→</span> IMPACT</p>
              <h1 className="hero-title">
                Custom Software
                <br />
                Solutions for a
                <br />
                <span className="accent">Smarter Tomorrow</span>
              </h1>
              <p className="hero-sub">
                Silicon Codes Ltd. builds modern websites, applications and brand experiences —
                backed by SEO, digital marketing and IT support that help businesses grow, scale
                and stay ahead in the digital world.
              </p>
              <div className="hero-actions">
                <a href="#contact" className="btn btn-primary">
                  Start Your Project
                  <svg viewBox="0 0 20 20" fill="none" className="arrow" aria-hidden="true">
                    <path d="M4 10h12M12 6l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
                <button type="button" className="btn btn-secondary" onClick={scrollToStory}>
                  <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
                    <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.4" />
                    <path d="M8.2 6.8v6.4L13.4 10 8.2 6.8Z" fill="currentColor" />
                  </svg>
                  Watch Our Story
                </button>
              </div>
            </div>

            <div className="hero-right">
              <div className="hero-visual-frame" ref={frameRef}>
                <div className="hero-visual-bg" aria-hidden="true">
                  <span className="grid-dots" />
                </div>
                {STEPS.map((step, i) => {
                  const Graphic = GRAPHICS[step.graphic]
                  return (
                    <div
                      className="hero-step"
                      key={step.key}
                      ref={(el) => (stepRefs.current[i] = el)}
                    >
                      <div className="hero-step-top">
                        <span className="hero-step-index">0{i + 1} / 04</span>
                        <span className="hero-step-tag">{step.tag}</span>
                      </div>
                      <h3 className="hero-step-word">{step.word}</h3>
                      <div className="hero-step-graphic">
                        <Graphic />
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          <div className="hero-final" ref={finalRef}>
            <p className="hero-final-headline">
              Your Vision.
              <br />
              <span className="accent">Our Code.</span>
            </p>
            <p className="hero-final-sub">Let&rsquo;s build something people remember.</p>
            <a href="#contact" className="btn btn-primary">
              Start Your Project
              <svg viewBox="0 0 20 20" fill="none" className="arrow" aria-hidden="true">
                <path d="M4 10h12M12 6l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>

          <div className="hero-scroll-cue" ref={cueRef}>
            <span>Scroll</span>
            <i />
          </div>
        </div>
      </div>
    </section>
  )
}
