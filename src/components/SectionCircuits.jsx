import './SectionCircuits.css'

const VARIANTS = {
  a: {
    paths: 'M0 80h180l30 30h160l30-30h200 M0 200h140l25-25h220l25 25h260 M0 320h220l30-30h180l30 30h260',
    nodes: [[180,80],[370,80],[600,80],[165,200],[410,200],[695,200],[220,320],[430,320],[720,320]],
  },
  b: {
    paths: 'M0 60h220l25-25h240l25 25h260 M0 180h160l30 30h380l30-30h250 M0 300h300l25 25h200l25-25h275',
    nodes: [[220,60],[485,60],[770,60],[160,180],[570,180],[820,180],[300,300],[525,300],[750,300]],
  },
  c: {
    paths: 'M0 100h260l20-20h300l20 20h220 M0 220h180l25 25h420l25-25h175 M0 340h240l30-30h260l30 30h270',
    nodes: [[260,100],[580,100],[800,100],[180,220],[625,220],[800,220],[240,340],[560,340],[830,340]],
  },
}

export default function SectionCircuits({ variant = 'a', opacity }) {
  const { paths, nodes } = VARIANTS[variant] || VARIANTS.a
  return (
    <div className="section-circuits" aria-hidden="true" style={opacity ? { opacity } : undefined}>
      <svg viewBox="0 0 800 400" fill="none" preserveAspectRatio="xMidYMid slice">
        <path d={paths} stroke="currentColor" strokeOpacity="0.14" strokeWidth="1.4" />
        {nodes.map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r="3.5" className="section-node" style={{ animationDelay: `${i * 0.3}s` }} />
        ))}
      </svg>
    </div>
  )
}
