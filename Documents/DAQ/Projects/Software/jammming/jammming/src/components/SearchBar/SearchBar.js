import React, {useState} from 'react';
import styles from "./SearchBar.module.css"; 
function SearchBar(props) {
    const [term, setTerm] = useState("");

    function passTerm() {
        props.onSearch(term);
    }
    
    function handleTermChange({ target }) {
        setTerm(target.value);
    }
    return (
        <div className={styles.SearchBar}>
            <input
                className={styles.SearchInput}
                type="text" 
                placeholder="Type any song, artist or album"
                onChange={handleTermChange} 
            /> 
            <button
            className={styles.SearchButton} 
            type="submit"
            onClick={passTerm}
            >
                Search
            </button>
        </div>
    )
}

export default SearchBar;