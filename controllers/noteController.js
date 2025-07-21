// controllers/noteController.js
const Note = require('../models/Note');  // adjust path if needed

module.exports.index = async (req, res) => {
  try {
    // Fetch notes for the logged-in user by their ID
    const notes = await Note.find({ user: req.user._id });

    res.render('notes/index', { notes });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching notes");
  }
};
