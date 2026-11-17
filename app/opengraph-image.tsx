import { ImageResponse } from 'next/og'

export const alt = 'Udayabhanu Aich — Software Engineer & AI Engineer'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: 80,
          background: 'linear-gradient(135deg, #090a0f 0%, #121a2b 100%)',
          color: '#fff',
        }}
      >
        <div style={{ fontSize: 28, color: '#22d3ee', letterSpacing: 4 }}>PORTFOLIO</div>
        <div style={{ fontSize: 86, fontWeight: 800, marginTop: 20 }}>Udayabhanu Aich</div>
        <div style={{ fontSize: 40, color: '#cbd5e1', marginTop: 16 }}>Software Engineer & AI Engineer</div>
        <div style={{ fontSize: 28, color: '#94a3b8', marginTop: 40 }}>
          Python · FastAPI · LLMs · Real-time AI systems
        </div>
      </div>
    ),
    size,
  )
}
