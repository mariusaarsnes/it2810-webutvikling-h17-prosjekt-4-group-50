module.exports = (req, res) => {
    let SpotifyWebApi = require('spotify-web-api-node');

    let spotifyApi = new SpotifyWebApi();

    // Access-token to the DB. This needs to be changed at certain interval.
    spotifyApi.setAccessToken(req.params.access_token);

    spotifyApi.getAlbum('5Z9fvnmsnMRN8ecmxA2jMC').then(data=> {
        console.log(data.body.tracks.items[0]);
    });
    spotifyApi.getTrack('2jfOja121SVw76Wjzf79Ye').then(data => {
        console.log(data.body.popularity);
    })
};
