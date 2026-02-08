'use client'

import { useState, useEffect } from 'react'
import NoteList from '@/components/notes/NoteList'
import NoteForm from '@/components/notes/NoteForm'
import SearchBar from '@/components/common/SearchBar'
import TagFilter from '@/components/common/TagFilter'
import Modal from '@/components/common/Modal'
import { getNotes, deleteNote } from '@/lib/api'
import toast from 'react-hot-toast'
import { FaPlus } from 'react-icons/fa'
import { useAuth } from '@/hooks/useAuth'

export default function NotesPage() {
    useAuth()
    const [notes, setNotes] = useState([])
    const [filteredNotes, setFilteredNotes] = useState([])
    const [loading, setLoading] = useState(true)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editingNote, setEditingNote] = useState(null)
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedTags, setSelectedTags] = useState([])

    // Fetch notes
    const fetchNotes = async () => {
        try {
            setLoading(true)
            const data = await getNotes()
            setNotes(data)
            setFilteredNotes(data)
        } catch (error) {
            toast.error('Failed to fetch notes')
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchNotes()
    }, [])

    // Filter notes based on search and tags
    useEffect(() => {
        let filtered = notes

        // Search filter
        if (searchTerm) {
            filtered = filtered.filter(note =>
                note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                note.content.toLowerCase().includes(searchTerm.toLowerCase())
            )
        }

        // Tag filter
        if (selectedTags.length > 0) {
            filtered = filtered.filter(note =>
                selectedTags.every(tag => note.tags.includes(tag))
            )
        }

        setFilteredNotes(filtered)
    }, [searchTerm, selectedTags, notes])

    // Get all unique tags
    const allTags = [...new Set(notes.flatMap(note => note.tags))]

    const handleCreateNote = () => {
        setEditingNote(null)
        setIsModalOpen(true)
    }

    const handleEditNote = (note) => {
        setEditingNote(note)
        setIsModalOpen(true)
    }

    const handleDeleteNote = async (id) => {
        if (!confirm('Are you sure you want to delete this note?')) return

        try {
            await deleteNote(id)
            toast.success('Note deleted successfully')
            fetchNotes()
        } catch (error) {
            toast.error('Failed to delete note')
            console.error(error)
        }
    }

    const handleFormSuccess = () => {
        setIsModalOpen(false)
        setEditingNote(null)
        fetchNotes()
    }

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Header */}
            <div className="mb-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                    <div>
                        <h1 className="text-4xl font-bold text-gray-800 mb-2">📝 My Notes</h1>
                        <p className="text-gray-600">
                            {filteredNotes.length} {filteredNotes.length === 1 ? 'note' : 'notes'}
                            {searchTerm && ' matching your search'}
                        </p>
                    </div>
                    <button
                        onClick={handleCreateNote}
                        className="btn-primary flex items-center gap-2 w-full sm:w-auto justify-center"
                    >
                        <FaPlus /> New Note
                    </button>
                </div>

                {/* Search and Filter */}
                <div className="bg-white p-4 rounded-lg shadow-md space-y-4">
                    <SearchBar
                        value={searchTerm}
                        onChange={setSearchTerm}
                        placeholder="Search notes by title or content..."
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

            {/* Notes List */}
            {loading ? (
                <div className="text-center py-12">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
                    <p className="mt-4 text-gray-600">Loading notes...</p>
                </div>
            ) : filteredNotes.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-lg shadow-md">
                    <p className="text-gray-500 text-lg mb-4">
                        {searchTerm || selectedTags.length > 0
                            ? 'No notes match your filters'
                            : 'No notes yet. Create your first note!'}
                    </p>
                    {!searchTerm && selectedTags.length === 0 && (
                        <button onClick={handleCreateNote} className="btn-primary">
                            <FaPlus className="inline mr-2" /> Create Note
                        </button>
                    )}
                </div>
            ) : (
                <NoteList
                    notes={filteredNotes}
                    onEdit={handleEditNote}
                    onDelete={handleDeleteNote}
                />
            )}

            {/* Create/Edit Modal */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false)
                    setEditingNote(null)
                }}
                title={editingNote ? 'Edit Note' : 'Create New Note'}
            >
                <NoteForm
                    note={editingNote}
                    onSuccess={handleFormSuccess}
                    onCancel={() => {
                        setIsModalOpen(false)
                        setEditingNote(null)
                    }}
                />
            </Modal>
        </div>
    )
}