/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		// Netlify deploys can fail to serve optimized Next.js image routes.
		// Using unoptimized keeps image delivery stable across environments.
		unoptimized: true,
	},
};

module.exports = nextConfig
