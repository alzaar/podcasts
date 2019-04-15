import React from 'react';
import Card from './Card';

class CardCollection extends React.Component {
  render() {
    let cards = <div style={{opacity: '0.6'}}className="container d-flex justify-content-center">Search Results: {this.props.results.length}</div>;

    if (this.props.results.length === 0 && this.props.value) {
      cards = <div style={{opacity: '0.6'}}className="container d-flex justify-content-center">Search Results: {this.props.results.length}</div>;

    } else if (this.props.value) {
    cards = this.props.results.map((item, index) => <Card key={index} card={item} play={this.props.play} add={this.props.add}/>);
    
    }
    return(
      <div className="container d-flex justify-content-center" id="section-b">
        <div className="row">
          {cards}
        </div>
      </div>
    );
  }
}

export default CardCollection;
