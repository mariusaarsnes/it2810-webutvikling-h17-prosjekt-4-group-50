let Artist = require('../models/ArtistModel');

let SpotifyWebApi = require('spotify-web-api-node');

let spotifyApi = new SpotifyWebApi();

console.log(spotifyApi);

spotifyApi.setAccessToken('BQDvIj6cxotXvaOABj_ZdZIui0U0_rD7SnJ--LxHLx_cyrRw_sObo_iFOql5lSy7WSempz8FdFi7vN_fAK7XYvEIsxFnz7BoUtEnYYlAhVqoRtj7odhKrYjefyLyO7R9jDKL8c3rDyst2bw');


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


let parsedArtists = [];


function getPlaylist() {

    spotifyApi.getPlaylist('spotifycharts', '37i9dQZEVXbJvfa0Yxg7E7')
        .then(function (data) {
            let artists = [];
            data.body.tracks.items.forEach(function (item, index) {
                item.track.artists.forEach(function (artist, index) {
                    artists.push(artist.id);
                });
            });
            console.log(artists)

        }, function (err) {
            console.log('Something went wrong!', err);
        });

}
module.exports =  () => {
    spotifyApi.getArtists(artists1)
        .then(function (data) {
            data.body.artists.forEach(function (artist, index) {
                //console.log(artist);
                let tempArtist = new Artist({
                    _id: artist.id,
                    name: artist.name,
                    genres: artist.genres,
                    //imageLink: artist.images[1].url,
                    type: artist.type,
                    popularity: artist.popularity
                });

                parsedArtists.push(tempArtist);
                /*
                console.log((index + 1)
                    + ".  id: " + artist.id
                    + "   name: " + artist.name
                    + "    genres: " + artist.genres
                    + "   imageLink: " + artist.images[1].url
                    + "   type: " + artist.type
                    + "   popularity: " + artist.popularity);
                    */

            });
            console.log(parsedArtists);
            parsedArtists.forEach(element =>{
                element.save()
            })
        }, function (err) {
            console.error(err);
        });

}

/*
spotifyApi.getArtistAlbums('4utLUGcTvOJFr6aqIJtYWV')
    .then(function(data) {
        data.body.items.forEach(function(album, index) {
            console.log((index+1)
                + ".  id: " + album.id
                + "   name: " + album.name
                + "   imageLink: " + album.images[1].url
                + "   type: " + album.album_type);

        });
    }, function(err) {
        console.error(err);
    });

spotifyApi.getAlbumTracks('1isHoxcm6IP2s2TJXcNDcy')
    .then(function(data) {
        data.body.items.forEach(function(track, index) {
            console.log((index+1)
                + ".  id: " + track.id
                + "   name: " + track.name
                + "   duration: " + track.duration_ms
                + "   type: " + track.type);

        });
    }, function(err) {
        console.log('Something went wrong!', err);
    });
*/
