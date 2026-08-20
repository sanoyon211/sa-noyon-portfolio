/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'i.ibb.co', pathname: '/**' },
      { protocol: 'https', hostname: 'i.ibb.co.com', pathname: '/**' },
      { protocol: 'https', hostname: 'ibb.co', pathname: '/**' },
      { protocol: 'https', hostname: 'i.postimg.cc', pathname: '/**' },
      { protocol: 'https', hostname: 'postimg.cc', pathname: '/**' },
      { protocol: 'https', hostname: 'res.cloudinary.com', pathname: '/**' },
      { protocol: 'https', hostname: 'images.unsplash.com', pathname: '/**' },
      { protocol: 'https', hostname: 'raw.githubusercontent.com', pathname: '/**' },
      { protocol: 'https', hostname: 'github.com', pathname: '/**' },
      { protocol: 'https', hostname: 'lh3.googleusercontent.com', pathname: '/**' },
      { protocol: 'https', hostname: 'media.licdn.com', pathname: '/**' },
      { protocol: 'https', hostname: 'i.imgur.com', pathname: '/**' },
      { protocol: 'https', hostname: 'imgur.com', pathname: '/**' },
    ],
  },
}

export default nextConfig
