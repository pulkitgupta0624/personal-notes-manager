import BookmarkCard from './BookmarkCard'

export default function BookmarkList({ bookmarks, onEdit, onDelete }) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {bookmarks.map(bookmark => (
        <BookmarkCard
          key={bookmark._id}
          bookmark={bookmark}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
}