import { MetadataRoute } from "next";

export default async function robots(): Promise<MetadataRoute.Robots> {
    const baseUrl = 'https://sonikai.vercel.app/';
    
    return {
        rules: {
            userAgent: '*',
            allow: ['/'],
            disallow: [],
        },
        sitemap: `${baseUrl}/sitemap.xml`,
    };
}
