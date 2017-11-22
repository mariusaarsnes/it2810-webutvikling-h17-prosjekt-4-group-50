import {getTestBed, TestBed} from '@angular/core/testing';

import {DataService} from './data.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

describe('DataService', () => {
    let injector: TestBed;
    let service: DataService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [DataService,
            ],
            imports: [
                HttpClientTestingModule,
            ]
        });

        injector = getTestBed();
        service = injector.get(DataService);
        httpMock = injector.get(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });


    describe('#getArtists', () => {
        it('Should return an Observable<ArtistsResponse[]>', () => {
            const answer = [
                {
                    _id: 'id1',
                    name: 'artist1',
                    type: 'artist',
                    popularity: 90,
                    albums: ['album1', 'album2'],
                    songs: ['Song1', 'Song2'],
                    __v: 1,
                    genres: ['genre1'],
                    imageLink: 'link'
                },
                {
                    _id: 'id2',
                    name: 'artist2',
                    type: 'artist',
                    popularity: 10,
                    albums: ['album1', 'album2'],
                    songs: ['Song1', 'Song2'],
                    __v: 2,
                    genres: ['genre1'],
                    imageLink: 'link'
                }];

            service.getArtists('artist', 2, 0, 'artist', 'value', 'asc', 'type')
                .subscribe(artists => {
                    expect(artists).toBeDefined();
                    expect(artists).toEqual(jasmine.any(Array));
                    expect(artists.length).toBe(2);
                    expect(artists[0].name).toBe('artist1');
                    expect(artists[1].name).toBe('artist2');
                });

            const req = httpMock.expectOne('api/artists/' +
                'artist' + '/' + 'asc' + '/' + 'type' + '/' + 'artist' + '/' +
                'value' + '/' + '0' + '/' + '2');
            expect(req.request.method).toBe('GET');
            req.flush(answer);

            const isLoggedInReq = httpMock.expectOne('api/logged_in');
            isLoggedInReq.flush({});

        });
    });
    describe('#getArtistsByIds', () => {
        it('Should return an Observable<ArtistResponse[]>', () => {
            const answer = [
                {
                    _id: '1',
                    name: 'artist1',
                    type: 'artist',
                    popularity: 90,
                    albums: ['album1', 'album2'],
                    songs: ['Song1', 'Song2'],
                    __v: 1,
                    genres: ['genre1'],
                    imageLink: 'link'
                },
                {
                    _id: '2',
                    name: 'artist2',
                    type: 'artist',
                    popularity: 10,
                    albums: ['album1', 'album2'],
                    songs: ['Song1', 'Song2'],
                    __v: 2,
                    genres: ['genre1'],
                    imageLink: 'link'
                },
                {
                    _id: '3',
                    name: 'artist3',
                    type: 'artist',
                    popularity: 50,
                    albums: ['album1', 'album2'],
                    songs: ['Song1', 'Song2'],
                    __v: 3,
                    genres: ['genre1'],
                    imageLink: 'link'
                }];
            const ids = ['1', '2', '3'];

            service.getArtistsByIds(ids).subscribe(artists => {
                expect(artists).toBeDefined();
                expect(artists).toEqual(jasmine.any(Array));
                expect(artists[0]._id).toBe(ids[0]);
                expect(artists[1]._id).toBe(ids[1]);
                expect(artists[2]._id).toBe(ids[2]);
            });

            const req = httpMock.expectOne('api/artists/1,2,3');
            expect(req.request.method).toBe('GET');
            req.flush(answer);

            const isLoggedInReq = httpMock.expectOne('api/logged_in');
            isLoggedInReq.flush({});
        });
        it('Should return error if artists with given ID does not exist', () => {
            service.getArtistsByIds(['invalidID1', 'invalidID2']).subscribe((res: any) => {
                expect(res.failure.error.type).toBe('500');
            });

            const req = httpMock.expectOne('api/artists/invalidID1,invalidID2');
            expect(req.request.method).toBe('GET');
            req.error(new ErrorEvent('500'));

            const isLoggedInReq = httpMock.expectOne('api/logged_in');
            isLoggedInReq.flush({});

        });
    });
    describe('#getAlbum', () => {
        it('Should return an Observable<AlbumResponse>', () => {
            const answer = {
                _id: '1',
                name: 'album',
                imageLink: 'link',
                songs: ['song1', 'song2'],
                songsData: [{_id: 'song1'}, {_id: 'song2'}],
                artists: ['1', '2'],
                artistsData: [{_id: 'artist1'}]
            };
            const artistAnswer = [
                {
                    _id: '1',
                    name: 'artist1',
                    type: 'artist',
                    popularity: 90,
                    albums: ['album1', 'album2'],
                    songs: ['Song1', 'Song2'],
                    __v: 1,
                    genres: ['genre1'],
                    imageLink: 'link'
                }];

            const id = '1';
            service.getAlbum(id).subscribe(album => {
                expect(album).toBeDefined();
                expect(album).toEqual(jasmine.any(Object));
                expect(album.name).toBe('album');
                expect(album._id).toBe(id);
                expect(album.artistsData[0]._id).toBe(id);
            });

            const req = httpMock.expectOne('api/album/' + id);
            expect(req.request.method).toBe('GET');
            req.flush(answer);

            const req2 = httpMock.expectOne('api/artists/' + answer.artists.join(','));
            expect(req2.request.method).toBe('GET');
            req2.flush(artistAnswer);

            const isLoggedInReq = httpMock.expectOne('api/logged_in');
            isLoggedInReq.flush({});
        });
        it('Should return a 500 error if id of album does not exists in database', () => {
            const id = 'invalidID';
            service.getAlbum(id).subscribe((res: any) => {
                expect(res.failure.error.type).toBe('500');
            });

            const req = httpMock.expectOne('api/album/' + id);
            expect(req.request.method).toBe('GET');
            req.error(new ErrorEvent('500'));

            const isLoggedInReq = httpMock.expectOne('api/logged_in');
            isLoggedInReq.flush({});
        });
    });

    describe('#getArtist', () => {
        it('Should return an Observable<ArtistResponse>', () => {
            const id = 'id';
            const answer = {
                _id: id,
                name: 'artist1',
                type: 'artst',
                popularity: 90,
                albums: ['album1', 'album2'],
                songs: ['Song1', 'Song2'],
                __v: 1,
                genres: ['genre1'],
                imageLink: 'link'
            };
            service.getArtist(id).subscribe(artist => {
                expect(artist).toBeDefined();
                expect(artist).toEqual(jasmine.any(Object));
                expect(artist._id).toBe(id);
                expect(artist.name).toBe('artist1');
                expect(artist.popularity).toBe(90);
            });
            const req = httpMock.expectOne('api/artist/' + id);
            expect(req.request.method).toBe('GET');
            req.flush(answer);

            const isLoggedInReq = httpMock.expectOne('api/logged_in');
            isLoggedInReq.flush({});
        });
        it('Should return an 500 error if ID is not in the database', () => {
            const id = 'invalidID';
            service.getArtist(id).subscribe((res: any) => {
                expect(res.failure.error.type).toBe('500');
            });

            const req = httpMock.expectOne('api/artist/' + id);
            expect((req.request.method)).toBe('GET');
            req.error(new ErrorEvent('500'));

            const isLoggedInReq = httpMock.expectOne('api/logged_in');
            isLoggedInReq.flush({});
        });
    });

    describe('#getSong', () => {
        it('Should return an Observable<SongResponse>', () => {
            const id = '1';
            const answer = {
                _id: id,
                name: 'song1',
                album: 'album',
                duration: [4, 11],
                albumData: {},
                artists: ['artist1', 'artist2']
            };
            service.getSong(id).subscribe(artist => {
                expect(artist).toBeDefined();
                expect(artist).toEqual(jasmine.any(Object));
                expect(artist._id).toBe(id);

            });
            const req = httpMock.expectOne('api/song/' + id);
            expect(req.request.method).toBe('GET');
            req.flush(answer);

            const isLoggedInReq = httpMock.expectOne('api/logged_in');
            isLoggedInReq.flush({});
        });
        it('Should return a 500 error when searching for song with _id not in database', () => {
            const id = 'invalidID';
            service.getSong(id).subscribe((res: any) => {
                expect(res.failure.error.type).toBe('500');
            });

            const req = httpMock.expectOne('api/song/' + id);
            expect(req.request.method).toBe('GET');
            req.error(new ErrorEvent('500'));

            const isLoggedInReq = httpMock.expectOne('api/logged_in');
            isLoggedInReq.flush({});
        });
    });
    describe('#getFavoriteGenres', () => {
        it('Should return a Observable<GenreResonse[]>', () => {
            const answer = [{
                _id: 'genre1'
            }, {
                _id: 'genre2'
            }];
            service.getFavoriteGenres().subscribe(genres => {
                expect(genres).toBeDefined();
                expect(genres).toEqual(jasmine.any(Array));
                expect(genres.length).toEqual(2);
                expect(genres[0]._id).toEqual('genre1');
                expect(genres[1]._id).toEqual('genre2');
            });

            const req = httpMock.expectOne('api/aggregate_genres');
            req.flush(answer);

            const isLoggedInReq = httpMock.expectOne('api/logged_in');
            isLoggedInReq.flush({});
        });
        it('Should return a 500 error if no favorite genres', () => {
            service.getFavoriteGenres().subscribe((res: any) => {
                expect(res.failure.error.type).toBe('500');
            });
            const req = httpMock.expectOne('api/aggregate_genres');
            req.error(new ErrorEvent('500'));

            const isLoggedInReq = httpMock.expectOne('api/logged_in');
            isLoggedInReq.flush({});
        });
        it('Should return an 401 error if the user is not authorized', () => {
            service.getFavoriteGenres().subscribe((res: any) => {
                expect(res.failure.error.type).toBe('401');
            });
            const req = httpMock.expectOne('api/aggregate_genres');
            req.error(new ErrorEvent('401'));

            const isLoggedInReq = httpMock.expectOne('api/logged_in');
            isLoggedInReq.flush({});
        });
    });

    describe('#getSongs', () => {
        it('Should return an Observable<SongResponse[]', () => {
            const answer = [
                {
                    name: 'song1',
                    album: 'album1'
                },
                {
                    name: 'song2',
                    album: 'album2'

                }
            ];
            service.getSongs('song', 2, 0, 'filter', 'value', 'sort', 'type').subscribe(songs => {
                expect(songs).toBeDefined();
                expect(songs).toEqual(jasmine.any(Array));
                expect(songs.length).toBe(2);
                expect(songs[0].name).toEqual('song1');
            });
            const req = httpMock.expectOne('api/songs/song/sort/type/filter/value/0/2');
            expect(req.request.method).toEqual('GET');
            req.flush(answer);


            const req2 = httpMock.expectOne('api/album/album1');
            expect(req2.request.method).toEqual('GET');
            req2.flush({artists: ['1', '2']});

            const req3 = httpMock.expectOne('api/album/album2');
            expect(req3.request.method).toEqual('GET');
            req3.flush({artists: ['1']});


            const req4 = httpMock.expectOne('api/artists/1,2');
            expect(req4.request.method).toEqual('GET');
            req4.flush({});

            const req5 = httpMock.expectOne('api/artists/1');
            expect(req5.request.method).toEqual('GET');
            req5.flush({});

            const isLoggedInReq = httpMock.expectOne('api/logged_in');
            isLoggedInReq.flush({});
        });
    });
    describe('#getSongsByIds', () => {
        it('Should return an Observable<SongResponse[]>', () => {
            const ids = ['1', '2', '3'];
            const answer = [
                {
                    _id: '1',
                    name: 'song1'

                },
                {
                    _id: '2',
                    name: 'song2'
                },
                {
                    _id: '3',
                    name: 'song2'
                }
            ];
            service.getSongsByIds(ids).subscribe(songs => {
                expect(songs).toBeDefined();
                expect(songs).toEqual(jasmine.any(Array));
                expect(songs.length).toEqual(3);
            });

            const req = httpMock.expectOne('api/songs/' + ids.join(','));
            expect(req.request.method).toEqual('GET');
            req.flush(answer);

            const isLoggedInReq = httpMock.expectOne('api/logged_in');
            isLoggedInReq.flush({});
        });

        it('Should return 500 error if IDs not in database', () => {
            const invalidIDs = ['invalid1', 'invalid2'];
            service.getSongsByIds(invalidIDs).subscribe((res: any) => {
                expect(res.failure.error.type).toBe('500');
            });
            const req = httpMock.expectOne('api/songs/' + invalidIDs.join(','));
            req.error(new ErrorEvent('500'));

            const isLoggedInReq = httpMock.expectOne('api/logged_in');
            isLoggedInReq.flush({});
        });

        it('Should return 401 if not authorized', () => {
            const ids = ['1', '2'];
            service.getSongsByIds(ids).subscribe((res: any) => {
                expect(res.failure.error.type).toBe('401');
            });
            const req = httpMock.expectOne('api/songs/' + ids.join(','));
            req.error(new ErrorEvent('401'));

            const isLoggedInReq = httpMock.expectOne('api/logged_in');
            isLoggedInReq.flush({});
        });
    });
    describe('#getSongsByIdsWithAlbums', () => {
        it('Should return an Observable<SongResponse[]>', () => {
            const answer = [
                {
                    _id: '1',
                    name: 'song1',
                    album: 'album1'
                },
            ];

            service.getSongsByIdsWithAlbums(['1']).subscribe(songs => {
                expect(songs).toBeDefined();
                expect(songs).toEqual(jasmine.any(Array));
                expect(songs.length).toEqual(1);
            });

            const req = httpMock.expectOne('api/songs/1');
            expect(req.request.method).toEqual('GET');
            req.flush(answer);

            const req2 = httpMock.expectOne('api/album/album1');
            expect(req2.request.method).toEqual('GET');
            req2.flush({});

            const isLoggedInReq = httpMock.expectOne('api/logged_in');
            isLoggedInReq.flush({});
        });
        it('Should return a 500 error if an invalid ID is searched for', () => {
            service.getSongsByIdsWithAlbums(['invalidID']).subscribe((res: any) => {
                expect(res.failure.error.type).toBe('500');
            });
            const req = httpMock.expectOne('api/songs/invalidID');
            req.error(new ErrorEvent('500'));

            const isLoggedInReq = httpMock.expectOne('api/logged_in');
            isLoggedInReq.flush({});
        });
        it('Should return 401 if not authorized', () => {
            const ids = ['1', '2'];
            service.getSongsByIdsWithAlbums(ids).subscribe((res: any) => {
                expect(res.failure.error.type).toBe('401');
            });
            const req = httpMock.expectOne('api/songs/' + ids.join(','));
            req.error(new ErrorEvent('401'));

            const isLoggedInReq = httpMock.expectOne('api/logged_in');
            isLoggedInReq.flush({});
        });
    });
    describe('#getAlbumsByIds', () => {
        it('Should return an Observable<AlbumResponse[]>', () => {
            const ids = ['1', '2', '3'];
            service.getAlbumsByIds(ids).subscribe(albums => {
                expect(albums).toBeDefined();
                expect(albums).toEqual(jasmine.any(Array));
                expect(albums.length).toEqual(3);
            });

            const req = httpMock.expectOne('api/albums/' + ids.join(','));
            req.flush([{}, {}, {}]);

            const isLoggedInReq = httpMock.expectOne('api/logged_in');
            isLoggedInReq.flush({});
        });
        it('Should return a 500 error if an invalid ID is searched for', () => {
            service.getAlbumsByIds(['invalidID']).subscribe((res: any) => {
                expect(res.failure.error.type).toBe('500');
            });
            const req = httpMock.expectOne('api/albums/invalidID');
            req.error(new ErrorEvent('500'));

            const isLoggedInReq = httpMock.expectOne('api/logged_in');
            isLoggedInReq.flush({});
        });
        it('Should return 401 if not authorized', () => {
            const ids = ['1', '2'];
            service.getAlbumsByIds(ids).subscribe((res: any) => {
                expect(res.failure.error.type).toBe('401');
            });
            const req = httpMock.expectOne('api/albums/' + ids.join(','));
            req.error(new ErrorEvent('401'));

            const isLoggedInReq = httpMock.expectOne('api/logged_in');
            isLoggedInReq.flush({});
        });
    });
    describe('#getAlbums', () => {
        it('Should return an Observable<AlbumResonse[]>', () => {
            service.getAlbums('album', 2, 0, 'filter', 'value', 'sort', 'type').subscribe(albums => {
                expect(albums).toBeDefined();
                expect(albums).toEqual(jasmine.any(Array));
            });

            const req = httpMock.expectOne('api/albums/album/sort/type/filter/value/0/2');
            expect(req.request.method).toEqual('GET');
            req.flush([{artists: ['artist1'], songs: ['song1']}]);

            const req2 = httpMock.expectOne('api/artists/artist1');
            req2.flush([{}]);

            const req3 = httpMock.expectOne(('api/songs/song1'));
            req3.flush([{}]);
            const isLoggedInReq = httpMock.expectOne('api/logged_in');
            isLoggedInReq.flush({});
        });
        it('Should return 401 if not authorized', () => {
            service.getAlbums('album', 2, 0, 'filter', 'value', 'sort', 'type').subscribe((res: any) => {
                expect(res.failure.error.type).toBe('401');
            });
            const req = httpMock.expectOne('api/albums/album/sort/type/filter/value/0/2');
            req.error(new ErrorEvent('401'));

            const isLoggedInReq = httpMock.expectOne('api/logged_in');
            isLoggedInReq.flush({});
        });
    });
    describe('#getUser', () => {
        it('Should return an Observable<UserResponse>', () => {
            service.getUser().subscribe(user => {
                expect(user).toBeDefined();
                expect(user).toEqual(jasmine.any(Object));
            });

            const req = httpMock.expectOne('api/user');
            expect(req.request.method).toEqual('GET');
            req.flush({favorite_artists: ['1']});

            const req2 = httpMock.expectOne('api/artists/1');
            expect(req2.request.method).toEqual('GET');
            req2.flush([{}]);

            const isLoggedInReq = httpMock.expectOne('api/logged_in');
            isLoggedInReq.flush({});
        });
    });
    describe('#getSearchHistory', () => {
        it('Should return an Observable<SearchHistoryResponse[]>', () => {
            service.getSearchHistory().subscribe(searchHistory => {
                expect(searchHistory).toBeDefined();
                expect(searchHistory).toEqual(jasmine.any(Object));
            });

            const req = httpMock.expectOne('api/search_history');
            req.flush([{}]);

            const isLoggedInReq = httpMock.expectOne('api/logged_in');
            isLoggedInReq.flush({});
        });
    });
    describe('#getSearchHistoryData', () => {
        it('Should return an Observable<SearchHistoryData>', () => {
            service.getSearchHistoryData().subscribe(searchHistoryData => {
                expect(searchHistoryData).toBeDefined();
                expect(searchHistoryData).toEqual(jasmine.any(Object));
            });

            const req = httpMock.expectOne('api/search_history_data');
            req.flush({});

            const isLoggedInReq = httpMock.expectOne('api/logged_in');
            isLoggedInReq.flush({});
        });
    });
    describe('#getSchemaById', () => {
        it('Should return an Observable<AlbumResponse> if input type is album', () => {
            const album = {
                _id: '1',
                name: 'album',
                imageLink: 'link',
                songs: ['song1'],
                songsData: [{}],
                artists: ['artist1'],
                artistsData: [{}]
            };
            service.getSchemaById('album', '1').subscribe(album => {
                expect(album).toBeDefined();
                expect(album.name).toBe('album');
            });

            const req = httpMock.expectOne('api/album/1');
            expect(req.request.method).toBe('GET');
            req.flush(album);

            const req2 = httpMock.expectOne('api/artists/artist1');
            req2.flush([{}]);

            const isLoggedInReq = httpMock.expectOne('api/logged_in');
            isLoggedInReq.flush({});
        });
        it('Should return an Observable<SongResponse> if input type is song', () => {
            const song = {
                _id: '1',
                name: 'song',
                album: 'album',
                duration: [3, 11],
                albumData: [{}],
                artists: ['artist1']
            };
            service.getSchemaById('song', '1').subscribe(song => {
                expect(song).toBeDefined();
                expect(song.name).toBe('song');
            });

            const req = httpMock.expectOne('api/song/1');
            expect(req.request.method).toBe('GET');
            req.flush(song);

            const isLoggedInReq = httpMock.expectOne('api/logged_in');
            isLoggedInReq.flush({});

        });
        it('Should return an Observable<ArtistResponse> if input type is artist', () => {
            const artist = {
                _id: '1',
                name: 'artist',
                popularity: 90,
                imageLink: 'link',
                songs: ['song1'],
                albums: ['album1']

            };
            service.getSchemaById('artist', '1').subscribe(artist => {
                expect(artist).toBeDefined();
                expect(artist).toEqual(jasmine.any(Object));
                expect(artist.name).toBe('artist');
            });

            const req = httpMock.expectOne('api/artist/1');
            expect(req.request.method).toBe('GET');
            req.flush(artist);

            const isLoggedInReq = httpMock.expectOne('api/logged_in');
            isLoggedInReq.flush({});
        });
    });
});
