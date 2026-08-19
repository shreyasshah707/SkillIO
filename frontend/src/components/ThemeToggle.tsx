import { Sun, Moon } from 'lucide-react'

interface Props {
  dark: boolean
  toggle: () => void
}

export default function ThemeToggle({ dark, toggle }: Props) {
  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      style={{
        width: 38,
        height: 38,
        borderRadius: 12,
        border: dark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.08)',
        background: dark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        transition: 'all 0.22s',
        color: dark ? '#F3F3F3' : '#181818',
        flexShrink: 0,
      }}
    >
      <span style={{ transition: 'transform 0.35s', display: 'block', transform: dark ? 'rotate(180deg)' : 'rotate(0deg)' }}>
        {dark ? <Moon size={16} /> : <Sun size={16} />}
      </span>
    </button>
  )
}
