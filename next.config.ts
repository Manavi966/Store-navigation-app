import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    "http://192.168.0.103:3000",
    "http://10.71.184.99:3000",
    "http://localhost:3000",
    "https://loca.lt",
    "https://*.loca.lt",
  ],
};

export default nextConfig;
