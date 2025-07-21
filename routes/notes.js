const express = require('express');
const router  = express.Router();
const Note    = require('../models/Note');
const isSignedIn = require('../middleware/is-signed-in');

// Show “new note” form
router.get('/new', isSignedIn, (req, res) => {
  res.render('notes/new', { note: {} });
});

// Handle form submission
router.post('/', isSignedIn, async (req, res, next) => {
  try {
    await Note.create({ 
      head: req.body.head, 
      body: req.body.body, 
      owner: req.user._id 
    });
    res.redirect('/notes');
  } catch (err) {
    next(err);
  }
});

// Index (list all user’s notes)
router.get('/', isSignedIn, async (req, res, next) => {
  try {
    const notes = await Note.find({ owner: req.user._id });
    res.render('notes/index', { notes });
  } catch (err) {
    next(err);
  }
});

// Show one note
router.get('/:id', isSignedIn, async (req, res, next) => {
  try {
    const note = await Note.findById(req.params.id);
    res.render('notes/show', { note });
  } catch (err) {
    next(err);
  }
});

// Show edit form
router.get('/:id/edit', isSignedIn, async (req, res, next) => {
  try {
    const note = await Note.findById(req.params.id);
    res.render('notes/edit', { note });
  } catch (err) {
    next(err);
  }
});

// Handle edit
router.put('/:id', isSignedIn, async (req, res, next) => {
  try {
    await Note.findByIdAndUpdate(req.params.id, { head: req.body.head, body: req.body.body });
    res.redirect(`/notes/${req.params.id}`);
  } catch (err) {
    next(err);
  }
});

// Handle delete
router.delete('/:id', isSignedIn, async (req, res, next) => {
  try {
    await Note.findByIdAndDelete(req.params.id);
    res.redirect('/notes');
  } catch (err) {
    next(err);
  }
});

module.exports = router;
