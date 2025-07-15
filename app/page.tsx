import Link from 'next/link'
import AdLayout from '@/components/AdLayout'

export default function Home() {
  const categories = [
    {
      title: "Virtual Reality & Metaverse",
      description: "Explore VR technology, virtual worlds, and metaverse concepts",
      slug: "vr-metaverse",
      keywords: ["virtual reality", "virtual worlds", "virtual environment", "virtual space"]
    },
    {
      title: "Virtual Communication",
      description: "Virtual meetings, conferences, and digital collaboration",
      slug: "communication",
      keywords: ["virtual meeting", "virtual conference", "virtual event", "virtual classroom"]
    },
    {
      title: "Virtual Technology",
      description: "Virtual machines, servers, and infrastructure",
      slug: "technology",
      keywords: ["virtual machine", "virtual server", "virtual desktop", "virtual network"]
    },
    {
      title: "Virtual Business",
      description: "Virtual assistants, offices, and digital business solutions",
      slug: "business",
      keywords: ["virtual assistant", "virtual office", "virtual team", "virtual currency"]
    },
    {
      title: "Virtual Entertainment",
      description: "Virtual tours, museums, and entertainment experiences",
      slug: "entertainment",
      keywords: ["virtual tour", "virtual museum", "virtual concert", "virtual game"]
    }
  ]

  return (
    <AdLayout showSidebar={false}>
      <div className="py-8">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Virtual.link
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Your comprehensive encyclopedia for all things virtual - from virtual reality to virtual assistants
        </p>
      </header>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {categories.map((category) => (
          <Link
            key={category.slug}
            href={`/category/${category.slug}`}
            className="block p-6 bg-white border border-gray-200 rounded-lg shadow hover:shadow-lg transition-shadow"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              {category.title}
            </h2>
            <p className="text-gray-600 mb-4">
              {category.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {category.keywords.slice(0, 3).map((keyword) => (
                <span
                  key={keyword}
                  className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>

      <section className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Popular Virtual Topics
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            "Virtual Reality",
            "Virtual Assistant",
            "Virtual Machine",
            "Virtual Meeting",
            "Virtual Office",
            "Virtual Tour",
            "Virtual Currency",
            "Virtual Environment"
          ].map((topic) => (
            <Link
              key={topic}
              href={`/topic/${topic.toLowerCase().replace(/\s+/g, '-')}`}
              className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <span className="text-gray-800 font-medium">{topic}</span>
            </Link>
          ))}
        </div>
      </section>
      </div>
    </AdLayout>
  )
}