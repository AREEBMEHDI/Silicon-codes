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
    <footer className="footer" aria-label="Footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <img src={logo} alt="Silicon Codes Ltd." className="footer-logo" />
          <p>Turning ideas into powerful digital products.</p>
          <div className="footer-socials">
            <a className="footer-social-link" href="https://www.facebook.com/SiliconCodes" target="_blank" rel="noreferrer" aria-label="Silicon Codes on Facebook">
              <svg viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M14 7h-2a2 2 0 0 0-2 2v2H8v3h2v6h3v-6h2.2l.8-3H13V9a1 1 0 0 1 1-1h2V5h-2a4 4 0 0 0-4 4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Facebook
            </a>
            <a
              className="footer-social-link"
              href="https://wa.me/442039307976"
              target="_blank"
              rel="noreferrer"
              aria-label="Chat with Silicon Codes on WhatsApp"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" stroke="none">
                <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.77.47 3.45 1.28 4.92L2 22l5.29-1.38a9.9 9.9 0 0 0 4.75 1.21h.01c5.46 0 9.9-4.45 9.9-9.92 0-2.65-1.03-5.14-2.9-7.01A9.86 9.86 0 0 0 12.04 2Zm5.8 14.19c-.25.69-1.43 1.32-1.98 1.4-.51.08-1.14.11-1.85-.12-.42-.13-.97-.32-1.67-.62-2.94-1.27-4.86-4.24-5.01-4.44-.15-.19-1.2-1.6-1.2-3.05s.76-2.17 1.03-2.47c.27-.29.59-.36.79-.36l.57.01c.18 0 .43-.07.67.51.25.6.84 2.06.91 2.21.07.15.12.32.02.51-.09.2-.14.31-.27.48-.14.17-.29.38-.41.51-.14.15-.28.3-.12.58.16.28.71 1.16 1.52 1.88 1.04.93 1.93 1.22 2.2 1.36.28.14.44.12.61-.07.16-.19.71-.83.9-1.11.19-.28.38-.24.64-.14.26.1 1.66.78 1.94.93.29.14.48.22.55.34.07.12.07.7-.18 1.4Z" />
              </svg>
              WhatsApp
            </a>
          </div>
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
