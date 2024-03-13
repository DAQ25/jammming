import React from 'react';
import TrackList from '../TrackList/TrackList';
import styles from './SearchResults.module.css';

function SearchResults(props) {
    return (
        <div className={styles.SearchResults}>
            <TrackList userSearchResults={props.userSearchResults} 
            isRemoval={false}
            onAdd={props.onAdd}/>
        </div>
    )
}

export default SearchResults;