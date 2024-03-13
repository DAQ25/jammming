
import React, { useState } from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import { Spotify } from '../../util.Spotify/Spotify1.js';



function App() {

  const [searchResults, setSearchResults] = useState([]);
  const [playListName, setPlayListName] = useState("My new Playlist");
  const [playlistTracks, setPlaylistTracks] = useState([]);

  function addTrack(track) {
    const foundTrack = playlistTracks.find((t) => t.id === track.id);
    if (foundTrack) {
      console.log("Track already exist on playlist");
    } else {
      const addedTrack = playlistTracks.concat(track);
      setPlaylistTracks(addedTrack);
    }
  }

  function removeTrack(track) {
    const removedTrack = playlistTracks.filter((t) => t.id !== track.id);
    setPlaylistTracks(removedTrack);
  }

  function updatePlaylistName(name) {
    setPlayListName(name);
  }

  function savePlaylist() {
    const trackURIs = playlistTracks.map((t) => t.uri);
    Spotify.savePlaylist(playListName, trackURIs).then(() => {
      setPlayListName("New Playlist");
      setPlaylistTracks([]);
    }); 
  }

  function search (term) {
    Spotify.search(term).then((result) => setSearchResults(result));
    console.log(term);
  }

  return (
    <div className="App">
      <h1 style={{color:"white"}}>JA<span style={{color:"blue"}}>MMM</span>ING</h1>
      <SearchBar onSearch={search }/>
      <SearchResults userSearchResults={searchResults} onAdd={addTrack}/>
      <Playlist 
        playListName={playListName} 
        playlistTracks={playlistTracks}
        onRemove={removeTrack}
        onNameChange={updatePlaylistName}
        onSave={savePlaylist} 
      />
      
    </div>
  );
}

export default App;
