import useReveal from '../hooks/useReveal'
import useCountUp from '../hooks/useCountUp'
import SectionTransition from './SectionTransition'
import './WhyChooseUs.css'

const STATS = [
  { value: 90, label: 'Web Page Design, Logo Design, WordPress Theme Design, HTML, CSS' },
  { value: 87, label: 'Website & Application Development' },
  { value: 80, label: 'SEO, Digital Marketing, Social Media Marketing' },
  { value: 93, label: 'Content Writing, Blog Posts, Articles' },
]

const DIFFERENTIATORS = [
  {
    title: 'Innovative Solutions',
    tag: 'Fueling growth through innovation',
    desc: 'Our team of visionary experts is at the forefront of technology, bringing fresh ideas and creative strategies to help your business stay ahead of the curve.',
  },
  {
    title: 'Tailored Strategies',
    tag: 'Customized solutions for your growth',
    desc: 'Every business is unique. We develop strategies aligned with your objectives, leveraging deep industry knowledge to drive measurable results.',
  },
  {
    title: 'Excellent Portfolio',
    tag: 'Results that speak for themselves',
    desc: 'A track record of delivering successful projects and tangible outcomes has earned us a reputation for excellence across industries.',
  },
  {
    title: 'Cutting-Edge Technology',
    tag: 'Empowering you with a technological edge',
    desc: 'We stay current with the latest advancements and leverage modern tools and platforms to give your business a competitive edge.',
  },
  {
    title: 'Dedicated Support',
    tag: 'Your success is our commitment',
    desc: 'Our commitment extends beyond project delivery — dedicated, ongoing support to keep your digital solutions performing at their best.',
  },
  {
    title: 'Exceptional Customer Experience',
    tag: 'Putting customers first, every step of the way',
    desc: 'From initial consultation to post-project support, we go above and beyond to ensure your needs are met and exceeded throughout our partnership.',
  },
  {
    title: 'Flexible Pricing',
    tag: 'Affordable solutions for every budget',
    desc: 'Transparent, flexible pricing that caters to your budget — from startups to enterprise — without compromising on quality.',
  },
  {
    title: 'Result Oriented',
    tag: 'Driving measurable outcomes',
    desc: 'A data-driven approach combined with strategic thinking to identify the KPIs that matter and generate results that impact your bottom line.',
  },
]

function StatBar({ value, label, index, start }) {
  const count = useCountUp(value, { start, duration: 1200 })
  return (
    <div className="stat-bar" style={{ '--reveal-delay': `${index * 90}ms` }}>
      <div className="stat-bar-top">
        <span className="stat-bar-value">{count}%</span>
      </div>
      <div className="stat-bar-track">
        <div className="stat-bar-fill" style={{ width: start ? `${value}%` : '0%' }} />
      </div>
      <p className="stat-bar-label">{label}</p>
    </div>
  )
}

export default function WhyChooseUs() {
  const [headRef, headVisible] = useReveal()
  const [statsRef, statsVisible] = useReveal({ threshold: 0.3 })

  return (
    <section id="why-choose-us" className="section why-choose-us" aria-label="Why choose us">
      <SectionTransition />
      <div className="container">
        <div ref={headRef} className={`section-head reveal ${headVisible ? 'is-visible' : ''}`}>
          <p className="eyebrow">Why Choose Us</p>
          <h2>Unleash the power of digital solutions for your success.</h2>
          <p>We work directly for our clients and put their interests first.</p>
        </div>

        <div ref={statsRef} className="stats-bars">
          {STATS.map((stat, i) => (
            <StatBar key={stat.label} {...stat} index={i} start={statsVisible} />
          ))}
        </div>

        <div className="differentiators-grid">
          {DIFFERENTIATORS.map((item, i) => {
            return <Differentiator key={item.title} item={item} index={i} />
          })}
        </div>
      </div>
    </section>
  )
}

function Differentiator({ item, index }) {
  const [ref, visible] = useReveal({ threshold: 0.15 })
  return (
    <div ref={ref} className={`differentiator reveal ${visible ? 'is-visible' : ''}`} style={{ '--reveal-delay': `${(index % 3) * 90}ms` }}>
      <h4>{item.title}</h4>
      <p className="differentiator-tag">{item.tag}</p>
      <p>{item.desc}</p>
    </div>
  )
}
