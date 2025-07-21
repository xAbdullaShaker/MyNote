
/*
// models/Note.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const noteSchema = new Schema({
  head:  { type: String, required: true },        // your “heading”
  owner: { type: Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Note', noteSchema);
*/
// models/Note.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const noteSchema = new Schema({
  head:  { type: String, required: true },              // title
  body:  { type: String },                               // note content/description (optional)
  owner: { type: Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Note', noteSchema);
