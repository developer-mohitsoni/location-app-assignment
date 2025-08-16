import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: { extend: {} },
  plugins: [],
  output: "standalone"
};

export default nextConfig;
