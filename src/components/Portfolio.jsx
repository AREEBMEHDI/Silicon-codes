import { useRef } from 'react'
import useReveal from '../hooks/useReveal'
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion'
import premierCarAudio from '../assets/portfolio/premier-car-audio.jpg'
import radiantVisage from '../assets/portfolio/radiant-visage.png'
import rotanaSalon from '../assets/portfolio/rotana-salon.png'
import gatwickTaxi from '../assets/portfolio/gatwick-taxi.webp'
import londonCityAirport from '../assets/portfolio/london-city-airport.webp'
import SectionTransition from './SectionTransition'
import './Portfolio.css'

const PROJECTS = [
  {
    name: 'Premier Car Audio',
    category: 'Car Audio Retailer',
    desc: 'Business site and brand identity for a UK car audio installation and retail specialist.',
    image: premierCarAudio,
    url: 'https://www.premiercaraudio.co.uk/',
  },
  {
    name: 'Radiant Visage',
    category: 'Aesthetics & Beauty',
    desc: 'Website and logo design for an aesthetics clinic focused on modern, client-friendly booking.',
    image: radiantVisage,
    url: 'https://radiantvisageaesthetics.com/',
  },
  {
    name: 'Rotana Beauty Salon',
    category: 'Beauty Salon',
    desc: 'Brand identity and website for a UK beauty salon offering hair, styling and beauty services.',
    image: rotanaSalon,
    url: 'https://rotanasalon.co.uk/',
  },
  {
    name: 'Gatwick Taxi Near Me',
    category: 'Airport Transfers',
    desc: 'Booking-focused website for a Gatwick-based minicab and airport transfer service.',
    image: gatwickTaxi,
    url: 'https://gatwicktaxinearme.com/',
    imageFit: 'contain-dark',
  },
  {
    name: 'London City Airport Minicabs',
    category: 'Airport Transfers',
    desc: 'Website and branding for a London City Airport minicab and taxi transfer service.',
    image: londonCityAirport,
    url: 'https://londoncityairportminicabs.com/',
  },
  {
    name: 'Acton Taxis Cabs',
    category: 'Taxi & Minicab Service',
    desc: 'Logo and website design for a local London taxi and minicab booking service.',
    pattern: 'pattern-orbit',
  },
  {
    name: 'Shaadi Events',
    category: 'Events Planning',
    desc: 'Brand identity and web design for a UK wedding and events planning company.',
    pattern: 'pattern-grid',
  },
]

function ProjectImage({ project }) {
  const fitClass = project.imageFit === 'contain-dark' ? 'media-contain-dark' : project.image ? 'media-contain' : ''
  return (
    <div className={`project-media ${project.pattern || ''} ${fitClass}`}>
      {project.image ? (
        <img src={project.image} alt={`${project.name} logo`} loading="lazy" />
      ) : (
        <div className="project-media-overlay" />
      )}
    </div>
  )
}

function ProjectMeta({ project }) {
  return (
    <div className="project-text">
      <span className="project-category">{project.category}</span>
      <h3 className="project-title">{project.name}</h3>
      <p className="project-desc">{project.desc}</p>
    </div>
  )
}

function ProjectShowcase({ project, index }) {
  const [ref, visible] = useReveal({ threshold: 0.12 })
  const mediaRef = useRef(null)
  const reducedMotion = usePrefersReducedMotion()
  const Wrapper = project.url ? 'a' : 'div'
  const wrapperProps = project.url ? { href: project.url, target: '_blank', rel: 'noreferrer' } : {}
  const n = String(index + 1).padStart(2, '0')

  const handleMove = (e) => {
    if (reducedMotion) return
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    const el = mediaRef.current
    if (!el) return
    const rect = e.currentTarget.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width - 0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5
    el.style.setProperty('--tiltx', `${px * 10}px`)
    el.style.setProperty('--tilty', `${py * 10}px`)
  }

  const handleLeave = () => {
    const el = mediaRef.current
    if (!el) return
    el.style.setProperty('--tiltx', '0px')
    el.style.setProperty('--tilty', '0px')
  }

  return (
    <Wrapper
      {...wrapperProps}
      ref={ref}
      className={`project-row ${!project.url ? 'is-static' : ''} ${visible ? 'is-visible' : ''}`}
    >
      <div className="project-topline" aria-hidden="true">
        <span className="project-topline-index">Case Study / {n}</span>
        <span className="project-topline-rule" />
        <span className="project-topline-tag">Client Work</span>
      </div>

      <div className="project-split">
        <div className="project-visual" onMouseMove={handleMove} onMouseLeave={handleLeave}>
          <div className="project-frame" ref={mediaRef}>
            <ProjectImage project={project} />
            <span className="project-frame-corner tl" aria-hidden="true" />
            <span className="project-frame-corner tr" aria-hidden="true" />
            <span className="project-frame-corner bl" aria-hidden="true" />
            <span className="project-frame-corner br" aria-hidden="true" />
            {project.url && (
              <span className="project-frame-indicator" aria-hidden="true">
                <svg viewBox="0 0 20 20" fill="none">
                  <path d="M6 14 14 6M14 6H8M14 6v6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            )}
          </div>
        </div>

        <div className="project-content">
          <ProjectMeta project={project} />
          {project.url ? (
            <span className="project-link">
              View project
              <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path d="M4 10h12M12 6l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          ) : (
            <span className="project-link is-muted">Past project</span>
          )}
        </div>
      </div>
    </Wrapper>
  )
}

export default function Portfolio() {
  const [headRef, headVisible] = useReveal()

  return (
    <section id="portfolio" className="section portfolio section-clean" aria-label="Featured work">
      <SectionTransition />
      <div className="container">
        <div ref={headRef} className={`section-head portfolio-head reveal ${headVisible ? 'is-visible' : ''}`}>
          <p className="eyebrow">
            <span className="sys-index">§03</span> Featured Work
          </p>
          <h2 className="portfolio-heading">Real solutions. Real businesses. Real results.</h2>
          <span className="portfolio-divider" aria-hidden="true" />
        </div>

        <div className="project-list">
          {PROJECTS.map((project, i) => (
            <ProjectShowcase key={project.name} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
