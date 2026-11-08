/** @type {import('next').NextConfig} */
const API = 'https://console.devmarvibe.com/api/public/resume';

const nextConfig = {
  images: { unoptimized: true },
  async rewrites() {
    return [
      { source: '/resume/download', destination: `${API}/download?accode=SOU` },
      { source: '/resume-:segment/cover-letter/download', destination: `${API}/:segment/cover-letter/download?accode=SOU` },
      { source: '/resume-:segment/download', destination: `${API}/:segment/download?accode=SOU` },
      { source: '/resume-:segment', destination: '/resume/view/:segment' },
    ];
  },
};

module.exports = nextConfig;
