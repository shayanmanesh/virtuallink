import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'

interface TopicPageProps {
  params: Promise<{
    keyword: string
  }>
}

// This would typically come from a database or CMS
const topics = {
  "virtual-reality": {
    title: "Virtual Reality",
    category: "VR & Metaverse",
    definition: "Virtual reality (VR) is a computer-generated simulation of a three-dimensional environment that can be interacted with using special electronic equipment, such as a headset with a screen or gloves fitted with sensors.",
    context: "Virtual reality has revolutionized how we experience digital content, from gaming and entertainment to education and training. It represents a fundamental shift in human-computer interaction.",
    howItWorks: [
      "VR headsets display stereoscopic images to create depth perception",
      "Motion sensors track head and body movements in real-time",
      "Specialized controllers allow interaction with virtual objects",
      "Audio systems provide 3D spatial sound for immersion"
    ],
    applications: [
      "Gaming and entertainment",
      "Medical training and surgery simulation",
      "Architecture and design visualization",
      "Education and virtual field trips",
      "Therapy and rehabilitation"
    ],
    relatedTopics: [
      { name: "Virtual Worlds", slug: "virtual-worlds" },
      { name: "Virtual Environment", slug: "virtual-environment" },
      { name: "Metaverse", slug: "metaverse" }
    ]
  },
  "virtual-assistant": {
    title: "Virtual Assistant",
    category: "Business",
    definition: "A virtual assistant is an AI-powered software application that performs tasks or services for individuals or organizations through voice commands or text input.",
    context: "Virtual assistants have become integral to modern life, helping users manage schedules, control smart devices, and access information quickly and efficiently.",
    howItWorks: [
      "Natural language processing interprets user commands",
      "Machine learning algorithms improve responses over time",
      "Cloud-based processing handles complex requests",
      "Integration with various services enables task completion"
    ],
    applications: [
      "Smart home control and automation",
      "Calendar and reminder management",
      "Information retrieval and research",
      "Customer service and support",
      "Business process automation"
    ],
    relatedTopics: [
      { name: "Virtual Office", slug: "virtual-office" },
      { name: "Virtual Team", slug: "virtual-team" },
      { name: "Virtual Workplace", slug: "virtual-workplace" }
    ]
  },
  "virtual-machine": {
    title: "Virtual Machine",
    category: "Technology",
    definition: "A virtual machine (VM) is a software emulation of a computer system that runs on top of a physical computer, allowing multiple operating systems to run simultaneously on the same hardware.",
    context: "Virtual machines have transformed IT infrastructure by enabling efficient resource utilization, simplified deployment, and enhanced security through isolation.",
    howItWorks: [
      "Hypervisor software manages hardware resources",
      "Guest operating systems run independently in isolated environments",
      "Hardware resources are allocated dynamically",
      "Virtual networking connects VMs and external networks"
    ],
    applications: [
      "Server consolidation and resource optimization",
      "Software development and testing",
      "Legacy application support",
      "Cloud computing and infrastructure",
      "Security isolation and sandboxing"
    ],
    relatedTopics: [
      { name: "Virtual Server", slug: "virtual-server" },
      { name: "Virtual Desktop", slug: "virtual-desktop" },
      { name: "Virtual Network", slug: "virtual-network" }
    ]
  }
}

export function generateStaticParams() {
  return Object.keys(topics).map((keyword) => ({
    keyword: keyword,
  }))
}

export async function generateMetadata({ params }: TopicPageProps): Promise<Metadata> {
  const { keyword } = await params
  const topic = topics[keyword as keyof typeof topics]
  
  if (!topic) {
    return {
      title: 'Topic Not Found | Virtual.link',
      description: 'The requested topic could not be found.',
    }
  }

  return {
    title: `${topic.title} - Complete Guide & Definition | Virtual.link`,
    description: `${topic.definition.slice(0, 150)}... Learn everything about ${topic.title} including applications, how it works, and related topics.`,
    keywords: [topic.title, `${topic.title} definition`, `what is ${topic.title}`, `${topic.title} explained`, ...topic.relatedTopics.map(t => t.name)].join(', '),
    openGraph: {
      title: `${topic.title} - Complete Guide | Virtual.link`,
      description: topic.definition,
      type: 'article',
      url: `https://virtual.link/topic/${keyword}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${topic.title} - Complete Guide | Virtual.link`,
      description: topic.definition,
    },
  }
}

export default async function TopicPage({ params }: TopicPageProps) {
  const { keyword } = await params
  const topic = topics[keyword as keyof typeof topics]
  
  if (!topic) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <nav className="mb-8">
        <Link href="/" className="text-blue-600 hover:text-blue-800">
          ← Back to Home
        </Link>
      </nav>

      <article className="prose prose-lg max-w-none">
        <header className="mb-12">
          <div className="mb-4">
            <span className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
              {topic.category}
            </span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {topic.title}
          </h1>
        </header>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            What is {topic.title}?
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            {topic.definition}
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Why {topic.title} Matters
          </h2>
          <p className="text-gray-700 leading-relaxed">
            {topic.context}
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            How {topic.title} Works
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            {topic.howItWorks.map((step, index) => (
              <li key={index} className="text-gray-700">
                {step}
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Applications
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            {topic.applications.map((application, index) => (
              <li key={index} className="text-gray-700">
                {application}
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Related Topics
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {topic.relatedTopics.map((relatedTopic) => (
              <Link
                key={relatedTopic.slug}
                href={`/topic/${relatedTopic.slug}`}
                className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <span className="text-gray-800 font-medium">{relatedTopic.name}</span>
              </Link>
            ))}
          </div>
        </section>
      </article>
    </div>
  )
}