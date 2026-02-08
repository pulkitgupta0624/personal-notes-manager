const Note = require('../models/Note');

// @desc    Get all notes with optional search and filters
// @route   GET /api/notes?q=searchTerm&tags=tag1,tag2
// @access  Public (or Private if auth enabled)
exports.getNotes = async (req, res, next) => {
    try {
        const { q, tags } = req.query;
        let query = {};

        // Add user filter if authenticated
        if (req.user) {
            query.user = req.user.id;
        }

        // Text search
        if (q) {
            query.$or = [
                { title: { $regex: q, $options: 'i' } },
                { content: { $regex: q, $options: 'i' } }
            ];
        }

        // Tag filter
        if (tags) {
            const tagArray = tags.split(',').map(tag => tag.trim().toLowerCase());
            query.tags = { $in: tagArray };
        }

        const notes = await Note.find(query).sort({ createdAt: -1 });

        res.status(200).json({
            status: 'success',
            results: notes.length,
            data: {
                notes
            }
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get single note by ID
// @route   GET /api/notes/:id
// @access  Public (or Private if auth enabled)
exports.getNote = async (req, res, next) => {
    try {
        let query = { _id: req.params.id };

        // Add user filter if authenticated
        if (req.user) {
            query.user = req.user.id;
        }

        const note = await Note.findOne(query);

        if (!note) {
            return res.status(404).json({
                status: 'error',
                message: 'Note not found'
            });
        }

        res.status(200).json({
            status: 'success',
            data: {
                note
            }
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Create new note
// @route   POST /api/notes
// @access  Public (or Private if auth enabled)
exports.createNote = async (req, res, next) => {
    try {
        const { title, content, tags, isFavorite } = req.body;

        const noteData = {
            title,
            content,
            tags: tags || [],
            isFavorite: isFavorite || false
        };

        // Add user if authenticated
        if (req.user) {
            noteData.user = req.user.id;
        }

        const note = await Note.create(noteData);

        res.status(201).json({
            status: 'success',
            data: {
                note
            }
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Update note
// @route   PUT /api/notes/:id
// @access  Public (or Private if auth enabled)
exports.updateNote = async (req, res, next) => {
    try {
        let query = { _id: req.params.id };

        // Add user filter if authenticated
        if (req.user) {
            query.user = req.user.id;
        }

        const note = await Note.findOneAndUpdate(
            query,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!note) {
            return res.status(404).json({
                status: 'error',
                message: 'Note not found'
            });
        }

        res.status(200).json({
            status: 'success',
            data: {
                note
            }
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Delete note
// @route   DELETE /api/notes/:id
// @access  Public (or Private if auth enabled)
exports.deleteNote = async (req, res, next) => {
    try {
        let query = { _id: req.params.id };

        // Add user filter if authenticated
        if (req.user) {
            query.user = req.user.id;
        }

        const note = await Note.findOneAndDelete(query);

        if (!note) {
            return res.status(404).json({
                status: 'error',
                message: 'Note not found'
            });
        }

        res.status(200).json({
            status: 'success',
            message: 'Note deleted successfully',
            data: null
        });
    } catch (error) {
        next(error);
    }
};