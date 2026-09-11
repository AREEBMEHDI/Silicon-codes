import useReveal from '../hooks/useReveal'
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion'
import {
  ReactIcon,
  NextIcon,
  NodeIcon,
  TypeScriptIcon,
  PythonIcon,
  FirebaseIcon,
  ReactNativeIcon,
  TailwindIcon,
  PostgresIcon,
  AiIcon,
} from './TechIcons'
import SectionCircuits from './SectionCircuits'
import SectionTransition from './SectionTransition'
import './TechStack.css'

const TECHS = [
  { name: 'React', icon: ReactIcon, color: '#61dafb' },
  { name: 'Next.js', icon: NextIcon, color: '#ffffff' },
  { name: 'Node.js', icon: NodeIcon, color: '#5fa04e' },
  { name: 'TypeScript', icon: TypeScriptIcon, color: '#3178c6' },
  { name: 'Python', icon: PythonIcon, color: '#3776ab' },
  { name: 'Firebase', icon: FirebaseIcon, color: '#f5820d' },
  { name: 'React Native', icon: ReactNativeIcon, color: '#61dafb' },
  { name: 'Tailwind CSS', icon: TailwindIcon, color: '#38bdf8' },
  { name: 'PostgreSQL', icon: PostgresIcon, color: '#336791' },
  { name: 'AI / LLM APIs', icon: AiIcon, color: 'var(--accent)' },
]

function TechCard({ tech }) {
  const Icon = tech.icon
  return (
    <div className="tech-card" style={{ '--tech-color': tech.color }}>
      <span className="tech-icon">
        <Icon />
      </span>
      <span className="tech-name">{tech.name}</span>
    </div>
  )
}

function MarqueeRow({ items, reverse }) {
  return (
    <div className="tech-marquee-wrap">
      <div className={`tech-marquee-track ${reverse ? 'is-reverse' : ''}`}>
        {[0, 1].map((group) => (
          <div className="tech-marquee-group" key={group} aria-hidden={group === 1}>
            {items.map((tech) => (
              <TechCard key={`${tech.name}-${group}`} tech={tech} />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

function StaticGrid({ items }) {
  return (
    <div className="tech-grid">
      {items.map((tech) => (
        <TechCard key={tech.name} tech={tech} />
      ))}
    </div>
  )
}

export default function TechStack() {
  const [headRef, headVisible] = useReveal()
  const reducedMotion = usePrefersReducedMotion()

  return (
    <section id="tech-stack" className="section tech-stack section-dark" aria-label="Technologies we work with">
      <SectionTransition />
      <SectionCircuits variant="a" />
      <div className="container">
        <div ref={headRef} className={`section-head reveal ${headVisible ? 'is-visible' : ''}`}>
          <p className="eyebrow">Our Stack</p>
          <h2>Technologies We Work With</h2>
        </div>
      </div>

      {reducedMotion ? (
        <div className="container">
          <StaticGrid items={TECHS} />
        </div>
      ) : (
        <div className="tech-marquee-stack">
          <MarqueeRow items={TECHS} />
        </div>
      )}
    </section>
  )
}
