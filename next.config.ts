import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    apiKey: process.env.apiKey,
    authDomain: process.env.authDomain,
    projectId: process.env.projectId,
    storageBucket: process.env.storageBucket,
    messagingSenderId: process.env.messgingSederId,
    appId: process.env.appId,
    measurementId: process.env.measurementId,
  },
  allowedDevOrigins: ["local-origin.dev", "*.local-origin.dev"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "tailwindcss.com",
        pathname: "/**", // allow all image paths from tailwindcss.com
      },
    ],
  },
};

export default nextConfig;
