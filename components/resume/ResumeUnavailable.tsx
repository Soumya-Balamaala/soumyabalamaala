import Link from 'next/link';

export function ResumeUnavailable() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="text-center max-w-md">
        <h1 className="text-2xl font-bold text-gray-900">Resume not available</h1>
        <p className="mt-2 text-gray-600">This resume does not exist or is temporarily unavailable. Please try again later.</p>
        <Link href="/" className="inline-block mt-4 rounded-md bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800">
          Back to home
        </Link>
      </div>
    </main>
  );
}
