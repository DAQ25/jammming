import React from "react";
import TrackList from "../TrackList/TrackList";
import styles from "./Playlist.module.css";

function Playlist(props) {
    function handleNameChange({ target }) {
        props.onNameChange(target.value);
    }
    return (
        <div className={styles.Playlist}>
            <input className={styles.PlaylistNameInput} defaultValue={"New Playlist"} onChange={handleNameChange}/>
            {/* add tracklist*/}
            <TrackList 
                userSearchResults={props.playlistTracks}
                onRemove={props.onRemove}
                isRemoval={true}
            />
            <button className={styles.SaveButton} onClick={props.onSave}>
                SAVE TO SPOTIFY
            </button>

        </div>
    )
}

//className={styles.SaveButton}

export default Playlist;