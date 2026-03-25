/** @type {import('next').NextConfig} */
const configuredApiBase = (process.env.BACKEND_API_URL || process.env.NEXT_PUBLIC_API_URL || "").replace(/\/$/, "");
const proxiedApiBase = configuredApiBase
	? configuredApiBase.endsWith("/api")
		? configuredApiBase
		: `${configuredApiBase}/api`
	: "";

const nextConfig = {
	async rewrites() {
		if (!proxiedApiBase) return [];

		return [
			{
				source: "/api/:path*",
				destination: `${proxiedApiBase}/:path*`,
			},
		];
	},
};

export default nextConfig;
