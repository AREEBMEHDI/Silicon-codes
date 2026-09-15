import useReveal from '../hooks/useReveal'
import SectionCircuits from './SectionCircuits'
import SectionTransition from './SectionTransition'
import './Testimonials.css'

const TESTIMONIALS = [
  {
    quote: 'Silicon Codes went above and beyond with our website design and development. They created a user-friendly website that perfectly represents our brand. They paid attention to every detail and made the whole process easy. I highly recommend them!',
    name: 'John Almeda',
    role: 'CEO of Live Taxis Cabs Services, London',
  },
  {
    quote: 'The graphic design and logo design services from Silicon Codes were amazing. Their creative team understood our brand and delivered beautiful designs that made us stand out. Working with them was a breeze, and we’re thrilled with the final results.',
    name: 'Sarah Johnson',
    role: 'Marketing Manager at Supremo Corporation, USA',
  },
  {
    quote: 'Silicon Codes helped us get noticed online. Their SEO strategies boosted our website’s ranking on search engines, bringing in more visitors and customers. They know how to use the right keywords and optimize our content. They’re the best!',
    name: 'Stella Larson',
    role: 'Founder of Welcome Online Store, London',
  },
  {
    quote: 'Choosing Silicon Codes for our digital marketing was a game-changer. They know all about the digital world and helped us reach the right people. We saw more people finding us online and our sales went up. We’re so happy we worked with them!',
    name: 'Paul Smith',
    role: 'Marketing Director at Global Solutions Inc., Canada',
  },
  {
    quote: 'Silicon Codes made an amazing app for us. Their team of developers is really talented and listened to what we wanted. They made it easy to use and it works perfectly. We’re so impressed and can’t wait to work with them again!',
    name: 'David Thompson',
    role: 'CEO of Tech Innovators Ltd., Ireland',
  },
  {
    quote: 'Silicon Codes helped us with our online store, and it made a huge difference. They created a great website with all the features we needed. Our sales went up and our customers love it. We’re grateful for their ongoing support and dedication.',
    name: 'Lisa Anderson',
    role: 'Owner of Fashion Paradise Boutique, USA',
  },
]

function TestimonialCard({ item, index }) {
  const [ref, visible] = useReveal({ threshold: 0.15 })
  return (
    <div ref={ref} className={`testimonial-card reveal ${visible ? 'is-visible' : ''}`} style={{ '--reveal-delay': `${(index % 3) * 90}ms` }}>
      <svg className="quote-mark" viewBox="0 0 32 24" fill="none" aria-hidden="true">
        <path d="M0 24V14.4C0 5.76 5.76 0 14.4 0v6.4C9.6 6.4 6.4 9.6 6.4 14.4H14.4V24H0ZM17.6 24V14.4C17.6 5.76 23.36 0 32 0v6.4c-4.8 0-8 3.2-8 8H32V24H17.6Z" fill="currentColor" />
      </svg>
      <p className="testimonial-quote">{item.quote}</p>
      <div className="testimonial-attribution">
        <span className="testimonial-name">{item.name}</span>
        <span className="testimonial-role">{item.role}</span>
      </div>
    </div>
  )
}

export default function Testimonials() {
  const [headRef, headVisible] = useReveal()
  return (
    <section id="testimonials" className="section testimonials" aria-label="Client testimonials">
      <SectionTransition />
      <SectionCircuits variant="c" opacity={0.35} />
      <div className="container">
        <div ref={headRef} className={`section-head center reveal ${headVisible ? 'is-visible' : ''}`}>
          <p className="eyebrow" style={{ justifyContent: 'center' }}>
            <span className="sys-index">§08</span> Testimonials
          </p>
          <h2>Hear it from our valued customers.</h2>
        </div>

        <div className="testimonials-grid">
          {TESTIMONIALS.map((item, i) => (
            <TestimonialCard key={item.name} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
