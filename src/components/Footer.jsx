import logo from '../assets/Logo.png'
import './Footer.css'

const NAV = [
  { href: '#services', label: 'Services' },
  { href: '#portfolio', label: 'Portfolio' },
  { href: '#about', label: 'About' },
  { href: '#contact', label: 'Contact' },
]

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

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="footer section-dark" aria-label="Footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <img src={logo} alt="Silicon Codes Ltd." className="footer-logo" />
          <p>Turning ideas into powerful digital products.</p>
          <a className="footer-social-link" href="https://www.facebook.com/SiliconCodes" target="_blank" rel="noreferrer" aria-label="Silicon Codes on Facebook">
            <svg viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M14 7h-2a2 2 0 0 0-2 2v2H8v3h2v6h3v-6h2.2l.8-3H13V9a1 1 0 0 1 1-1h2V5h-2a4 4 0 0 0-4 4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Facebook
          </a>
        </div>

        <nav className="footer-nav" aria-label="Footer navigation">
          <span className="footer-heading">Navigation</span>
          <ul>
            {NAV.map((link) => (
              <li key={link.href}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="footer-offices">
          <span className="footer-heading">Get In Touch</span>
          {OFFICES.map((office) => (
            <div className="footer-office" key={office.label}>
              <p className="footer-office-label">{office.label}</p>
              <p>{office.address}</p>
              <a href={`mailto:${office.email}`}>{office.email}</a>
              {office.phones.map((phone) => (
                <a key={phone} href={`tel:${phone.replace(/\s+/g, '')}`}>
                  {phone}
                </a>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="container footer-bottom">
        <hr className="footer-hairline" />
        <p>
          All Rights Reserved | Silicon Codes LTD. | Reg in UK 14175504 | &copy; Copyright {year}
        </p>
      </div>
    </footer>
  )
}
