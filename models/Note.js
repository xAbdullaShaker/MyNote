/*
//gpt code
const mongoose = require('mongoose');
const { Schema } = mongoose;

const noteSchema = new Schema({
  head:  { type: String, required: true },    
  owner: { type: Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true }); */


/*
// schema to save the notes 
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// head was named title 
const noteSchema = new Schema({
  head: { 
    title: String, 
    required: true 
  },
// the body isnt being saved in the mongodb 
// and not showing in index.ejs when i type note.body
  body: { 
    type: String, 
    required: true 
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
}, { timestamps: true });

module.exports = mongoose.model('Note', noteSchema);
*/

/*
  head: {
    type: String,
    required: true
  },
  */



  const mongoose = require('mongoose');
const { Schema } = mongoose;

const noteSchema = new Schema({
  head:  { type: String, required: true },              // title
  body:  { type: String },                               // note content/description (optional)
  owner: { type: Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Note', noteSchema);
