module.exports = {
    async rewrites() {
      return [
        {
            source: '/backend/:path*',
            destination: 'https://crisistool.wordpress-api-nielsvandervlist.eu/:path*'
        },
      ]
    },
  }