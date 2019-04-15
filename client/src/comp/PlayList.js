import React from 'react';
//Axios Call
import Card from './PlayListCard';
import axios from 'axios';
const PlayList = (props) => {
  const playAudio = (podcast) => {
    console.log(podcast);
    const title = podcast.title_original;
    const url = podcast.audio;
    props.play(url, title);
  }
  const deletePodcast = (podcast) => {
    axios.get(`${props.endpoint}/delete/`+podcast)
            .then(console.log('Deleted'))
            .catch(err => console.log(err))
    console.log(props);
    props.updatePlaylist();
  }
  let tracks = <div className="container d-flex justify-content-center" style={{opacity: '0.7'}}>Nothing saved yet.</div>

  if (props.tracks.length !== 0) {
    tracks = props.tracks.map((item, index) => <Card key={index} card={item} play={playAudio.bind(this, item)} deletePodcast={deletePodcast.bind(this)} />);
  }

  return (
    <div className="container d-flex justify-content-center" id="section-c">
      <div className="row">
        {tracks}
      </div>
    </div>
  );
}

export default PlayList;

// props.tracks.map((item, index) => {
  // return <button className="btn btn-info" key={index} title={obj.title} onClick={playAudio.bind(this, obj)}>Play: {obj.title} <i onClick={deletePodcast.bind(this, obj)} className="btn btn-light fas fa-trash-alt"></i></button>
