import { useRef, useState } from 'react'
import useReveal from '../hooks/useReveal'
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion'
import SectionCircuits from './SectionCircuits'
import SectionTransition from './SectionTransition'
import './CTA.css'

const OFFICES = [
  {
    label: 'London, UK Office',
    address: '43 Hideaway Work Space, 1 Empire Mews, London SW16 2BF',
    phones: ['+44 20 3930 7976', '+44 7709 637912'],
    email: 'info@siliconcodes.com',
  },
  {
    label: 'New York, USA Office',
    address: '8724 115th St, Richmond Hill, NY 11418, USA',
    phones: ['+1 (917) 730 2032'],
    email: 'info@siliconcodes.com',
  },
]

function ArrowIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="arrow" aria-hidden="true">
      <path d="M4 10h12M12 6l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function CTA() {
  const [heroRef, heroVisible] = useReveal()
  const [panelRef, panelVisible] = useReveal({ threshold: 0.08 })
  const btnRef = useRef(null)
  const reducedMotion = usePrefersReducedMotion()
  const [status, setStatus] = useState('idle')

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

  const handleSubmit = (e) => {
    e.preventDefault()
    const form = e.target
    const data = new FormData(form)
    const name = data.get('name')?.toString().trim() || ''
    const phone = data.get('phone')?.toString().trim() || ''
    const email = data.get('email')?.toString().trim() || ''
    const country = data.get('country')?.toString().trim() || ''
    const services = data.get('services')?.toString().trim() || ''

    const subject = `New project inquiry from ${name || 'website visitor'}`
    const body = [
      `Name: ${name}`,
      `Phone: ${phone}`,
      `Email: ${email}`,
      `Country: ${country}`,
      `Services required: ${services}`,
    ].join('\n')

    window.location.href = `mailto:info@siliconcodes.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    setStatus('sent')
    form.reset()
  }

  return (
    <section id="contact" className="cta section-dark section" aria-label="Contact us">
      <SectionTransition />
      <SectionCircuits variant="a" />

      <div className="container cta-inner">
        <div ref={heroRef} className={`cta-hero reveal ${heroVisible ? 'is-visible' : ''}`}>
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
            <ArrowIcon />
          </a>

          <div className="cta-contact-row">
            <a href="tel:+442039307976">+44 20 3930 7976</a>
            <span aria-hidden="true">/</span>
            <a href="mailto:info@siliconcodes.com">info@siliconcodes.com</a>
          </div>
        </div>

        <div ref={panelRef} className={`cta-panel reveal ${panelVisible ? 'is-visible' : ''}`}>
          <form className="cta-form" onSubmit={handleSubmit}>
            <h3>Send Us a Message</h3>
            <p className="cta-form-hint">
              Fill this in and it&rsquo;ll open your email app with everything ready to send.
            </p>

            <label className="cta-field">
              <span>
                Your Full Name <span className="cta-required">*</span>
              </span>
              <input type="text" name="name" required minLength={2} maxLength={50} autoComplete="name" />
            </label>

            <label className="cta-field">
              <span>
                Phone <span className="cta-required">*</span>
              </span>
              <input type="tel" name="phone" required minLength={5} maxLength={30} autoComplete="tel" />
            </label>

            <label className="cta-field">
              <span>
                Your Email <span className="cta-required">*</span>
              </span>
              <input type="email" name="email" required autoComplete="email" />
            </label>

            <label className="cta-field">
              <span>
                Your Country <span className="cta-required">*</span>
              </span>
              <input type="text" name="country" required maxLength={50} autoComplete="country-name" />
            </label>

            <label className="cta-field">
              <span>
                What services do you require? <span className="cta-required">*</span>
              </span>
              <input
                type="text"
                name="services"
                required
                maxLength={250}
                placeholder="e.g. Website design, SEO, Digital Marketing"
              />
            </label>

            <button type="submit" className="btn btn-primary cta-form-submit">
              Submit
              <ArrowIcon />
            </button>

            {status === 'sent' && (
              <p className="cta-form-status" role="status">
                Your email app should now be open with your message ready to send.
              </p>
            )}
          </form>

          <div className="cta-offices">
            {OFFICES.map((office) => (
              <div className="cta-office" key={office.label}>
                <div className="cta-office-map">
                  <iframe
                    src={`https://maps.google.com/maps?output=embed&q=${encodeURIComponent(office.address)}&z=15&t=m`}
                    title={`Map to Silicon Codes ${office.label}`}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
                <div className="cta-office-body">
                  <h4>{office.label}</h4>
                  <p>{office.address}</p>
                  <a href={`mailto:${office.email}`}>{office.email}</a>
                  {office.phones.map((phone) => (
                    <a key={phone} href={`tel:${phone.replace(/\s+/g, '')}`}>
                      {phone}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
