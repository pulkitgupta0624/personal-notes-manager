'use client'

import { useState, useEffect } from 'react'
import BookmarkList from '@/components/bookmarks/BookmarkList'
import BookmarkForm from '@/components/bookmarks/BookmarkForm'
import SearchBar from '@/components/common/SearchBar'
import TagFilter from '@/components/common/TagFilter'
import Modal from '@/components/common/Modal'
import { getBookmarks, deleteBookmark } from '@/lib/api'
import toast from 'react-hot-toast'
import { FaPlus } from 'react-icons/fa'

export default function BookmarksPage() {
  const [bookmarks, setBookmarks] = useState([])
  const [filteredBookmarks, setFilteredBookmarks] = useState([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingBookmark, setEditingBookmark] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTags, setSelectedTags] = useState([])

  // Fetch bookmarks
  const fetchBookmarks = async () => {
    try {
      setLoading(true)
      const data = await getBookmarks()
      setBookmarks(data)
      setFilteredBookmarks(data)
    } catch (error) {
      toast.error('Failed to fetch bookmarks')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBookmarks()
  }, [])

  // Filter bookmarks based on search and tags
  useEffect(() => {
    let filtered = bookmarks

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(bookmark =>
        bookmark.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bookmark.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bookmark.url.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Tag filter
    if (selectedTags.length > 0) {
      filtered = filtered.filter(bookmark =>
        selectedTags.every(tag => bookmark.tags.includes(tag))
      )
    }

    setFilteredBookmarks(filtered)
  }, [searchTerm, selectedTags, bookmarks])

  // Get all unique tags
  const allTags = [...new Set(bookmarks.flatMap(bookmark => bookmark.tags))]

  const handleCreateBookmark = () => {
    setEditingBookmark(null)
    setIsModalOpen(true)
  }

  const handleEditBookmark = (bookmark) => {
    setEditingBookmark(bookmark)
    setIsModalOpen(true)
  }

  const handleDeleteBookmark = async (id) => {
    if (!confirm('Are you sure you want to delete this bookmark?')) return

    try {
      await deleteBookmark(id)
      toast.success('Bookmark deleted successfully')
      fetchBookmarks()
    } catch (error) {
      toast.error('Failed to delete bookmark')
      console.error(error)
    }
  }

  const handleFormSuccess = () => {
    setIsModalOpen(false)
    setEditingBookmark(null)
    fetchBookmarks()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">🔖 My Bookmarks</h1>
            <p className="text-gray-600">
              {filteredBookmarks.length} {filteredBookmarks.length === 1 ? 'bookmark' : 'bookmarks'}
              {searchTerm && ' matching your search'}
            </p>
          </div>
          <button
            onClick={handleCreateBookmark}
            className="btn-primary flex items-center gap-2 w-full sm:w-auto justify-center"
          >
            <FaPlus /> New Bookmark
          </button>
        </div>

        {/* Search and Filter */}
        <div className="bg-white p-4 rounded-lg shadow-md space-y-4">
          <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Search bookmarks by title, URL, or description..."
          />
          {allTags.length > 0 && (
            <TagFilter
              allTags={allTags}
              selectedTags={selectedTags}
              onChange={setSelectedTags}
            />
          )}
        </div>
      </div>

      {/* Bookmarks List */}
      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          <p className="mt-4 text-gray-600">Loading bookmarks...</p>
        </div>
      ) : filteredBookmarks.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow-md">
          <p className="text-gray-500 text-lg mb-4">
            {searchTerm || selectedTags.length > 0
              ? 'No bookmarks match your filters'
              : 'No bookmarks yet. Create your first bookmark!'}
          </p>
          {!searchTerm && selectedTags.length === 0 && (
            <button onClick={handleCreateBookmark} className="btn-primary">
              <FaPlus className="inline mr-2" /> Create Bookmark
            </button>
          )}
        </div>
      ) : (
        <BookmarkList
          bookmarks={filteredBookmarks}
          onEdit={handleEditBookmark}
          onDelete={handleDeleteBookmark}
        />
      )}

      {/* Create/Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setEditingBookmark(null)
        }}
        title={editingBookmark ? 'Edit Bookmark' : 'Create New Bookmark'}
      >
        <BookmarkForm
          bookmark={editingBookmark}
          onSuccess={handleFormSuccess}
          onCancel={() => {
            setIsModalOpen(false)
            setEditingBookmark(null)
          }}
        />
      </Modal>
    </div>
  )
}