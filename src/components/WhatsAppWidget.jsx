import { useEffect, useState } from 'react'
import './WhatsAppWidget.css'

const WHATSAPP_NUMBER = '442039307976'
const PREFILLED_MESSAGE = "Hi! I'd like to know more about your services."
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(PREFILLED_MESSAGE)}`

export default function WhatsAppWidget() {
  const [showTooltip, setShowTooltip] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setShowTooltip(true), 2600)
    return () => clearTimeout(timer)
  }, [])

  const closeTooltip = () => {
    setShowTooltip(false)
    setDismissed(true)
  }

  return (
    <div className="whatsapp-widget">
      {showTooltip && !dismissed && (
        <div className="whatsapp-tooltip">
          <a href={WHATSAPP_URL} target="_blank" rel="noreferrer">
            Chat with us
          </a>
          <button type="button" className="whatsapp-tooltip-close" aria-label="Dismiss" onClick={closeTooltip}>
            <svg viewBox="0 0 16 16" fill="none">
              <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      )}

      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noreferrer"
        className="whatsapp-btn"
        aria-label="Chat with Silicon Codes on WhatsApp"
        onMouseEnter={() => setShowTooltip(true)}
      >
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.77.47 3.45 1.28 4.92L2 22l5.29-1.38a9.9 9.9 0 0 0 4.75 1.21h.01c5.46 0 9.9-4.45 9.9-9.92 0-2.65-1.03-5.14-2.9-7.01A9.86 9.86 0 0 0 12.04 2Zm5.8 14.19c-.25.69-1.43 1.32-1.98 1.4-.51.08-1.14.11-1.85-.12-.42-.13-.97-.32-1.67-.62-2.94-1.27-4.86-4.24-5.01-4.44-.15-.19-1.2-1.6-1.2-3.05s.76-2.17 1.03-2.47c.27-.29.59-.36.79-.36l.57.01c.18 0 .43-.07.67.51.25.6.84 2.06.91 2.21.07.15.12.32.02.51-.09.2-.14.31-.27.48-.14.17-.29.38-.41.51-.14.15-.28.3-.12.58.16.28.71 1.16 1.52 1.88 1.04.93 1.93 1.22 2.2 1.36.28.14.44.12.61-.07.16-.19.71-.83.9-1.11.19-.28.38-.24.64-.14.26.1 1.66.78 1.94.93.29.14.48.22.55.34.07.12.07.7-.18 1.4Z" />
        </svg>
      </a>
    </div>
  )
}
