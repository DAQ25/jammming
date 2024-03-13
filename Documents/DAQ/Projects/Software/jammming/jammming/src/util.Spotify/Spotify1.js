let accessToken;
const clientID = "83284779194442ea8ea5a96502540a08";
const redirectURL = "http://localhost:3000";


const Spotify = {
    getAccessToken() { 
        if (accessToken) return accessToken;
        const tokenInURL = window.location.href.match(/access_token=([^&]*)/);
        const expiryTime = window.location.href.match(/expires_in=([^&]*)/);

        if (tokenInURL && expiryTime) {
        //setting acces token and expiry time variables
            accessToken = tokenInURL[1];
            const expiresIn = Number(expiryTime[1]);

        //setting the access token to expire at the value for expiration time
            window.setTimeout(() => (accessToken = ""), expiresIn * 1000);
        // clearing url after the access token expires
        window.history.pushState("Access token", null, "/");
        return accessToken;
        }
        // third check for the access token if the first and second check are both false
        const redirect = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURL}`;
        window.location = redirect;
    },

    search(term) {
        accessToken = Spotify.getAccessToken();
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
            method: "GET",
            headers: { Authorization: `Bearer ${accessToken}`},
        })
            .then((response) => response.json())
            .then((jsonResponse) => {
                if (!jsonResponse) {
                    console.error("Response error")
                }

                return jsonResponse.tracks.items.map((t) => ({
                    
                    id: t.id,
                    name: t.name,
                    artist: t.artists[0].name,
                    album: t.album.name,
                    uri: t.uri,
            }))
            
        })

    },

    savePlaylist(name, trackURIs) {
        if (!name || !trackURIs) return;
        const aToken = Spotify.getAccessToken();
        const header = {Authorization: `Bearer ${aToken}`};
        let userID;

        return fetch (`https://api.spotify.com/v1/me`, {headers: header} )
            .then((response) => response.json())
            .then((jsonResponse) => {
                userID = jsonResponse.id;
                let playlistID;
                return fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, {
                    headers: header,
                    method: "post",
                    body: JSON.stringify({name:name })
                })
                    .then((response) => response.json())
                    .then((jsonResponse) => {
                        playlistID = jsonResponse.id;
                        return fetch(`https://api.spotify.com/v1/playlists/${playlistID}/tracks`, {
                            headers: header,
                            method: "post",
                            body: JSON.stringify({uris: trackURIs}),

                        })
                    })
            })
    

        
    }

};


export {Spotify};