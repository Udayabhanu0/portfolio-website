import type { MetadataRoute } from 'next'

// Single-page site: section anchors (#about, …) are not separate indexable URLs,
// so only the canonical root is listed.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://www.udayabhanuaich.org',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
  ]
}
