import React, { Component } from 'react';
//Importing Components
import Search from './comp/Search';
import CardCollection from './comp/CardCollection';
import PlayManager from './comp/PlayManager';
import PlayList from './comp/PlayList';
//Importing API Config. and axios
import configEpisode from './call/config-ep';
import axios from 'axios';
//Importing css
import './app.css';
//Socket Client Lib
import socketIOClient from 'socket.io-client';
//port
import PORT from './port';
console.log(PORT);
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      results: [],
      play_url: '',
      title: '',
      tracks_stored: [],
      endpoint: `https://podcastapp.herokuapp.com`,
      show: false,
      isActive: false
    }
    this.updateValue = this.updateValue.bind(this);
    this.getResults = this.getResults.bind(this);
    this.play = this.play.bind(this);
    this.add = this.add.bind(this);
    this.store = this.store.bind(this);
    this.updatePlaylist = this.updatePlaylist.bind(this);
    this.emittingEvent = this.emittingEvent.bind(this);
    this.renderSearchResult = this.renderSearchResult.bind(this);
    this.renderPlayList = this.renderPlayList.bind(this);
    this.tabPlayList = React.createRef();
    this.tabSearchResults = React.createRef();
    this.getSaveResults = this.getSaveResults.bind(this);
    this.emittingEvent();
  }
  async updatePlaylist(data) {
    // await axios.get('http://:4000')
    // .then(res => {
    //   this.setState({tracks_stored: res.data});
    // });
    // console.log(this.state.tracks_stored, 'updatePlaylist');
      this.emittingEvent();
  }
  emittingEvent() {
    const { endpoint } = this.state;
    const socket = socketIOClient(endpoint);

    socket.on('gotData', (data) => {

      this.setState({tracks_stored: data.value})
    });

  }
  componentDidMount() {
    this.updatePlaylist();

  }
  //Play Podcast by rendering play manager/audioplayer
  play(audio, title) {
    this.setState({
      play_url: audio,
      title: title
    });
  }
  //Store podcasts to DB
  async add(audio, title_original, publisher_original, description_original, image) {
    const obj = {
      title_original: title_original,
      audio: audio,
      image: image,
      published_original: publisher_original,
      description_original: description_original
    }
    await axios.post(`${this.state.endpoint}/add`, obj)
    .then(res => console.log('Added the podcast'))
    .catch(err => console.log(err));
    this.updatePlaylist();
  }
  //Search Value stored in state to axios call to api
  updateValue(e) {
    const value = e.target.value;
    this.setState({value});
  }
  //Seperate function call to api
  apiCall = (config) => {
    axios.get(`https://listennotes.p.rapidapi.com/api/v1/search?sort_by_date=0&type=episode&offset=100&len_min=2&len_max=10&genre_ids=68%2C82&published_before=1490190241000&published_after=1390190241000&only_in=title&language=English&safe_mode=1&q=${this.state.value}`, config)
    .then(res => {
      const results = res.data.results;
      this.setState({
        results
      })
    })
    .catch(err => console.log(err));
  }
  //Get Podcast, prolly should refactor this!! TODO
  getResults() {
    this.setState({
      show: true
    })
    this.apiCall(configEpisode);
    this.setState({
      isActive: true
    })

  }
  getSaveResults() {
    this.emittingEvent();
    this.setState({
      show: true
    });
  }
  //Retreive Stored Tracks and update State for re-rendering component
  store(tracks) {
    this.setState({
      tracks_stored: tracks
    })
  }

  renderPlayList(e) {
    let className = 'active'
    this.tabPlayList.current.className = className;
    this.tabSearchResults.current.className = '';
    this.setState({
      isActive: false
    })
  }

  renderSearchResult(cardCollection) {
    let className = 'active'
    this.tabSearchResults.current.className = className;
    this.tabPlayList.current.className = '';
    this.setState({
      isActive: true
    })
  }
  render() {

    let audioPlayer = <PlayManager play={this.state.play_url} title={this.state.title} />
    let playlist = '';
    let cardCollection = '';
    if (this.state.isActive) {
      cardCollection = <CardCollection value={this.state.value} results={this.state.results} play={this.play} add={this.add}/>;
    } else {
      playlist = <PlayList tracks={this.state.tracks_stored} store={this.store} play={this.play} updatePlaylist={this.updatePlaylist} endpoint={this.state.endpoint}/>;
    }
    let components = '';
    if (this.state.show) {
      components = (<div>
                      <div className="container-fluid" id="show">
                        <div className="tab mb-3 mb-tabs" id="mb-tabs">
                          <button className="active tab1" ref={this.tabSearchResults} onClick={() => this.renderSearchResult(cardCollection)} >Search Results</button>
                          <button className="active tab2" ref={this.tabPlayList} onClick={this.renderPlayList} >View PlayList</button>
                        </div>
                        <div>
                          {cardCollection}
                          {playlist}
                        </div>
                        <div className="container" id="section-d">
                          <div className="mt-2 ml-1">
                            {audioPlayer}
                          </div>
                        </div>
                      </div>
                      <div className="footer mb-footer"  id="mb-footer">
                        <div className="footer-text mb-footer-text" id="footer-text">2019 &copy;</div>
                      </div>
                    </div>);
    }
    return (
      <div className="container-fluid">
          <Search updateValue={this.updateValue} value={this.state.value} getResults={this.getResults} getSaveResults={this.getSaveResults}/>
            {components}
      </div>
    );
  }
}

export default App;

// <div className="container mt-2 d-flex flex-column">
//   <div>
//     {audioPlayer}
//   </div>
//   <div>
//     {playlist}
//   </div>
// </div>
