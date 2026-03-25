/** @type {import('next').NextConfig} */
const configuredApiBase = (process.env.BACKEND_API_URL || process.env.NEXT_PUBLIC_API_URL || "").replace(/\/$/, "");
const proxiedApiBase = configuredApiBase
	? configuredApiBase.endsWith("/api")
		? configuredApiBase
		: `${configuredApiBase}/api`
	: "";
const devApiBase = process.env.DEV_API_URL?.replace(/\/$/, "") || "http://127.0.0.1:5000/api";
const allowedDevOrigins = [
	"http://localhost:3000",
	"http://127.0.0.1:3000",
	process.env.DEV_ALLOWED_ORIGIN,
].filter(Boolean);

const nextConfig = {
	allowedDevOrigins,
	async rewrites() {
		const destinationBase = proxiedApiBase || (process.env.NODE_ENV !== "production" ? devApiBase : "");
		if (!destinationBase) return [];

		return [
			{
				source: "/api/:path*",
				destination: `${destinationBase}/:path*`,
			},
		];
	},
};

export default nextConfig;
