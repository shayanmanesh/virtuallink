import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'

interface CategoryPageProps {
  params: Promise<{
    slug: string
  }>
}

const categories = {
  "vr-metaverse": {
    title: "Virtual Reality & Metaverse",
    description: "Explore VR technology, virtual worlds, and metaverse concepts",
    keywords: [
      { name: "Virtual Reality", slug: "virtual-reality" },
      { name: "Virtual Worlds", slug: "virtual-worlds" },
      { name: "Virtual Environment", slug: "virtual-environment" },
      { name: "Virtual Space", slug: "virtual-space" },
      { name: "Metaverse", slug: "metaverse" },
      { name: "Virtual Avatar", slug: "virtual-avatar" }
    ]
  },
  "communication": {
    title: "Virtual Communication",
    description: "Virtual meetings, conferences, and digital collaboration",
    keywords: [
      { name: "Virtual Meeting", slug: "virtual-meeting" },
      { name: "Virtual Conference", slug: "virtual-conference" },
      { name: "Virtual Event", slug: "virtual-event" },
      { name: "Virtual Classroom", slug: "virtual-classroom" },
      { name: "Virtual Collaboration", slug: "virtual-collaboration" }
    ]
  },
  "technology": {
    title: "Virtual Technology",
    description: "Virtual machines, servers, and infrastructure",
    keywords: [
      { name: "Virtual Machine", slug: "virtual-machine" },
      { name: "Virtual Server", slug: "virtual-server" },
      { name: "Virtual Desktop", slug: "virtual-desktop" },
      { name: "Virtual Network", slug: "virtual-network" },
      { name: "Virtual Storage", slug: "virtual-storage" }
    ]
  },
  "business": {
    title: "Virtual Business",
    description: "Virtual assistants, offices, and digital business solutions",
    keywords: [
      { name: "Virtual Assistant", slug: "virtual-assistant" },
      { name: "Virtual Office", slug: "virtual-office" },
      { name: "Virtual Team", slug: "virtual-team" },
      { name: "Virtual Currency", slug: "virtual-currency" },
      { name: "Virtual Workplace", slug: "virtual-workplace" }
    ]
  },
  "entertainment": {
    title: "Virtual Entertainment",
    description: "Virtual tours, museums, and entertainment experiences",
    keywords: [
      { name: "Virtual Tour", slug: "virtual-tour" },
      { name: "Virtual Museum", slug: "virtual-museum" },
      { name: "Virtual Concert", slug: "virtual-concert" },
      { name: "Virtual Game", slug: "virtual-game" },
      { name: "Virtual Experience", slug: "virtual-experience" }
    ]
  }
}

export function generateStaticParams() {
  return Object.keys(categories).map((slug) => ({
    slug: slug,
  }))
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params
  const category = categories[slug as keyof typeof categories]
  
  if (!category) {
    return {
      title: 'Category Not Found | Virtual.link',
      description: 'The requested category could not be found.',
    }
  }

  return {
    title: `${category.title} - Virtual Terms & Definitions | Virtual.link`,
    description: `${category.description}. Explore comprehensive definitions and explanations of virtual terms in ${category.title.toLowerCase()}.`,
    keywords: category.keywords.map(k => k.name).join(', '),
    openGraph: {
      title: `${category.title} | Virtual.link`,
      description: category.description,
      type: 'website',
      url: `https://virtual.link/category/${slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${category.title} | Virtual.link`,
      description: category.description,
    },
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params
  const category = categories[slug as keyof typeof categories]
  
  if (!category) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <nav className="mb-8">
        <Link href="/" className="text-blue-600 hover:text-blue-800">
          ← Back to Home
        </Link>
      </nav>

      <header className="mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {category.title}
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl">
          {category.description}
        </p>
      </header>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {category.keywords.map((keyword) => (
          <Link
            key={keyword.slug}
            href={`/topic/${keyword.slug}`}
            className="block p-6 bg-white border border-gray-200 rounded-lg shadow hover:shadow-lg transition-shadow"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              {keyword.name}
            </h2>
            <p className="text-gray-600">
              Learn about {keyword.name.toLowerCase()} - definition, applications, and more.
            </p>
          </Link>
        ))}
      </div>
    </div>
  )
}