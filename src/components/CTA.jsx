import { useRef } from 'react'
import useReveal from '../hooks/useReveal'
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion'
import SectionCircuits from './SectionCircuits'
import SectionTransition from './SectionTransition'
import './CTA.css'

export default function CTA() {
  const [ref, visible] = useReveal()
  const btnRef = useRef(null)
  const reducedMotion = usePrefersReducedMotion()

  const onMove = (e) => {
    if (reducedMotion) return
    const btn = btnRef.current
    if (!btn) return
    const rect = btn.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    btn.style.transform = `translate(${x * 0.28}px, ${y * 0.42}px)`
  }

  const onLeave = () => {
    if (btnRef.current) btnRef.current.style.transform = ''
  }

  return (
    <section id="contact" className="cta section-dark section" aria-label="Contact us">
      <SectionTransition />
      <SectionCircuits variant="a" />

      <div className="container cta-inner" ref={ref}>
        <div className={`reveal ${visible ? 'is-visible' : ''}`}>
          <p className="eyebrow" style={{ justifyContent: 'center' }}>Get In Touch</p>
          <h2 className="cta-heading">
            Let&rsquo;s Build Something
            <br />
            <span className="accent">Great Together.</span>
          </h2>
          <p className="cta-sub">Have an idea? Let&rsquo;s turn it into reality.</p>

          <a
            href="mailto:info@siliconcodes.com"
            className="btn btn-primary cta-btn"
            ref={btnRef}
            onMouseMove={onMove}
            onMouseLeave={onLeave}
          >
            Get In Touch
            <svg viewBox="0 0 20 20" fill="none" className="arrow" aria-hidden="true">
              <path d="M4 10h12M12 6l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>

          <div className="cta-contact-row">
            <a href="tel:+442039307976">+44 20 3930 7976</a>
            <span aria-hidden="true">/</span>
            <a href="mailto:info@siliconcodes.com">info@siliconcodes.com</a>
          </div>
        </div>
      </div>
    </section>
  )
}
