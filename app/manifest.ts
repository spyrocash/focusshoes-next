import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Focus Shoes Catalog",
    short_name: "Focus Shoes",
    start_url: "/",
    display: "standalone",
    background_color: "#0c0c0d",
    theme_color: "#0c0c0d",
    description:
      "รองเท้าสตรีหนังแท้ ใส่สบาย จากโรงงาน Focus Shoes ทั้งปลีกและส่ง",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "48x48",
        type: "image/x-icon",
      },
    ],
  };
}
