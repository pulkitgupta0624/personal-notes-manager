import { FaEdit, FaTrash, FaStar, FaClock } from 'react-icons/fa'
import { formatDate } from '@/utils/constants'

export default function NoteCard({ note, onEdit, onDelete }) {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 animate-fade-in">
      {/* Header */}
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-xl font-semibold text-gray-800 flex-1 pr-4">
          {note.title}
        </h3>
        <div className="flex gap-2">
          {note.isFavorite && (
            <FaStar className="text-yellow-500 text-xl" title="Favorite" />
          )}
        </div>
      </div>

      {/* Content Preview */}
      <p className="text-gray-600 mb-4 line-clamp-3">
        {note.content}
      </p>

      {/* Tags */}
      {note.tags && note.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {note.tags.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Footer */}
      <div className="flex justify-between items-center pt-4 border-t border-gray-200">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <FaClock />
          <span>{formatDate(note.createdAt)}</span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(note)}
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            title="Edit note"
            aria-label="Edit note"
          >
            <FaEdit />
          </button>
          <button
            onClick={() => onDelete(note._id)}
            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            title="Delete note"
            aria-label="Delete note"
          >
            <FaTrash />
          </button>
        </div>
      </div>
    </div>
  )
}