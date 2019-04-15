import React from 'react';
import './css/playlistcard.css';
//Importing Comp.

import posed from 'react-pose';

const List = posed.div({
  open: {
    x: '0%',
    delayChildren: 50,
    staggerChildren: 50
  },
  closed: { x: '-100%', delay: 100 }
});
class PlayListCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    }
  }
  componentDidMount() {
    setTimeout(this.toggle, 300);
  }

  toggle = () => this.setState({ isOpen: !this.state.isOpen });

  play = (e) => {
    this.props.play(this.props.card.audio);
  }
  deletePodcast = (podcast) => {
    this.props.deletePodcast(podcast._id);
  }
  render() {
    const {isOpen} = this.state;
    return (
      <List posed={ isOpen ? 'open' : 'closed' }>
        <div className="col-10 m-4">
          <div className="Mycardbody mb-Mycardbody" id="mb-Mycardbody">
            <img className="myImage mb-myImage" src={this.props.card.image} alt="desc"/>
              <div className="details mb-details" id="mb-details">
                <h5>{this.props.card.title_original}</h5>
                <p>Publisher: {this.props.card.publisher_original}</p>
                <p>{this.props.card.description_original}</p>
              <div className="play-delete mb-5 mb-play-delete" id="mb-play-delete">
                <div style={{cursor: 'pointer'}} onClick={this.play} ><i className="fas fa-play"></i></div>
                <div className="delete mb-delete" id="mb-delete" onClick={() => this.deletePodcast(this.props.card)} style={{cursor: 'pointer'}}  ><i className="fas fa-trash-alt"></i></div>
              </div>
            </div>
          </div>
        </div>
      </List>
    );
  }
}

export default PlayListCard;


// <a href='#' ><i className="fas fa-plus"></i></a>
// <a href='#' ><i className="fas fa-pause"></i></a>
