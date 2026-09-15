import logo from '../assets/Logo.png'
import useReveal from '../hooks/useReveal'
import SectionCircuits from './SectionCircuits'
import SectionTransition from './SectionTransition'
import './About.css'

const PILLARS = [
  {
    title: 'Unleashing Innovation',
    desc: 'Our talented team of developers, designers, and strategists work collaboratively to bring your boldest ideas to life — leveraging the latest technologies and creative thinking to drive efficiency and elevate user experiences.',
  },
  {
    title: 'Empowering Businesses',
    desc: 'With a comprehensive suite of services — web development, mobile app solutions, e-commerce platforms and more — we equip organisations of all sizes with the tools they need to succeed in the digital landscape.',
  },
  {
    title: 'Driving Growth',
    desc: 'Our holistic approach combines technical expertise with strategic thinking to deliver solutions that solve immediate challenges while positioning your business for scalable, long-term success.',
  },
]

const TEAM = [
  {
    title: 'Our Leadership',
    desc: 'A wealth of experience and expertise in digital solutions, guiding the team in unleashing innovation, empowering businesses, and driving growth with lasting client partnerships.',
    icon: <path d="M12 2 3 7v10l9 5 9-5V7l-9-5Z M12 12v10 M3 7l9 5 9-5" strokeLinecap="round" strokeLinejoin="round" />,
  },
  {
    title: 'Development Experts',
    desc: 'At the forefront of cutting-edge technologies and coding practices — software, web and mobile app development — focused on efficiency, scalability and security.',
    icon: <path d="m8 9-4 3 4 3 M16 9l4 3-4 3 M13 6l-2 12" strokeLinecap="round" strokeLinejoin="round" />,
  },
  {
    title: 'Creative Designers',
    desc: 'Visually captivating, user-centric digital experiences — combining artistic flair with design principles to create engaging interfaces true to your brand.',
    icon: <path d="M12 3a9 9 0 1 0 9 9c0-1.1-.9-2-2-2h-2a2 2 0 0 1-2-2V6a2 2 0 0 0-2-2 1 1 0 0 1-1-1Z M7.5 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z M9 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z M14 8a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" strokeLinecap="round" strokeLinejoin="round" />,
  },
]

const REGIONS = [
  { country: 'United Kingdom', cities: 'London, Manchester, Birmingham, Edinburgh' },
  { country: 'United States', cities: 'Silicon Valley, Seattle, New York City, Austin' },
  { country: 'Germany', cities: 'Berlin, Munich, Frankfurt' },
  { country: 'Canada', cities: 'Toronto, Vancouver, Montreal' },
  { country: 'Australia', cities: 'Sydney, Melbourne, Brisbane' },
  { country: 'Singapore', cities: 'A global technology and innovation hub' },
]

function Reveal({ as: Tag = 'div', className = '', delay = 0, children, threshold = 0.15 }) {
  const [ref, visible] = useReveal({ threshold })
  return (
    <Tag ref={ref} className={`${className} reveal ${visible ? 'is-visible' : ''}`} style={{ '--reveal-delay': `${delay}ms` }}>
      {children}
    </Tag>
  )
}

export default function About() {
  const [visualRef, visualVisible] = useReveal()
  const [textRef, textVisible] = useReveal()

  return (
    <section id="about" className="section about" aria-label="About Silicon Codes">
      <SectionTransition />
      <SectionCircuits variant="c" opacity={0.4} />
      <div className="container">
        <div className="about-grid">
          <div ref={visualRef} className={`about-visual reveal ${visualVisible ? 'is-visible' : ''}`}>
            <div className="about-visual-frame">
              <div className="about-glow" aria-hidden="true" />
              <div className="about-rings" aria-hidden="true">
                <span />
                <span />
                <span />
              </div>
              <img src={logo} alt="Silicon Codes Ltd. emblem" className="about-logo" />
              <svg className="about-circuit" viewBox="0 0 300 300" fill="none" aria-hidden="true">
                <path d="M20 150H90 M210 150H280 M150 20V90 M150 210V280 M60 60l40 40 M240 60l-40 40 M60 240l40-40 M240 240l-40-40" stroke="currentColor" strokeOpacity="0.18" strokeWidth="1.4" />
                {[[20,150],[280,150],[150,20],[150,280],[60,60],[240,60],[60,240],[240,240]].map(([cx,cy],i)=>(
                  <circle key={i} cx={cx} cy={cy} r="4" className="about-node" style={{ animationDelay: `${i*0.25}s` }} />
                ))}
              </svg>
            </div>
          </div>

          <div ref={textRef} className={`about-content reveal ${textVisible ? 'is-visible' : ''}`}>
            <p className="eyebrow">
              <span className="sys-index">§05</span> Who We Are
            </p>
            <h2 className="about-heading">
              Revolutionising digital solutions for
              <span className="accent"> global success.</span>
            </h2>
            <p className="about-copy">
              Welcome to Silicon Codes, a London-based provider of transformative digital
              solutions. We believe in harnessing the power of technology to propel businesses
              to new heights — delivering cutting-edge websites, apps, branding, SEO, content
              and marketing tailored to your unique needs. With a global presence and a passion
              for innovation, we empower businesses across industries to thrive in the
              ever-evolving digital era.
            </p>
          </div>
        </div>

        <div className="about-pillars">
          {PILLARS.map((p, i) => (
            <Reveal key={p.title} className="pillar" delay={i * 90}>
              <span className="pillar-n">{String(i + 1).padStart(2, '0')}</span>
              <div>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="about-subhead">
          <p className="eyebrow">
            <span className="sys-index">§05.1</span> Meet Our Team
          </p>
          <h3>A diverse team, one shared standard of craft.</h3>
        </Reveal>

        <div className="about-team">
          {TEAM.map((t, i) => (
            <Reveal key={t.title} className="team-card" delay={i * 90}>
              <span className="team-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                  {t.icon}
                </svg>
              </span>
              <h4>{t.title}</h4>
              <p>{t.desc}</p>
            </Reveal>
          ))}
        </div>

        <Reveal className="about-subhead">
          <p className="eyebrow">
            <span className="sys-index">§05.2</span> Where We Work
          </p>
          <h3>Serving forward-thinking businesses across the globe.</h3>
        </Reveal>

        <div className="about-regions">
          {REGIONS.map((r, i) => (
            <Reveal key={r.country} as="div" className="region-card" delay={(i % 3) * 80}>
              <div className="region-top">
                <span className="region-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                    <path d="M12 21s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12Z" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="12" cy="9" r="2.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span className="region-live" aria-hidden="true">
                  <span className="region-live-ring" />
                  <span className="region-live-dot" />
                </span>
              </div>
              <h4>{r.country}</h4>
              <p>{r.cities}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
