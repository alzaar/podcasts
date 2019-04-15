import React from 'react';
import './css/playmanager.css'
class PlayManager extends React.Component {

  render() {
    console.log(this.props);
    return (
      <div ref={this.audio}>
        <audio controls autoPlay className="mb-audioPlayer" id="mb-audioplayer audio"
          src={this.props.play}>
        </audio>

              </div>
    );
  }
}
export default PlayManager;
