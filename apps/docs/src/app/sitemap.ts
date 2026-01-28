import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://next-image-placeholder-docs.vercel.app'

    const routes = [
        '',
        '/installation',
        '/usage',
        '/api/get-placeholder',
        '/api/get-blur-data-url',
    ]

    return routes.map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: route === '' ? 'weekly' : 'monthly',
        priority: route === '' ? 1 : 0.8,
    }))
}
