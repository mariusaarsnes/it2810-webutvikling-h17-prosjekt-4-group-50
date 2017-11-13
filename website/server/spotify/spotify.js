// Models used to populate our database
let Artist = require('../models/ArtistModel');
let Album = require('../models/AlbumModel');
let Song = require('../models/SongModel');


// List of ArtistIDs we use to populate the database
let artistIDs = [
    '246dkjvS1zLTtiykXe5h60',
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
    '6LuN9FCkKOj5PcnpouEgny',
    '4xnihxcoXWK3UqryOSnbw5',
    '04gDigrS5kc9YWfZHwBETP',
    '7tYKF4w9nC0nq9CsPZTHyP',
    '6CawoDDP1IZUSGl4wSJGC9',
    '0l8OJzLFIV1OqbU4OhcZLu',
    '4kI8Ie27vjvonwaB2ePh8T',
    '3AVfmawzu83sp94QW7CEGm',
    '4xRYI6VqpkE3UwrDrAZL8L',
    '2wUjUUtkb5lvLKcGKsKqsR',
    '6eUKZXaKkcviH0Ku9w2n3V',
    '6M2wZ9GZgrQXHCFfjv46we',
    '4nDoRrQiYLoBzwC5BhVJzF',
    '50co4Is1HCEo8bhOyUWKpn',
    '3wyVrVrFCkukjdVIdirGVY',
    '2wY79sveU1sp5g7SokKOiI',
    '7hssUdpvtY5oiARaUDgFZ3',
    '79QO0Xmn1dZhvaLicS2Yrs',
    '3JhNCzhSMTxs9WLGJJxWOY',
    '4utLUGcTvOJFr6aqIJtYWV',
    '1vCWHaC5f2uS3yhpwWbIA6',
    '5JYo7gm2dkyLLlWHjxS7Dy',
    '504cl42JQLRqlZddfZ3S4z',
    '1L9i6qZYIGQedgM9QLSyzb'
];

module.exports = (req, res) => {
    let SpotifyWebApi = require('spotify-web-api-node');

    let spotifyApi = new SpotifyWebApi();

    // Access-token to the DB. This needs to be changed at certain interval.
    spotifyApi.setAccessToken(req.params.access_token);
    // Fetching all the artists from artists1, containing all the IDs
    parsedArtistsPromise = new Promise(resolve => {
        console.log("Fetching artists");
        let i = 0;
        spotifyApi.getArtists(artistIDs).then(data => {
            let temp = {};
            // Looping through all artists, parsing the data, and saving to the database.
            console.log("Generating Schemas for Artist");
            data.body.artists.forEach(function (artist) {
                i++;
                temp[artist.id] = new Artist({
                    _id: artist.id,
                    name: artist.name,
                    genres: artist.genres,
                    imageLink: artist.images[1].url,
                    type: artist.type,
                    popularity: artist.popularity,
                    albums: [],
                    songs: []
                });
            });
        });
        if (i === artistIDs.length) {
            console.log("Done fetching Artists");
            resolve(temp);
        }
    });

    parsedAlbumsPromise = new Promise(resolve => {
        console.log("Fetching albums for each artist and generating Schemas");
        let temp = {};
        let i = 0;
        let innerLoopDoneCount = 0;
        artistIDs.forEach(artist => {
            i++;
            spotifyApi.getArtistAlbums(artist).then(data => {
                let j = 0;
                data.body.items.forEach(album => {
                    j++;

                    // Since multiple artist may be on an album, we ignore the albums we already have added.
                    if (!(album.id in temp)) {

                        let tempArtists = [];

                        album.artists.forEach(artist => {

                            tempArtists.push(artist.id);

                        });
                        // adding each album to a dictionary. Use the album iD as key and the values is a list of all
                        // its artists. this is to make the populating of data more efficient.
                        temp[album.id] = new Album({
                            _id: album.id,
                            name: album.name,
                            imageLink: album.images[1].url,
                            artists: tempArtists,
                            songs: []
                        });
                    }
                    if (j === data.body.items.length) {
                        innerLoopDoneCount++;
                    }
                    if (i === artistIDs.length && innerLoopDoneCount === artistIDs.length) {
                        console.log("Done fetching albums");
                        resolve(temp);
                    }
                });
            }).catch(reason => {
                throw reason;
            });
        });
    });

    parsedAlbumsPromise.then(parsedAlbums => {
        parsedSongsPromise = new Promise(resolve => {
            console.log("Fetching Songs for each album and generating Schemas");

            let temp = {};
            let i = 0;
            let innerLoopDone = 0;
            for (let key in parsedAlbums) {
                i++;
                setTimeout(() => {
                    spotifyApi.getAlbumTracks(key).then(data => {
                        let j = 0;
                        data.body.items.forEach(track => {
                            j++;

                            let tempArtists = [];

                            track.artists.forEach(artist => {
                                if (artistIDs.indexOf(artist.id) > -1) {
                                    tempArtists.push(artist.id)
                                }
                            });
                            temp[track.id] = new Song({
                                _id: track.id,
                                name: track.name,
                                duration: track.duration,
                                artists: tempArtists,
                                album: key
                            });

                            if (j === data.body.items.length) {
                                innerLoopDone++;
                            }
                            if (i === Object.keys(parsedAlbums).length && innerLoopDone === Object.keys(parsedAlbums).length) {
                                console.log("Done with parsing Songs");
                                resolve(temp)
                            }
                        })
                    }).catch(reason => {
                        console.log(reason)

                    })
                }, 120 * i)
            }


        });

        allPromises = Promise.all([parsedArtistsPromise, parsedAlbumsPromise, parsedSongsPromise]).then(values => {
            console.log("Done with parsing everything.");
            console.log("Start updating artists models to contain albums");


            // Loop through each key in songs dictionary
            // and add the song to the right album and artist
            for (let key in values[2]) {
                // Now we add the songs to the right album,
                values[1][values[2][key].album].tracks.push(key);
                values[2][key].artists.forEach(artistID => {
                    values[0][artistID].tracks.push(key)
                })
            }

            //Loop through each key in album dictionary
            for (let key in values[1]) {
                // For each artist in each album add this album to the artist if the artist is on that we will save
                values[1][key].artists.forEach(artist => {
                    if (artist in values[0]) {
                        values[0][artist].albums.push(key);
                    }
                })
            }

            // Save all songs
            for (let key in values[2]) {
                values[2][key].save();
            }
            // Save all albums
            for (let key in values[1]) {
                values[1][key].save();
            }
            // Save all artists
            for (let key in values[0]) {
                //console.log(values[0][key]);
                values[0][key].save();
            }
            console.log("Finished populating database");
        })

    });
};
