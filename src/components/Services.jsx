import { useState } from 'react'
import useReveal from '../hooks/useReveal'
import SectionCircuits from './SectionCircuits'
import SectionTransition from './SectionTransition'
import './Services.css'

const SERVICES = [
  {
    n: '01',
    category: 'Web & AI',
    title: 'AI-Based Web Development',
    tag: 'Where creativity meets intelligence',
    desc: 'Modern, AI-assisted websites with responsive design, smart features and intuitive navigation that leave a lasting impression on your customers.',
    icon: <path d="M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6Z M4 9h16" strokeLinecap="round" strokeLinejoin="round" />,
  },
  {
    n: '02',
    category: 'Design',
    title: 'Logo and Graphic Designing',
    tag: 'Captivate, inspire, engage',
    desc: 'Visually striking logos and graphics that convey your brand’s personality, crafted with a deep understanding of design principles.',
    icon: <path d="M12 3 3 8.5 12 14l9-5.5L12 3Z M3 15.5 12 21l9-5.5 M3 12l9 5.5 9-5.5" strokeLinecap="round" strokeLinejoin="round" />,
  },
  {
    n: '03',
    category: 'SEO',
    title: 'SEO Optimization',
    tag: 'Keywords become the center of attention',
    desc: 'Comprehensive keyword research, on-page optimization and link building to rank higher and drive organic traffic.',
    icon: <path d="M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14Z M16 16l5 5 M8 11h6 M11 8v6" strokeLinecap="round" strokeLinejoin="round" />,
  },
  {
    n: '04',
    category: 'Content',
    title: 'Content Writing',
    tag: 'Content that sparks engagement',
    desc: 'Informative, persuasive content across web copy, blogs and marketing collateral that resonates with your audience.',
    icon: <path d="M6 3h9l5 5v13a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z M15 3v5h5 M8 13h8M8 17h5" strokeLinecap="round" strokeLinejoin="round" />,
  },
  {
    n: '05',
    category: 'Mobile',
    title: 'Application Designing and Development',
    tag: 'Apps that inspire, engage, and amaze',
    desc: 'Custom mobile applications built from concept to launch, aligned with your business goals and user experience.',
    icon: <path d="M8 3h8a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z M11 18h2" strokeLinecap="round" strokeLinejoin="round" />,
  },
  {
    n: '06',
    category: 'Marketing',
    title: 'Digital Marketing',
    tag: 'Strategic solutions, tangible results',
    desc: 'Data-driven, multi-channel campaigns across search, social and email to amplify your brand and drive measurable results.',
    icon: <path d="M4 10v4h4l6 5V5l-6 5H4Z M17 9a4 4 0 0 1 0 6 M20 6a8 8 0 0 1 0 12" strokeLinecap="round" strokeLinejoin="round" />,
  },
  {
    n: '07',
    category: 'Writing',
    title: 'Ghostwriting Services',
    tag: 'Your vision, our words',
    desc: 'Compelling narratives tailored to your unique voice — from articles and blog posts to books and speeches.',
    icon: <path d="M4 20 14.5 9.5 M17 3l4 4-9.5 9.5H7v-4.5L17 3Z M4 20h4" strokeLinecap="round" strokeLinejoin="round" />,
  },
  {
    n: '08',
    category: 'Blockchain',
    title: 'NFT Solutions',
    tag: 'Tokenize your imagination',
    desc: 'End-to-end guidance through concept creation, tokenization and marketplace integration for digital assets.',
    icon: <path d="M12 2 3 7v10l9 5 9-5V7l-9-5Z M3 7l9 5 9-5 M12 12v10" strokeLinecap="round" strokeLinejoin="round" />,
  },
  {
    n: '09',
    category: 'Commerce',
    title: 'Ecommerce Solutions',
    tag: 'Expand your digital storefront',
    desc: 'Tailored platforms with user-friendly interfaces, secure payment gateways and robust inventory management.',
    icon: <path d="M3 4h2l1.4 10.6a2 2 0 0 0 2 1.7h7.6a2 2 0 0 0 2-1.6L19.5 8H6.2 M9 20a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z M17 20a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" strokeLinecap="round" strokeLinejoin="round" />,
  },
  {
    n: '10',
    category: 'AI',
    title: 'AI Software',
    tag: 'Custom intelligence for your business',
    desc: 'Bespoke AI-powered tools and integrations — from automation to intelligent assistants — built to solve real business problems.',
    icon: <path d="M12 3l1.8 6.2L20 11l-6.2 1.8L12 19l-1.8-6.2L4 11l6.2-1.8L12 3Z" strokeLinecap="round" strokeLinejoin="round" />,
  },
  {
    n: '11',
    category: 'Video',
    title: 'Video Editing',
    tag: 'Stories that capture attention',
    desc: 'Professional video editing and post-production — promos, social content and brand films — polished to engage your audience.',
    icon: <path d="M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z M10 9l5 3-5 3V9Z" strokeLinecap="round" strokeLinejoin="round" />,
  },
  {
    n: '12',
    category: 'CRM',
    title: 'CRM',
    tag: 'Know your customers, grow your business',
    desc: 'Custom CRM solutions that centralize customer data, streamline sales pipelines and strengthen client relationships.',
    icon: <path d="M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6Z M9 12a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z M6.5 17c.6-1.8 1.9-2.5 2.5-2.5s1.9.7 2.5 2.5 M14 9h4M14 12h4M14 15h3" strokeLinecap="round" strokeLinejoin="round" />,
  },
]

