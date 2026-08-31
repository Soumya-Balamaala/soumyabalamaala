import type { Metadata } from 'next';

const SITE_NAME = 'Soumya Balamaala';

export function buildMetadata({
  title,
  description,
  path,
  image,
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
}): Metadata {
  // Only declare width/height for our own generated OG image, whose exact
  // 1200x630 size is known — a custom image (e.g. a job posting's company
  // logo) has unknown real dimensions, and lying about them is what made
  // sharing platforms crop the profile photo wrong in the first place.
  const ogImage = image ? { url: image, alt: SITE_NAME } : { url: '/opengraph-image', width: 1200, height: 630, alt: SITE_NAME };

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: path,
      siteName: SITE_NAME,
      images: [ogImage],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage.url],
    },
  };
}
