/** @type {import('next').NextConfig} */
const nextConfig = {
    transpilePackages: ['lucide-react'],
    images: {
        remotePatterns: [
        {
            protocol: 'https',
            hostname: 'nextruudawsbucket.s3.*',
        },
        ],
    },
}

module.exports = nextConfig