const IT_SERVICES = [
  {
    n: 'A',
    category: 'IT Support',
    title: 'IT Support & Consultation',
    desc: 'Comprehensive IT support and consultation so you can concentrate on core operations while we handle your technology needs.',
    icon: <path d="M4 15v-3a8 8 0 0 1 16 0v3 M4 15a2 2 0 0 0 2 2h1v-5H6a2 2 0 0 0-2 2Z M20 15a2 2 0 0 1-2 2h-1v-5h1a2 2 0 0 1 2 2Z M9 19a3 3 0 0 0 3 2h1" strokeLinecap="round" strokeLinejoin="round" />,
  },
  {
    n: 'B',
    category: 'Remote',
    title: 'Remote IT Support Services',
    desc: 'Expert remote support that keeps your systems running smoothly and efficiently — no on-site visits required.',
    icon: <path d="M4 5h16v10H4z M9 20h6 M12 15v5" strokeLinecap="round" strokeLinejoin="round" />,
  },
  {
    n: 'C',
    category: 'ERP',
    title: 'Odoo Partner',
    desc: 'Customized Odoo ERP implementation and support designed to enhance your business operations, tailored to your specific needs.',
    icon: <path d="M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1" strokeLinecap="round" strokeLinejoin="round" />,
  },
  {
    n: 'D',
    category: 'Technical',
    title: 'Technical Services',
    desc: 'End-to-end technical services — system installation & setup, PC building and diagnostics — to keep operations reliable.',
    icon: <path d="M14.7 6.3a4 4 0 0 1-5.4 5.4L4 17l3 3 5.3-5.3a4 4 0 0 1 5.4-5.4L21 6l-3-3-3.3 3.3Z" strokeLinecap="round" strokeLinejoin="round" />,
  },
  {
    n: 'E',
    category: 'HR Tech',
    title: 'HR Management Software',
    desc: 'Streamline workforce management — employee profiles, attendance, leave and payroll — in one seamless suite.',
    icon: <path d="M9 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z M3 20a6 6 0 0 1 12 0 M17 11a3 3 0 1 0 0-6 M21 20a6 6 0 0 0-5-5.9" strokeLinecap="round" strokeLinejoin="round" />,
  },
]

function ServiceRow({ service, index, active, onActivate }) {
  const [ref, visible] = useReveal({ threshold: 0.15 })
  return (
    <div
      ref={ref}
      className={`service-row reveal ${visible ? 'is-visible' : ''} ${active ? 'is-active' : ''}`}
      style={{ '--reveal-delay': `${(index % 4) * 60}ms` }}
      tabIndex={0}
      onMouseEnter={onActivate}
      onFocus={onActivate}
    >
      <span className="service-row-glow" aria-hidden="true" />
      <span className="service-row-n">{service.n}</span>
      <div className="service-row-main">
        <span className="service-row-category">{service.category}</span>
        <h3>{service.title}</h3>
        {service.tag && <p className="service-row-tag">{service.tag}</p>}
      </div>
      <p className="service-row-desc">{service.desc}</p>
      <span className="service-row-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          {service.icon}
        </svg>
      </span>
      <span className="service-row-arrow" aria-hidden="true">
        <svg viewBox="0 0 20 20" fill="none">
          <path d="M4 10h12M12 6l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </div>
  )
}

export default function Services() {
  const [headRef, headVisible] = useReveal()
  const [itHeadRef, itHeadVisible] = useReveal()
  const [activeIndex, setActiveIndex] = useState(0)
  const [itActiveIndex, setItActiveIndex] = useState(0)

  return (
    <section id="services" className="section services" aria-label="What we do">
      <SectionTransition />
      <SectionCircuits variant="b" opacity={0.35} />
      <span className="services-field" aria-hidden="true" />

      <div className="container">
        <div ref={headRef} className={`section-head reveal ${headVisible ? 'is-visible' : ''}`}>
          <p className="eyebrow">
            <span className="sys-index">§01</span> Capabilities
          </p>
          <h2>Digital solutions built to solve real problems.</h2>
        </div>

        <div className="services-list" role="list">
          {SERVICES.map((service, i) => (
            <ServiceRow
              key={service.title}
              service={service}
              index={i}
              active={activeIndex === i}
              onActivate={() => setActiveIndex(i)}
            />
          ))}
        </div>

        <div ref={itHeadRef} className={`it-head reveal ${itHeadVisible ? 'is-visible' : ''}`}>
          <p className="eyebrow">
            <span className="sys-index">§02</span> IT &amp; Business Systems
          </p>
          <h3>Behind-the-scenes technology that keeps you running.</h3>
        </div>

        <div className="services-list services-list--compact" role="list">
          {IT_SERVICES.map((service, i) => (
            <ServiceRow
              key={service.title}
              service={service}
              index={i}
              active={itActiveIndex === i}
              onActivate={() => setItActiveIndex(i)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
