import type { NextConfig } from "next";
import blogRedirects from "./content/blog-redirects.json";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      ...Object.entries(blogRedirects).flatMap(([oldSlug, slug]) =>
        ["/blog", "/blogs"].map((prefix) => ({
          source: `${prefix}/${oldSlug}`,
          destination: `/blogs/${slug}`,
          permanent: true,
        })),
      ),
      { source: "/blog/:path*", destination: "/blogs/:path*", permanent: true },
    ];
  },
};

export default nextConfig;
