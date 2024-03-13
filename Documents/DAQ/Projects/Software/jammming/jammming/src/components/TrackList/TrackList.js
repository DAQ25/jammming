import React from "react";
import styles from "./TrackList.module.css";
import Playlist from "../Playlist/Playlist";
import Track from "../Track/Track";

function TrackList (props) {
    
    return (
        <div className={styles.TrackList}>
            {
            }
            {props.userSearchResults.map( track => {
                return (
                    <Track 
                        track={track} 
                        key={track.id} 
                        isRemoval={props.isRemoval} 
                        onAdd={props.onAdd}
                        onRemove={props.onRemove}
                    />
                )
            })}
        </div>
    )
}

export default TrackList;