'use client'

import { useState, useEffect } from 'react'
import { createBookmark, updateBookmark } from '@/lib/api'
import toast from 'react-hot-toast'
import { FaSave, FaTimes, FaStar, FaRegStar } from 'react-icons/fa'

export default function BookmarkForm({ bookmark, onSuccess, onCancel }) {
  const [formData, setFormData] = useState({
    url: '',
    title: '',
    description: '',
    tags: '',
    isFavorite: false
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (bookmark) {
      setFormData({
        url: bookmark.url,
        title: bookmark.title,
        description: bookmark.description || '',
        tags: bookmark.tags.join(', '),
        isFavorite: bookmark.isFavorite
      })
    }
  }, [bookmark])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.url.trim()) {
      toast.error('URL is required')
      return
    }

    setLoading(true)

    try {
      const payload = {
        url: formData.url.trim(),
        title: formData.title.trim(),
        description: formData.description.trim(),
        tags: formData.tags
          .split(',')
          .map(tag => tag.trim())
          .filter(tag => tag.length > 0),
        isFavorite: formData.isFavorite
      }

      if (bookmark) {
        await updateBookmark(bookmark._id, payload)
        toast.success('Bookmark updated successfully!')
      } else {
        await createBookmark(payload)
        toast.success('Bookmark created successfully!')
      }

      onSuccess()
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to save bookmark')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* URL */}
      <div>
        <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-2">
          URL *
        </label>
        <input
          type="url"
          id="url"
          name="url"
          value={formData.url}
          onChange={handleChange}
          className="input-field"
          placeholder="https://example.com"
          required
        />
      </div>

      {/* Title */}
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="input-field"
          placeholder="Leave empty to auto-fetch from URL"
        />
        <p className="text-sm text-gray-500 mt-1">
          💡 Leave empty and we'll automatically fetch the page title for you!
        </p>
      </div>

      {/* Description */}
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="4"
          className="textarea-field"
          placeholder="Optional description..."
        />
      </div>

      {/* Tags */}
      <div>
        <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-2">
          Tags (comma-separated)
        </label>
        <input
          type="text"
          id="tags"
          name="tags"
          value={formData.tags}
          onChange={handleChange}
          className="input-field"
          placeholder="tech, tutorial, reference"
        />
        <p className="text-sm text-gray-500 mt-1">
          Separate tags with commas (e.g., tech, design, inspiration)
        </p>
      </div>

      {/* Favorite */}
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="isFavorite"
          name="isFavorite"
          checked={formData.isFavorite}
          onChange={handleChange}
          className="w-4 h-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
        />
        <label htmlFor="isFavorite" className="text-sm font-medium text-gray-700 flex items-center gap-2">
          {formData.isFavorite ? <FaStar className="text-yellow-500" /> : <FaRegStar />}
          Mark as favorite
        </label>
      </div>

      {/* Buttons */}
      <div className="flex gap-3 pt-4">
        <button
          type="submit"
          disabled={loading}
          className="btn-primary flex-1 flex items-center justify-center gap-2"
        >
          <FaSave />
          {loading ? 'Saving...' : bookmark ? 'Update Bookmark' : 'Create Bookmark'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="btn-secondary flex items-center justify-center gap-2"
        >
          <FaTimes />
          Cancel
        </button>
      </div>
    </form>
  )
}