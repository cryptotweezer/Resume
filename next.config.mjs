/** @type {import('next').NextConfig} */
const nextConfig = {

  images: {
    formats: ["image/avif", "image/webp"],
  },
  experimental: {
    // Use the OS certificate store when Turbopack fetches next/font from Google.
    // Without this the local Windows build fails with "Failed to fetch Inter from
    // Google Fonts" because Turbopack's bundled CA set rejects the intercepted TLS chain.
    turbopackUseSystemTlsCerts: true,
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Content-Security-Policy", value: "frame-ancestors 'none'" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ]
  },
}

export default nextConfig
