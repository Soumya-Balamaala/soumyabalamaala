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
          justifyContent: 'center',
          background: '#2A3969',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={photoSrc}
          width={size.width}
          height={size.height}
          style={{ objectFit: 'cover', objectPosition: '50% 12%', width: '100%', height: '100%' }}
        />
      </div>
    ),
    { ...size }
  );
}
