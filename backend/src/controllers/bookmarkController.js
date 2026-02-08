const Bookmark = require('../models/Bookmark');
const { fetchURLMetadata } = require('../utils/urlMetadata');

// @desc    Get all bookmarks with optional search and filters
// @route   GET /api/bookmarks?q=searchTerm&tags=tag1,tag2
// @access  Public (or Private if auth enabled)
exports.getBookmarks = async (req, res, next) => {
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
        { description: { $regex: q, $options: 'i' } },
        { url: { $regex: q, $options: 'i' } }
      ];
    }

    // Tag filter
    if (tags) {
      const tagArray = tags.split(',').map(tag => tag.trim().toLowerCase());
      query.tags = { $in: tagArray };
    }

    const bookmarks = await Bookmark.find(query).sort({ createdAt: -1 });

    res.status(200).json({
      status: 'success',
      results: bookmarks.length,
      data: {
        bookmarks
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single bookmark by ID
// @route   GET /api/bookmarks/:id
// @access  Public (or Private if auth enabled)
exports.getBookmark = async (req, res, next) => {
  try {
    let query = { _id: req.params.id };

    // Add user filter if authenticated
    if (req.user) {
      query.user = req.user.id;
    }

    const bookmark = await Bookmark.findOne(query);

    if (!bookmark) {
      return res.status(404).json({
        status: 'error',
        message: 'Bookmark not found'
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        bookmark
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new bookmark
// @route   POST /api/bookmarks
// @access  Public (or Private if auth enabled)
exports.createBookmark = async (req, res, next) => {
  try {
    let { url, title, description, tags, isFavorite } = req.body;

    // Auto-fetch title if not provided (BONUS FEATURE)
    if (!title || title.trim() === '') {
      const metadata = await fetchURLMetadata(url);
      title = metadata.title || url;
    }

    const bookmarkData = {
      url,
      title,
      description: description || '',
      tags: tags || [],
      isFavorite: isFavorite || false
    };

    // Add user if authenticated
    if (req.user) {
      bookmarkData.user = req.user.id;
    }

    const bookmark = await Bookmark.create(bookmarkData);

    res.status(201).json({
      status: 'success',
      data: {
        bookmark
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update bookmark
// @route   PUT /api/bookmarks/:id
// @access  Public (or Private if auth enabled)
exports.updateBookmark = async (req, res, next) => {
  try {
    let query = { _id: req.params.id };

    // Add user filter if authenticated
    if (req.user) {
      query.user = req.user.id;
    }

    const bookmark = await Bookmark.findOneAndUpdate(
      query,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!bookmark) {
      return res.status(404).json({
        status: 'error',
        message: 'Bookmark not found'
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        bookmark
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete bookmark
// @route   DELETE /api/bookmarks/:id
// @access  Public (or Private if auth enabled)
exports.deleteBookmark = async (req, res, next) => {
  try {
    let query = { _id: req.params.id };

    // Add user filter if authenticated
    if (req.user) {
      query.user = req.user.id;
    }

    const bookmark = await Bookmark.findOneAndDelete(query);

    if (!bookmark) {
      return res.status(404).json({
        status: 'error',
        message: 'Bookmark not found'
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'Bookmark deleted successfully',
      data: null
    });
  } catch (error) {
    next(error);
  }
};