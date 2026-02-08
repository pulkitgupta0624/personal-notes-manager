const express = require('express');
const {
  getNotes,
  getNote,
  createNote,
  updateNote,
  deleteNote
} = require('../controllers/noteController');
const { protect, optionalAuth } = require('../middlewares/auth');
const { validateNote } = require('../middlewares/validate');

const router = express.Router();

// Apply optional auth - works with or without token
router.use(optionalAuth);

router.route('/')
  .get(getNotes)
  .post(validateNote, createNote);

router.route('/:id')
  .get(getNote)
  .put(validateNote, updateNote)
  .delete(deleteNote);

module.exports = router;