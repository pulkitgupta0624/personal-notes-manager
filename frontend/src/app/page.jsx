import Link from 'next/link'
import { FaStickyNote, FaBookmark, FaSearch, FaTags, FaStar, FaMobile } from 'react-icons/fa'

export default function Home() {
  return (
    <div className="min-h-[calc(100vh-200px)]">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            📝 Notes & Bookmarks Manager
          </h1>
          <p className="text-xl mb-8 text-primary-100 max-w-2xl mx-auto">
            Your personal workspace to organize notes, save bookmarks, and keep everything you need in one place.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link 
              href="/notes" 
              className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-primary-50 transition-colors"
            >
              Get Started with Notes
            </Link>
            <Link 
              href="/bookmarks" 
              className="bg-primary-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-800 transition-colors border-2 border-white"
            >
              Explore Bookmarks
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Powerful Features
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<FaStickyNote className="text-4xl text-primary-600" />}
              title="Smart Notes"
              description="Create, edit, and organize your notes with rich text support and easy categorization."
            />
            <FeatureCard
              icon={<FaBookmark className="text-4xl text-primary-600" />}
              title="Bookmark Manager"
              description="Save your favorite websites with automatic title fetching and detailed descriptions."
            />
            <FeatureCard
              icon={<FaSearch className="text-4xl text-primary-600" />}
              title="Quick Search"
              description="Find what you need instantly with powerful search across titles, content, and descriptions."
            />
            <FeatureCard
              icon={<FaTags className="text-4xl text-primary-600" />}
              title="Tag Organization"
              description="Organize everything with custom tags and filter items by multiple tags at once."
            />
            <FeatureCard
              icon={<FaStar className="text-4xl text-primary-600" />}
              title="Favorites"
              description="Mark important notes and bookmarks as favorites for quick access."
            />
            <FeatureCard
              icon={<FaMobile className="text-4xl text-primary-600" />}
              title="Responsive Design"
              description="Access your notes and bookmarks seamlessly on desktop, tablet, or mobile."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">
            Ready to Get Organized?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Start managing your notes and bookmarks today. It's simple, fast, and completely free.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/notes" className="btn-primary text-lg px-8 py-3">
              Create Your First Note
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2 text-gray-800">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}