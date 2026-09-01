/** @type {import('next').NextConfig} */
const nextConfig = {

  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
  experimental: {
    // Use the OS certificate store when Turbopack fetches next/font from Google.
    // Without this the local Windows build fails with "Failed to fetch Inter from
    // Google Fonts" because Turbopack's bundled CA set rejects the intercepted TLS chain.
    turbopackUseSystemTlsCerts: true,
  },
}

export default nextConfig
