var SpotifyWebApi = require('spotify-web-api-node');

var spotifyApi = new SpotifyWebApi();

console.log(spotifyApi);

spotifyApi.setAccessToken('');


var artists1 = [ '246dkjvS1zLTtiykXe5h60',
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



function getPlaylist() {

    spotifyApi.getPlaylist('spotifycharts', '37i9dQZEVXbJvfa0Yxg7E7')
        .then(function(data) {
            var artists = [];
            data.body.tracks.items.forEach(function(item, index) {
                item.track.artists.forEach(function(artist, index) {
                    artists.push(artist.id);
                });
            });
            console.log(artists)

        }, function(err) {
            console.log('Something went wrong!', err);
        });

}

spotifyApi.getArtists(artists1)
    .then(function(data) {
        data.body.artists.forEach(function(artist, index) {
            console.log((index+1) + '.   name: ' + artist.name  + "    id: " + artist.id + "   " +
                " Genres: " + artist.genres + "   imageLink: " + artist.images[1].url
                + "  Type: " + artist.type);
        });
        var stringify = JSON.stringify(data.body);


    }, function(err) {
        console.error(err);
    });



