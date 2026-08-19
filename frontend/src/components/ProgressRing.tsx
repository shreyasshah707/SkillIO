interface Props {
  value: number
  max?: number
  size?: number
  stroke?: number
  color?: string
  label?: string
  sublabel?: string
  dark?: boolean
}

export default function ProgressRing({
  value,
  max = 100,
  size = 80,
  stroke = 7,
  color = '#5C6BC0',
  label,
  sublabel,
  dark,
}: Props) {
  const r = (size - stroke) / 2
  const circ = 2 * Math.PI * r
  const pct = Math.min(value / max, 1)
  const dash = circ * pct

  return (
    <div style={{ position: 'relative', width: size, height: size, flexShrink: 0 }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={dark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.07)'}
          strokeWidth={stroke}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeDasharray={`${dash} ${circ - dash}`}
          strokeLinecap="round"
          style={{ transition: 'stroke-dasharray 0.6s cubic-bezier(0.4,0,0.2,1)' }}
        />
      </svg>
      {label && (
        <div style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 1,
        }}>
          <span className="mono" style={{ fontSize: size > 70 ? 16 : 13, fontWeight: 600, color: dark ? '#F3F3F3' : '#181818', lineHeight: 1 }}>{label}</span>
          {sublabel && <span style={{ fontSize: 10, color: dark ? '#888' : '#aaa', lineHeight: 1 }}>{sublabel}</span>}
        </div>
      )}
    </div>
  )
}
