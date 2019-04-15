import React from 'react';
import './css/search.css';
const Search = (props) => {
  const handleChange = (e) => {
    props.updateValue(e);
  }
  const handleSubmit = (e) => {
    // e.preventDefault();
    props.getResults();
  }
  const formSubmit = (e) => {
    e.preventDefault();
    handleSubmit();
    window.scrollTo(0, 1200);
  }
  const getSaveResults = () => {
    props.getSaveResults();
    window.scrollTo(0, 1200);
  }
  return (
    <div id="section-a">
      <div className="food-img bg-img"></div>
      <form className="center-search mb-center-search" onSubmit={formSubmit.bind(this)}>
        <div className="welcome-text mb-welcome-text">Podcasts</div>
        <div className="welcome-details mb-welcome-details">Your very own Podcast App</div>
        <div className="search-option mb-search-option">
          <label>
          <input className="search-bar mb-search-bar" type="text" value={props.value} onChange={handleChange.bind(this)}/>
          </label>
          <a href="#show" onClick={handleSubmit.bind(this)} className="btn btn-light button-Search">Search</a>
        </div>
      </form>
    </div>
  );
}

export default Search;
// <div className="nav-button" onClick={getSaveResults.bind(this)}>Saved Podcasts</div>
