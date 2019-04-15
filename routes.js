const express = require('express');
const Routes = express.Router();

//Setup Model
let Track = require('./track.model.js');

//Adding Routes
// 1. ADD a track
Routes.route('/add').post(function(req, res) {
  let track = new Track(req.body);
  console.log(req.body);
  track.save()
  .then(track => {
    res.status(200).json({'track':'added successfully'})
  })
  .catch(err => {
    res.status(400).send('unable to save.');
  });
});
//View all saved Tracks
Routes.route('/').get(function(req, res) {
  Track.find(function(err, tracks) {
    if (err) console.log(err);
    else res.json(tracks);
  });
});
//Edit Playlist
Routes.route('/edit/:id').get(function(req, res) {
  Track.findById(req.params.id, function(err, track) {
    if (err) console.log(err);
    else res.json(track);
  });
});
//Update Track Selection
Routes.route('/update/:id').post(function(req, res) {
  Track.findById(req.params.id, function(err, track) {
    if (err) console.log(err);
    else if (!track) {
      res.status(404).send('data not found')
    } else {
      track.title_original = req.body.track;
      track.audio = req.body.url;
      track.image = req.body.imageUrl;
      track.publisher_original = req.body.publisher_original;
      track.description_original = req.body.description_original;
      track.save()
      .then(track => res.json('Update Compelete'))
      .catch(err => res.status(400).send('Unable to update'));
    }
  });
});
//Delete a track
Routes.route('/delete/:id').get(function(req, res) {
  Track.findByIdAndRemove({_id: req.params.id}, function(err, track) {
    if (err) res.json(err);
    else res.json('successfully deleted');
  });
});

module.exports = Routes;
