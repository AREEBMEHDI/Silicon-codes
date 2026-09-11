import useReveal from '../hooks/useReveal'
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

function ProjectCard({ project, index }) {
  const [ref, visible] = useReveal({ threshold: 0.12 })
  const Wrapper = project.url ? 'a' : 'div'
  const wrapperProps = project.url ? { href: project.url, target: '_blank', rel: 'noreferrer' } : {}

  return (
    <Wrapper
      {...wrapperProps}
      ref={ref}
      className={`project-card reveal ${visible ? 'is-visible' : ''} ${!project.url ? 'is-static' : ''}`}
      style={{ '--reveal-delay': `${index * 80}ms` }}
    >
      <div className={`project-media ${project.pattern || ''} ${project.imageFit === 'contain-dark' ? 'media-contain-dark' : project.image ? 'media-contain' : ''}`}>
        {project.image ? (
          <img src={project.image} alt={`${project.name} logo`} loading="lazy" />
        ) : (
          <div className="project-media-overlay" />
        )}
        <span className="project-category-badge">{project.category}</span>
      </div>
      <div className="project-body">
        <div>
          <h3>{project.name}</h3>
          <p className="project-desc">{project.desc}</p>
        </div>
        {project.url ? (
          <span className="project-link">
            View Project
            <svg viewBox="0 0 20 20" fill="none">
              <path d="M4 10h12M12 6l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        ) : (
          <span className="project-link is-muted">Past Project</span>
        )}
      </div>
    </Wrapper>
  )
}

export default function Portfolio() {
  const [headRef, headVisible] = useReveal()
  return (
    <section id="portfolio" className="section portfolio" aria-label="Featured work">
      <SectionTransition />
      <div className="container">
        <div ref={headRef} className={`section-head reveal ${headVisible ? 'is-visible' : ''}`}>
          <p className="eyebrow">Featured Work</p>
          <h2>Real solutions. Real businesses. Real results.</h2>
        </div>

        <div className="portfolio-grid">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.name} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
