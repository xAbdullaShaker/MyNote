const express = require('express');
const router = express.Router();
const Note = require('../models/Note');
const isSignedIn = require('../middleware/is-signed-in');


// gets the note frim the user "note form" shows him the new.ejs
router.get('/new', isSignedIn, (req, res) => {
  res.render('notes/new', { note: {} });
});

// HANDLE FORM SUBMISSION - CREATE NEW NOTE
router.post('/', isSignedIn, async (req, res) => {
  console.log('body: ', req.body)
  try {
    // Add owner to note before saving 
    req.body.owner = req.user._id;

    // Create note in database
    await Note.create(req.body);

    // takes u back to /notes 
    res.redirect('/notes');
  } catch (error) {
    console.log(error);
    res.send('Something went wrong');
  }
});

// SHOW ALL NOTES FOR LOGGED IN USER 
router.get('/', isSignedIn, async (req, res) => {
  try {
    // Find notes that belong to logged in user
    const foundNotes = await Note.find({ owner: req.user._id });

    // Render notes/index view and pass notes
    res.render('notes/index', { notes: foundNotes });
  } catch (error) {
    console.log(error);
    res.send('Something went wrong');
  }
});

// this sjows one single note 
router.get('/:id', isSignedIn, async (req, res) => {
  try {
    // Find note by id
    const foundNote = await Note.findById(req.params.id);

    // Render notes/show view and pass note
    res.render('notes/show', { note: foundNote });
  } catch (error) {
    console.log(error);
    res.redirect('/notes');
  }
});

// DELETE NOTE
router.delete('/:id', isSignedIn, async (req, res) => {
  try {
    const foundNote = await Note.findById(req.params.id);
    if (foundNote.owner.equals(req.user._id)) {
      // Delete the note
      await foundNote.deleteOne();

      // Redirect to notes index
      return res.redirect('/notes');
    }

    // If user not owner, send "Not authorized"
    res.send('Not authorized');
  } catch (error) {
    console.log(error);
    res.send('Something went wrong');
  }
});

// SHOW EDIT FORM FOR NOTE
router.get('/:id/edit', isSignedIn, async (req, res) => {
  try {
    const foundNote = await Note.findById(req.params.id);

    // Check ownership
    if (foundNote.owner.equals(req.user._id)) {
      // Render edit form and pass note data
      return res.render('notes/edit', { note: foundNote });
    }

    res.send('Not authorized');
  } catch (error) {
    console.log(error);
    res.redirect('/notes');
  }
});

// HANDLE EDIT FORM SUBMISSION 
router.put('/:id', isSignedIn, async (req, res) => {
  try {
    const foundNote = await Note.findById(req.params.id);
    if (foundNote.owner.equals(req.user._id)) {
      
      await Note.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        body: req.body.body
      }, { new: true });

      // Redirect to show updated note
      return res.redirect(`/notes/${req.params.id}`);
    }

    res.send('Not authorized');
  } catch (error) {
    console.log(error);
    res.send('Something went wrong');
  }
});

module.exports = router;
