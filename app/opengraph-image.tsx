import { ImageResponse } from 'next/og';
import fs from 'fs';
import path from 'path';

export const runtime = 'nodejs';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'Soumya Balamaala — Frontend Engineer';

export default async function OpengraphImage() {
  const imageData = fs.readFileSync(path.join(process.cwd(), 'public', 'Soumya.png'));
  const photoSrc = `data:image/png;base64,${imageData.toString('base64')}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'linear-gradient(135deg, #2A3969 0%, #1e2a52 100%)',
          padding: '70px 90px',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', maxWidth: 640 }}>
          <div
            style={{
              display: 'flex',
              color: '#EFC873',
              fontSize: 22,
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: 3,
              marginBottom: 24,
            }}
          >
            Hyderabad, India
          </div>
          <div style={{ display: 'flex', color: '#ffffff', fontSize: 68, fontWeight: 800, lineHeight: 1.1 }}>
            Soumya Balamaala
          </div>
          <div style={{ display: 'flex', color: '#6A9F8A', fontSize: 34, fontWeight: 700, marginTop: 18 }}>
            Frontend Engineer
          </div>
          <div style={{ display: 'flex', color: '#c9d1e0', fontSize: 24, marginTop: 24, lineHeight: 1.5 }}>
            4.9 years building scalable UI in React.js, Next.js &amp; TypeScript
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            width: 380,
            height: 380,
            borderRadius: '50%',
            overflow: 'hidden',
            border: '8px solid #EFC873',
            flexShrink: 0,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={photoSrc}
            width={380}
            height={380}
            style={{ objectFit: 'cover', width: '100%', height: '100%', borderRadius: '50%' }}
          />
        </div>
      </div>
    ),
    { ...size }
  );
}
