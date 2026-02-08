'use client'

import { useState, useEffect } from 'react'
import { createNote, updateNote } from '@/lib/api'
import toast from 'react-hot-toast'
import { FaSave, FaTimes, FaStar, FaRegStar } from 'react-icons/fa'

export default function NoteForm({ note, onSuccess, onCancel }) {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    tags: '',
    isFavorite: false
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (note) {
      setFormData({
        title: note.title,
        content: note.content,
        tags: note.tags.join(', '),
        isFavorite: note.isFavorite
      })
    }
  }, [note])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.title.trim() || !formData.content.trim()) {
      toast.error('Title and content are required')
      return
    }

    setLoading(true)

    try {
      const payload = {
        title: formData.title.trim(),
        content: formData.content.trim(),
        tags: formData.tags
          .split(',')
          .map(tag => tag.trim())
          .filter(tag => tag.length > 0),
        isFavorite: formData.isFavorite
      }

      if (note) {
        await updateNote(note._id, payload)
        toast.success('Note updated successfully!')
      } else {
        await createNote(payload)
        toast.success('Note created successfully!')
      }

      onSuccess()
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to save note')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Title */}
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
          Title *
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="input-field"
          placeholder="Enter note title..."
          required
        />
      </div>

      {/* Content */}
      <div>
        <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
          Content *
        </label>
        <textarea
          id="content"
          name="content"
          value={formData.content}
          onChange={handleChange}
          rows="8"
          className="textarea-field"
          placeholder="Write your note here..."
          required
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
          placeholder="work, important, ideas"
        />
        <p className="text-sm text-gray-500 mt-1">
          Separate tags with commas (e.g., work, personal, important)
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
          {loading ? 'Saving...' : note ? 'Update Note' : 'Create Note'}
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