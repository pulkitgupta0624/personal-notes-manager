import { FaEdit, FaTrash, FaStar, FaExternalLinkAlt, FaClock } from 'react-icons/fa'
import { formatDate } from '@/utils/constants'

export default function BookmarkCard({ bookmark, onEdit, onDelete }) {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 animate-fade-in">
      {/* Header */}
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1 pr-4">
          <a
            href={bookmark.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xl font-semibold text-gray-800 hover:text-primary-600 transition-colors flex items-center gap-2 break-words"
          >
            <span className="line-clamp-2">{bookmark.title}</span>
            <FaExternalLinkAlt className="text-sm flex-shrink-0" />
          </a>
        </div>
        <div className="flex gap-2">
          {bookmark.isFavorite && (
            <FaStar className="text-yellow-500 text-xl flex-shrink-0" title="Favorite" />
          )}
        </div>
      </div>

      {/* URL */}
      <p className="text-sm text-gray-500 mb-3 truncate">
        {bookmark.url}
      </p>

      {/* Description */}
      {bookmark.description && (
        <p className="text-gray-600 mb-4 line-clamp-2">
          {bookmark.description}
        </p>
      )}

      {/* Tags */}
      {bookmark.tags && bookmark.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {bookmark.tags.map((tag, index) => (
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
          <span>{formatDate(bookmark.createdAt)}</span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(bookmark)}
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            title="Edit bookmark"
            aria-label="Edit bookmark"
          >
            <FaEdit />
          </button>
          <button
            onClick={() => onDelete(bookmark._id)}
            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            title="Delete bookmark"
            aria-label="Delete bookmark"
          >
            <FaTrash />
          </button>
        </div>
      </div>
    </div>
  )
}