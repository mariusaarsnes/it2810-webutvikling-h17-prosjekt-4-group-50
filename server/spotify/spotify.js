var SpotifyWebApi = require('spotify-web-api-node');

var spotifyApi = new SpotifyWebApi();

console.log(spotifyApi);

spotifyApi.setAccessToken('BQDBvhtfqgQQvIpv6Nmnn5QzrvnJDo-fB7gbBqK-cV-_QcUxqWI8FvqCMcT5xVMQu6v4AJtXlFvlSk-dMHnh55' +
    'eIGfUW5T-3zjH7aObe1H812cGZzw9fWkruU_bqI0xui9zPe3mP9ZiiTLI');


var artists = [];



spotifyApi.getPlaylist('spotifycharts', '37i9dQZEVXbJvfa0Yxg7E7')
    .then(function(data) {
        console.log('Some information about this playlist', data.body);
        data.body.tracks.items.forEach(function(item, index) {
            console.log(item.track.artists);
            item.track.artists.forEach(function(artist, index) {
                artists.push(artist.id);
            });
        });

    }, function(err) {
        console.log('Something went wrong!', err);
    });

spotifyApi.getArtists(['6MDME20pz9RveH9rEXvrOM'])
    .then(function(data) {
        console.log(artists);
        data.body.artists.forEach(function(artist, index) {
            console.log((index+1) + '.   name: ' + artist.name  + "    id: " + artist.id + "   " +
                " Genres: " + artist.genres + "   imageLink: " + artist.images[1].url
                + "  Type: " + artist.type);
        });
        var stringify = JSON.stringify(data.body);

    }, function(err) {
        console.error(err);
    });