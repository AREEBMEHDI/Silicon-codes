import useReveal from '../hooks/useReveal'
import './SectionTransition.css'

export default function SectionTransition() {
  const [ref, visible] = useReveal({ threshold: 0.01 })
  return <div ref={ref} className={`section-scanline ${visible ? 'is-visible' : ''}`} aria-hidden="true" />
}
