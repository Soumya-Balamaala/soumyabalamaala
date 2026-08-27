import { NextRequest, NextResponse } from 'next/server';
import { fetchResumes } from '@/lib/api/resumes';
import { resolveApiUrl } from '@/lib/utils';

const RESUME_FILENAME = 'SoumyaB_React_4.8YOE.pdf';

// The backend's file endpoint sends no CORS headers, so the browser can't
// fetch() it directly, and its cross-origin Content-Disposition filename
// can't be overridden reliably via the <a download> attribute either. This
// route fetches the file server-side (no CORS involved) and re-serves it
// same-origin with the exact filename we want.
export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const resumes = await fetchResumes();
  const resume = resumes.find((r) => String(r.id) === id);

  if (!resume?.resume) {
    return new NextResponse('Resume not found', { status: 404 });
  }

  const upstream = await fetch(resolveApiUrl(resume.resume));
  if (!upstream.ok || !upstream.body) {
    return new NextResponse('Failed to fetch resume', { status: 502 });
  }

  return new NextResponse(upstream.body, {
    headers: {
      'Content-Type': upstream.headers.get('Content-Type') ?? 'application/pdf',
      'Content-Disposition': `attachment; filename="${RESUME_FILENAME}"`,
      'Cache-Control': 'no-store',
    },
  });
}
