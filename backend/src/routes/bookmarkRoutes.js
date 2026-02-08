const express = require('express');
const {
  getBookmarks,
  getBookmark,
  createBookmark,
  updateBookmark,
  deleteBookmark
} = require('../controllers/bookmarkController');
const { protect, optionalAuth } = require('../middlewares/auth');
const { validateBookmark } = require('../middlewares/validate');

const router = express.Router();

// Apply optional auth - works with or without token
router.use(optionalAuth);

router.route('/')
  .get(getBookmarks)
  .post(validateBookmark, createBookmark);

router.route('/:id')
  .get(getBookmark)
  .put(validateBookmark, updateBookmark)
  .delete(deleteBookmark);

module.exports = router;