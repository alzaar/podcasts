import React from 'react';
import './css/card.css';
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


class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
  }
  componentDidMount() {
    setTimeout(this.toggle, 300);
  }
  toggle = () => this.setState({ isOpen: !this.state.isOpen })

  play = (e) => {
    this.props.play(this.props.card.audio, this.props.card.title_original);
  }
  add = (e) => {
    this.props.add(this.props.card.audio, this.props.card.title_original, this.props.card.publisher_original, this.props.card.description_original, this.props.card.image);
  }
  render() {
    const {isOpen} = this.state;
    return (
      <List pose={isOpen ? 'open' : 'closed'}>
        <div className="col-6 m-4 ">
          <div className="Mycardbody mb-Mycardbody" id="mb-Mycardbody">
            <img className="myImage mb-myImage" src={this.props.card.image} alt="desc"/>
              <div className="details mb-details" id="mb-details">
                <h5>{this.props.card.title_original}</h5>
                <p>Publisher: {this.props.card.publisher_original}</p>
                <p className="desc">{this.props.card.description_original}</p>
              <div className="play-add mb-5 mb-play-add" id="mb-play-add">
                <div style={{cursor: 'pointer'}} onClick={this.play} ><i className="fas fa-play"></i></div>
                <div className="add mb-add" id="mb-add" onClick={this.add} style={{cursor: 'pointer'}}  ><i className="fas fa-plus"></i></div>
              </div>
            </div>
          </div>
        </div>
    </List>
    );
  }
}

export default Card;


// <a href='#' ><i className="fas fa-plus"></i></a>
// <a href='#' ><i className="fas fa-pause"></i></a>
