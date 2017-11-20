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


    describe('#getArtits', () => {
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
                    expect(artists.length).toBe(2);
                    expect(artists[0].name).toBe('artist1');
                    expect(artists[1].name).toBe('artist2');
                });

            const req = httpMock.expectOne('api/artists/' +
                'artist' + '/' + 'asc' + '/' + 'type' + '/' + 'artist' + '/' +
                'value' + '/' + '0' + '/' + '2');
            expect(req.request.method).toBe('GET');
            req.flush(answer);
        });
    });
    describe('#getArtistsByIds', () => {
        /*
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
                expect(artists[0]._id).toBe(ids[0]);
                expect(artists[1]._id).toBe(ids[1]);
                expect(artists[2]._id).toBe(ids[2]);
            });

            const req = httpMock.expectOne('api/artists/1,2,3');
            expect(req.request.method).toBe('GET');
            req.flush(answer);
        });
        */
        it('Should return error if artists with given ID does not exist', (done) => {
            service.getArtistsByIds(['invalidID1', 'invalidID2']).subscribe((res: any) => {
                expect(res.failure.error.type).toBe('500');
                done();
            });

            const req = httpMock.expectOne('api/artists/invalidID1,invalidID2');
            expect(req.request.method).toBe('GET');
            req.error(new ErrorEvent('500'));

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
            service.getAlbum('1').subscribe(album => {
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
                expect(artist._id).toBe(id);
                expect(artist.name).toBe('artist1');
                expect(artist.popularity).toBe(90);
            });
            const req = httpMock.expectOne('api/artist/' + id);
            expect(req.request.method).toBe('GET');
            req.flush(answer);
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
                expect(artist._id).toBe(id);
            });
            const req = httpMock.expectOne('api/song/' + id);
            expect(req.request.method).toBe('GET');
            req.flush(answer);
        });
    });
});
