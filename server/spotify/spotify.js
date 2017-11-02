// Models used to populate our database
let Artist = require('../models/ArtistModel');
let Album = require('../models/AlbumModel');
let Song = require('../models/SongModel');


// List of ArtistIDs we use to populate the database
let artists1 = ['246dkjvS1zLTtiykXe5h60',
    '1URnnhqYAYcrqrcwql10ft',
    '6fOMl44jA4Sp5b9PpYCkzz',
    '7vk5e3vY1uw9plTHJAMwjN',
    '55fhWPvDiMpLnE4ZzNXZyW',
    '5fyDppLDl1juIu1BcUT5zh',
    '23fqKkggKUBHNkbKtXEls4',
    '1QDrz3DMMaz3TB1cm0PGDu',
    '0C8ZW7ezQVs4URX5aX7Kqx',
    '64KEffDW9EtZ1y2vBYgq8T',
    '5ZsFI1h6hIdQRw2ti0hz81',
    '5WUlDfRSoLAfcVSX1WnrxN',
    '64KEffDW9EtZ1y2vBYgq8T',
    '6LuN9FCkKOj5PcnpouEgny',
    '7vk5e3vY1uw9plTHJAMwjN',
    '23fqKkggKUBHNkbKtXEls4',
    '4xnihxcoXWK3UqryOSnbw5',
    '04gDigrS5kc9YWfZHwBETP',
    '7tYKF4w9nC0nq9CsPZTHyP',
    '6CawoDDP1IZUSGl4wSJGC9',
    '0l8OJzLFIV1OqbU4OhcZLu',
    '4kI8Ie27vjvonwaB2ePh8T',
    '3AVfmawzu83sp94QW7CEGm',
    '4xRYI6VqpkE3UwrDrAZL8L',
    '2wUjUUtkb5lvLKcGKsKqsR',
    '6LuN9FCkKOj5PcnpouEgny',
    '6eUKZXaKkcviH0Ku9w2n3V',
    '6M2wZ9GZgrQXHCFfjv46we',
    '4nDoRrQiYLoBzwC5BhVJzF',
    '50co4Is1HCEo8bhOyUWKpn',
    '3wyVrVrFCkukjdVIdirGVY',
    '2wY79sveU1sp5g7SokKOiI',
    '7hssUdpvtY5oiARaUDgFZ3',
    '23fqKkggKUBHNkbKtXEls4',
    '79QO0Xmn1dZhvaLicS2Yrs',
    '3JhNCzhSMTxs9WLGJJxWOY',
    '4utLUGcTvOJFr6aqIJtYWV',
    '1vCWHaC5f2uS3yhpwWbIA6',
    '5JYo7gm2dkyLLlWHjxS7Dy',
    '504cl42JQLRqlZddfZ3S4z',
    '504cl42JQLRqlZddfZ3S4z',
    '1Xfv0o1xU7jH7M9QYod7rj',
    '1L9i6qZYIGQedgM9QLSyzb'];


module.exports = (req, res) => {
    let SpotifyWebApi = require('spotify-web-api-node');

    let spotifyApi = new SpotifyWebApi();

    // Access-token to the DB. This needs to be changed at certain interval.
    spotifyApi.setAccessToken(req.params.access_token);
    // Fetching all the artists from artists1, containing all the IDs
    spotifyApi.getArtists(artists1)
        .then(function (data) {
            // Looping through all artists, parsing the data, and saving to the database.
            data.body.artists.forEach(function (artist) {
                let parsedArtist = new Artist({
                    _id: artist.id,
                    name: artist.name,
                    genres: artist.genres,
                    imageLink: artist.images[1].uri,
                    type: artist.type,
                    popularity: artist.popularity
                });

                //Saving artist to the database
                parsedArtist.save();

                // Fetching All the albums of an artist from spotify
                spotifyApi.getArtistAlbums(artist.id).then(data => {
                    // Going through all albums, parsing the data nd savign it to the database.
                    data.body.items.forEach(album => {
                        let tempArtists = [];

                        album.artists.forEach(data => {
                            tempArtists.push(data.id)
                        });
                        let parsedAlbum = new Album({
                            _id: album.id,
                            name: album.name,
                            imageLink: album.images[1].uri,
                            artists: tempArtists
                        });
                        // Saving album to the database
                        parsedAlbum.save();

                        // Fetching all the tracks for each album, from Spotify
                        spotifyApi.getAlbumTracks(album.id).then(data => {
                            data.body.items.forEach(track => {
                                let tempArtists = [];

                                track.artists.forEach(artist => {
                                        tempArtists.push(artist)
                                    }
                                );
                                let parsedTrack = new Song({
                                    _id: track.id,
                                    name: track.name,
                                    duration: track.duration,
                                    artists: tempArtists
                                });
                                console.log(parsedTrack);
                                parsedTrack.save();
                            })
                        }, err => {
                            console.error(err);
                        });
                    });

                }, err => {
                    console.error(err);
                });
            });

        }, function (err) {
            console.error(err);
        });


};
