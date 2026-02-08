'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { FaStickyNote, FaBookmark, FaHome, FaSignInAlt, FaSignOutAlt, FaUser, FaUserPlus } from 'react-icons/fa'
import toast from 'react-hot-toast'

export default function Header() {
    const pathname = usePathname()
    const router = useRouter()
    const [user, setUser] = useState(null)
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
        // Check if user is logged in
        const userData = localStorage.getItem('user')
        const token = localStorage.getItem('token')

        // DEBUG LOGS
        console.log('🔍 Header Debug:')
        console.log('User Data:', userData)
        console.log('Token:', token)

        if (userData) {
            try {
                const parsedUser = JSON.parse(userData)
                console.log('✅ Parsed User:', parsedUser)
                setUser(parsedUser)
            } catch (error) {
                console.error('❌ Error parsing user data:', error)
                localStorage.removeItem('user')
                localStorage.removeItem('token')
            }
        } else {
            console.log('❌ No user data found')
        }
    }, [])

    const isActive = (path) => pathname === path

    const handleLogout = () => {
        console.log('🚪 Logging out...')
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        setUser(null)
        toast.success('Logged out successfully')
        router.push('/login')
    }

    // Prevent hydration mismatch
    if (!mounted) {
        return (
            <header className="bg-white shadow-md sticky top-0 z-50">
                <nav className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <Link
                            href="/"
                            className="flex items-center gap-2 text-2xl font-bold text-primary-600 hover:text-primary-700 transition-colors"
                        >
                            <span>📝</span>
                            <span className="hidden sm:inline">Notes & Bookmarks</span>
                            <span className="sm:hidden">N&B</span>
                        </Link>
                        <div className="h-10 w-40 bg-gray-100 animate-pulse rounded"></div>
                    </div>
                </nav>
            </header>
        )
    }

    // DEBUG: Log render state
    console.log('🎨 Rendering Header - User state:', user)

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
                    <div className="flex gap-2 sm:gap-4 items-center">
                        <Link
                            href="/"
                            className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg transition-colors ${isActive('/')
                                    ? 'bg-primary-600 text-white'
                                    : 'text-gray-700 hover:bg-gray-100'
                                }`}
                        >
                            <FaHome />
                            <span className="hidden sm:inline">Home</span>
                        </Link>

                        {/* DEBUG: Show what's being rendered */}
                        {console.log('🔍 User exists?', !!user)}

                        {user ? (
                            <>
                                {console.log('✅ Rendering logged-in state')}

                                {/* Notes Link */}
                                <Link
                                    href="/notes"
                                    className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg transition-colors ${isActive('/notes')
                                            ? 'bg-primary-600 text-white'
                                            : 'text-gray-700 hover:bg-gray-100'
                                        }`}
                                >
                                    <FaStickyNote />
                                    <span className="hidden sm:inline">Notes</span>
                                </Link>

                                {/* Bookmarks Link */}
                                <Link
                                    href="/bookmarks"
                                    className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg transition-colors ${isActive('/bookmarks')
                                            ? 'bg-primary-600 text-white'
                                            : 'text-gray-700 hover:bg-gray-100'
                                        }`}
                                >
                                    <FaBookmark />
                                    <span className="hidden sm:inline">Bookmarks</span>
                                </Link>

                                {/* User Info (Desktop only) */}
                                <div className="hidden md:flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg">
                                    <FaUser className="text-primary-600" />
                                    <span className="font-medium text-gray-700">{user.name}</span>
                                </div>

                                {/* Logout Button */}
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
                                >
                                    <FaSignOutAlt />
                                    <span className="hidden sm:inline">Logout</span>
                                </button>
                            </>
                        ) : (
                            <>
                                {console.log('❌ Rendering logged-out state')}

                                {/* Login Button */}
                                <Link
                                    href="/login"
                                    className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
                                >
                                    <FaSignInAlt />
                                    <span className="hidden sm:inline">Login</span>
                                </Link>

                                {/* Register Button */}
                                <Link
                                    href="/register"
                                    className="flex items-center gap-2 px-3 sm:px-4 py-2 border-2 border-primary-600 text-primary-600 rounded-lg hover:bg-primary-50 transition-colors font-medium"
                                >
                                    <FaUserPlus />
                                    <span className="hidden sm:inline">Register</span>
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </nav>
        </header>
    )
}
