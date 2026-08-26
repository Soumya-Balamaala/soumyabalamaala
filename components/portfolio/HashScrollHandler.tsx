'use client';

import { useEffect } from 'react';

// Next.js's App Router can keep this page's component instance alive in its
// client-side cache across a back/forward navigation, so a mount-only effect
// won't always re-fire when the user navigates back here with a URL hash
// (e.g. from a subpage's "Go Back" returning to /#contact). Listening for
// popstate directly catches that case regardless of whether React remounts.
export function HashScrollHandler() {
  useEffect(() => {
    const scrollToHash = () => {
      const hash = window.location.hash.slice(1);
      if (!hash) return;
      document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    scrollToHash();
    window.addEventListener('popstate', scrollToHash);
    return () => window.removeEventListener('popstate', scrollToHash);
  }, []);

  return null;
}
