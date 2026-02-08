'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FaStickyNote, FaBookmark, FaHome } from 'react-icons/fa'

export default function Header() {
  const pathname = usePathname()

  const isActive = (path) => pathname === path

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center gap-2 text-2xl font-bold text-primary-600 hover:text-primary-700 transition-colors"
          >
            <span>📝</span>
            <span className="hidden sm:inline">Notes & Bookmarks</span>
            <span className="sm:hidden">N&B</span>
          </Link>

          {/* Navigation Links */}
          <div className="flex gap-2 sm:gap-4">
            <Link
              href="/"
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                isActive('/')
                  ? 'bg-primary-600 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <FaHome />
              <span className="hidden sm:inline">Home</span>
            </Link>
            <Link
              href="/notes"
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                isActive('/notes')
                  ? 'bg-primary-600 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <FaStickyNote />
              <span className="hidden sm:inline">Notes</span>
            </Link>
            <Link
              href="/bookmarks"
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                isActive('/bookmarks')
                  ? 'bg-primary-600 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <FaBookmark />
              <span className="hidden sm:inline">Bookmarks</span>
            </Link>
          </div>
        </div>
      </nav>
    </header>
  )
}