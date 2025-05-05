// next.config.js
module.exports = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/home",
        permanent: true, // or false, depending on SEO needs
      },
    ];
  },
};
