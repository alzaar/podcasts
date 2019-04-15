const mongoose = require('mongoose');
const { Schema } = mongoose;

let Track = new Schema({
  title_original: {
    type: String
  },
  image: {
    type: String
  },
  publisher_original: {
    type: String
  },
  description_original: {
    type: String
  },
  audio: {
    type: String
  }
}, {
  collection: 'track'
});

module.exports = mongoose.model('Track', Track);
