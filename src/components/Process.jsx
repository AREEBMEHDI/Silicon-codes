import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion'
import useReveal from '../hooks/useReveal'
import SectionTransition from './SectionTransition'
import './Process.css'

gsap.registerPlugin(ScrollTrigger)

const STEPS = [
  { n: '01', title: 'Discover', desc: 'We understand your goals and requirements.' },
  { n: '02', title: 'Design', desc: 'We transform ideas into intuitive experiences.' },
  { n: '03', title: 'Develop', desc: 'We build scalable, production-ready technology.' },
  { n: '04', title: 'Launch', desc: 'We deploy, optimize and support your product.' },
]

export default function Process() {
  const sectionRef = useRef(null)
  const trackRef = useRef(null)
  const fillRef = useRef(null)
  const [activeStep, setActiveStep] = useState(0)
  const reducedMotion = usePrefersReducedMotion()
  const [headRef, headVisible] = useReveal()

  const displayStep = reducedMotion ? STEPS.length - 1 : activeStep

  useEffect(() => {
    if (reducedMotion) return undefined

    const ctx = gsap.context(() => {
      const trigger = ScrollTrigger.create({
        trigger: trackRef.current,
        start: 'top 68%',
        end: 'bottom 55%',
        scrub: 0.6,
        onUpdate: (self) => {
          gsap.set(fillRef.current, { scaleX: self.progress, scaleY: self.progress })
          setActiveStep(Math.min(STEPS.length - 1, Math.floor(self.progress * STEPS.length)))
        },
      })
      return () => trigger.kill()
    }, sectionRef)

    return () => ctx.revert()
  }, [reducedMotion])

  return (
    <section id="process" className="section process" ref={sectionRef} aria-label="How we work">
      <SectionTransition />
      <div className="container">
        <div ref={headRef} className={`section-head center reveal ${headVisible ? 'is-visible' : ''}`}>
          <p className="eyebrow" style={{ justifyContent: 'center' }}>Our Process</p>
          <h2>How We Work</h2>
        </div>

        <div className="process-track" ref={trackRef}>
          <div className="process-line">
            <div className="process-line-fill" ref={fillRef} />
          </div>

          {STEPS.map((step, i) => (
            <div key={step.n} className={`process-step ${i <= displayStep ? 'is-active' : ''}`}>
              <div className="process-node">
                <span>{step.n}</span>
              </div>
              <h3>{step.title}</h3>
              <p>{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
