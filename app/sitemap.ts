import { MetadataRoute } from 'next'
import virtualKeywords from '@/data/virtual-keywords.json'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://virtual.link'
  const currentDate = new Date()
  
  // Base routes
  const routes = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
  ]

  // Category routes
  Object.keys(virtualKeywords.categories).forEach((categorySlug) => {
    routes.push({
      url: `${baseUrl}/category/${categorySlug}`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })
  })

  // Topic routes
  Object.values(virtualKeywords.categories).forEach((category) => {
    category.keywords.forEach((keyword) => {
      routes.push({
        url: `${baseUrl}/topic/${keyword.slug}`,
        lastModified: currentDate,
        changeFrequency: 'weekly' as const,
        priority: 0.6,
      })
    })
  })

  return routes
}