import { FaTags, FaTimes } from 'react-icons/fa'

export default function TagFilter({ allTags, selectedTags, onChange }) {
  const toggleTag = (tag) => {
    if (selectedTags.includes(tag)) {
      onChange(selectedTags.filter(t => t !== tag))
    } else {
      onChange([...selectedTags, tag])
    }
  }

  const clearAll = () => {
    onChange([])
  }

  if (allTags.length === 0) return null

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
          <FaTags />
          <span>Filter by tags:</span>
        </div>
        {selectedTags.length > 0 && (
          <button
            onClick={clearAll}
            className="text-sm text-primary-600 hover:text-primary-700 flex items-center gap-1"
          >
            <FaTimes /> Clear all
          </button>
        )}
      </div>
      <div className="flex flex-wrap gap-2">
        {allTags.map((tag, index) => {
          const isSelected = selectedTags.includes(tag)
          return (
            <button
              key={index}
              onClick={() => toggleTag(tag)}
              className={`px-3 py-1 rounded-full text-sm transition-colors ${
                isSelected
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              #{tag}
            </button>
          )
        })}
      </div>
    </div>
  )
}