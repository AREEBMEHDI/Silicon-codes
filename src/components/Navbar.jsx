import { useEffect, useRef, useState } from 'react'
import logo from '../assets/Logo.png'
import './Navbar.css'

const LINKS = [
  { href: '#home', label: 'Home', idx: '00' },
  { href: '#services', label: 'Services', idx: '01' },
  { href: '#portfolio', label: 'Portfolio', idx: '02' },
  { href: '#process', label: 'Process', idx: '03' },
  { href: '#tech-stack', label: 'Tech Stack', idx: '04' },
  { href: '#about', label: 'About', idx: '05' },
  { href: '#contact', label: 'Contact', idx: '06' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('#home')
  const linkRefs = useRef({})
  const [indicator, setIndicator] = useState({ left: 0, width: 0, opacity: 0 })

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sections = LINKS.map((l) => document.querySelector(l.href)).filter(Boolean)
    if (!sections.length || typeof IntersectionObserver === 'undefined') return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(`#${entry.target.id}`)
          }
        })
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: 0 }
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const node = linkRefs.current[active]
    if (node) {
      setIndicator({ left: node.offsetLeft, width: node.offsetWidth, opacity: 1 })
    }
  }, [active, scrolled])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header className={`navbar ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="container navbar-inner">
        <a href="#home" className="navbar-logo" aria-label="Silicon Codes Ltd. — home">
          <img src={logo} alt="Silicon Codes Ltd." />
        </a>

        <nav className="navbar-links" aria-label="Primary">
          <span
            className="navbar-indicator"
            style={{ left: indicator.left, width: indicator.width, opacity: indicator.opacity }}
            aria-hidden="true"
          />
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              ref={(el) => (linkRefs.current[link.href] = el)}
              className={active === link.href ? 'is-active' : ''}
              onClick={() => setActive(link.href)}
            >
              <span className="navbar-link-idx">{link.idx}</span>
              {link.label}
            </a>
          ))}
        </nav>

        <a href="#contact" className="btn btn-primary navbar-cta">
          Let&rsquo;s Build
          <svg viewBox="0 0 20 20" fill="none" className="arrow" aria-hidden="true">
            <path d="M4 10h12M12 6l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>

        <button
          className={`navbar-burger ${open ? 'is-open' : ''}`}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <div className={`navbar-mobile ${open ? 'is-open' : ''}`}>
        <nav aria-label="Mobile">
          {LINKS.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              style={{ transitionDelay: `${i * 40}ms` }}
              onClick={() => {
                setActive(link.href)
                setOpen(false)
              }}
            >
              <span className="navbar-mobile-idx">{link.idx}</span>
              {link.label}
            </a>
          ))}
        </nav>
        <a href="#contact" className="btn btn-primary" onClick={() => setOpen(false)}>
          Let&rsquo;s Build
          <svg viewBox="0 0 20 20" fill="none" className="arrow" aria-hidden="true">
            <path d="M4 10h12M12 6l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>
    </header>
  )
}
