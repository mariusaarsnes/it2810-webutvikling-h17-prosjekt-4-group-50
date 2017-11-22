const request = require('request');
const base = 'http://localhost:8084/api';

/**
 * We have tried to write as simple and understandable tests as possible, therefore we feel that it is not necessary
 * to comment to much here. Generally, we try to fetch something from the database we know is there, or know is not
 * there and see if the result is as expected
 */

describe('API/ ', () => {

    describe('GET album/:id', () => {
        let data = {};
        let id = '4KSKlo7hBHhyH7rflC8KCO';
        beforeAll((done) => {
            request.get(base + '/album/' + id, (error, response, body) => {
                data.error = error;
                data.response = response;
                data.body = body;
                done();
            });
        });

        it('Should return 200 for valid ID', () => {
            expect(data.response.statusCode).toEqual(200);
        });
        it('Should return something, given a valid ID', () => {
            expect(data.body.length).toBeGreaterThan(2);

        });
        it('Should return an object, given valid ID ', () => {
            expect(JSON.parse(data.body)).toEqual(jasmine.any(Object));
        });
        it('Should return an album with ID equal to the id-paramter if ID is valid', () => {
            expect(JSON.parse(data.body)._id).toEqual(id);
        });
        it('Should return correct parameters', () => {
                let album = JSON.parse(data.body);

                // The returned parameters should be the same type as the mode in the album model.
                expect(album._id).toEqual(jasmine.any(String));
                expect(album.name).toEqual(jasmine.any(String));
                expect(album.imageLink).toEqual(jasmine.any(String));
                expect(album.artists).toEqual(jasmine.any(Array));
                expect(album.songs).toEqual(jasmine.any(Array));
            }
        );
        it('Should return empty body given invalid ID', done => {
            request.get(base + '/album/invalidID', (error, response, body) => {
                expect(JSON.parse(body)).toEqual({});
                done();
            })
        })
    });
    describe('GET albums/:ids', () => {
        let data = {};
        let ids = ['4KSKlo7hBHhyH7rflC8KCO', "77O5XatKhbhVk68sieBczA"];

        beforeAll((done) => {
            request.get(base + '/albums/' + ids.join(','), (error, response, body) => {
                data.error = error;
                data.response = response;
                data.body = body;
                done();
            });
        });
        it('Should return 200 for valid ID', () => {
            expect(data.response.statusCode).toEqual(200);
        });
        it('Should return something, given a valid IDs', () => {
            expect(data.body.length).toBeGreaterThan(0);
        });
        it('Should return a list, given valid IDs ', () => {
            expect(JSON.parse(data.body)).toEqual(jasmine.any(Array));
        });
        it('Should return a list of length equal to number of IDs searched for, given valid IDS', () => {
            expect(JSON.parse(data.body).length).toEqual(ids.length);
        });
        it('Should return correct albums given valid IDs', () => {
            expect(JSON.parse(data.body)[0]._id).toEqual(ids[0]);
            expect(JSON.parse(data.body)[1]._id).toEqual(ids[1]);
        });
        it('Should return a list with length equal to length of valid ids searched for, ' +
            'given a list containing both valid and invalid ids', (done) => {
            request.get(base + '/albums/' + 'invalidID1,' + ids.join(',') + ',invalidID2', (error, response, body) => {
                expect(JSON.parse(data.body).length).toEqual(ids.length);
                done();
            })
        });
        it('Should return correct parameters for each album', () => {
            let list = JSON.parse(data.body);

            for (let k = 1; k < list.length; k++) {
                expect(list[k]._id).toEqual(jasmine.any(String));
                expect(list[k].name).toEqual(jasmine.any(String));
                expect(list[k].imageLink).toEqual(jasmine.any(String));
                expect(list[k].artists).toEqual(jasmine.any(Array));
                expect(list[k].songs).toEqual(jasmine.any(Array));
            }
        })
    });
    describe('GET albums', () => {
        let data = {};
        beforeAll(done => {
            request.get(base + '/albums', (error, response, body) => {
                data.error = error;
                data.response = response;
                data.body = body;
                done();
            });
        });
        it('Should return 200 when finished fetching all albums', () => {
            expect(data.response.statusCode).toEqual(200);
        });
        it('Should return something', () => {
            expect(data.body.length).toBeGreaterThan(0);
        });
        it('Should return a list of albums', () => {
            let list = JSON.parse(data.body);
            expect(list).toEqual(jasmine.any(Array));

            for (let k = 0; k < list.length; k++) {
                expect(list[k]).toEqual(jasmine.any(Object));
            }
        });
        it('Should return correct parameters', () => {
            let list = JSON.parse(data.body);

            for (let k = 1; k < list.length; k++) {

                expect(list[k]._id).toEqual(jasmine.any(String));
                expect(list[k].name).toEqual(jasmine.any(String));
                expect(list[k].imageLink).toEqual(jasmine.any(String));
                expect(list[k].artists).toEqual(jasmine.any(Array));
                expect(list[k].songs).toEqual(jasmine.any(Array));
            }
        })
    });
    describe('GET artist/:id', () => {
        let data = {};
        let id = '7tYKF4w9nC0nq9CsPZTHyP';

        beforeAll(done => {
            request.get(base + '/artist/7tYKF4w9nC0nq9CsPZTHyP', (error, response, body) => {
                data.error = error;
                data.response = response;
                data.body = body;
                done();
            })
        });
        it('Should return 200 response', () => {
            expect(data.response.statusCode).toEqual(200);
        });
        it('Should return something given a valid ID', () => {
            expect(data.body.length).toBeGreaterThan(2);
        });
        it('Should return correct artist, given valid ID', () => {
            let artist = JSON.parse(data.body);
            expect(artist._id).toEqual(id);
        });
        it('Should return an object, given valid ID ', () => {
            expect(JSON.parse(data.body)).toEqual(jasmine.any(Object));
        });
        it('Should return an album with ID equal to the id-paramter if ID is valid', () => {
            expect(JSON.parse(data.body)._id).toEqual(id);
        });
        it('Should return correct parameters', () => {
                let artist = JSON.parse(data.body);

                expect(artist._id).toEqual(jasmine.any(String));
                expect(artist.name).toEqual(jasmine.any(String));
                expect(artist.genres).toEqual(jasmine.any(Array));
                expect(artist.imageLink).toEqual(jasmine.any(String));
                expect(artist.albums).toEqual(jasmine.any(Array));
                expect(artist.songs).toEqual(jasmine.any(Array));

            }
        );
        it('Should return empty body given invalid ID', done => {
            request.get(base + '/artist/invalidID', (error, response, body) => {
                expect(JSON.parse(body)).toEqual({});
                done();
            })
        })
    });
    describe('GET artists/:ids', () => {
        let data = {};
        let ids = ['1vCWHaC5f2uS3yhpwWbIA6', "7tYKF4w9nC0nq9CsPZTHyP"];

        beforeAll((done) => {
            request.get(base + '/artists/' + ids.join(','), (error, response, body) => {
                data.error = error;
                data.response = response;
                data.body = body;
                done();
            });
        });
        it('Should return 200 for valid ID', () => {
            expect(data.response.statusCode).toEqual(200);
        });
        it('Should return something, given a valid IDs', () => {
            expect(data.body.length).toBeGreaterThan(2);
        });
        it('Should return a list, given valid IDs ', () => {
            expect(JSON.parse(data.body)).toEqual(jasmine.any(Array));
        });
        it('Should return a list of length equal to number of IDs searched for, given valid IDS', () => {
            expect(JSON.parse(data.body).length).toEqual(ids.length);
        });
        it('Should return correct albums given valid IDs', () => {
            expect(JSON.parse(data.body)[0]._id).toEqual(ids[0]);
            expect(JSON.parse(data.body)[1]._id).toEqual(ids[1]);
        });
        it('Should return a list with length equal to length of valid ids searched for, ' +
            'given a list containing both valid and invalid ids', (done) => {
            request.get(base + '/artists/' + 'invalidID1,' + ids.join(',') + ',invalidID2', (error, response, body) => {
                expect(JSON.parse(data.body).length).toEqual(ids.length);
                done();
            })
        });
        it('Should return correct parameters for each album', () => {
            let list = JSON.parse(data.body);

            for (let k = 1; k < list.length; k++) {

                expect(list[k]._id).toEqual(jasmine.any(String));
                expect(list[k].name).toEqual(jasmine.any(String));
                expect(list[k].imageLink).toEqual(jasmine.any(String));
                expect(list[k].albums).toEqual(jasmine.any(Array));
                expect(list[k].songs).toEqual(jasmine.any(Array));

            }
        })
    });
    describe('GET artists', () => {
        let data = {};
        beforeAll(done => {
            request.get(base + '/artists', (error, response, body) => {
                data.error = error;
                data.response = response;
                data.body = body;
                done();
            });
        });
        it('Should return 200 when finished fetching all albums', () => {
            expect(data.response.statusCode).toEqual(200);
        });
        it('Should return something', () => {
            expect(data.body.length).toBeGreaterThan(0);
        });
        it('Should return a list of albums', () => {
            let list = JSON.parse(data.body);
            expect(list).toEqual(jasmine.any(Array));

            for (let k = 0; k < list.length; k++) {
                expect(list[k]).toEqual(jasmine.any(Object));
            }
        });
        it('Should return correct parameters', () => {
            let list = JSON.parse(data.body);

            for (let k = 1; k < list.length; k++) {

                expect(list[k]._id).toEqual(jasmine.any(String));
                expect(list[k].name).toEqual(jasmine.any(String));
                expect(list[k].imageLink).toEqual(jasmine.any(String));
                expect(list[k].albums).toEqual(jasmine.any(Array));
                expect(list[k].songs).toEqual(jasmine.any(Array));
            }
        })
    });
    describe('GET song/:id', () => {
        let data = {};
        let id = '0Zbbxnx4SGGHoIow4PpISP';

        beforeAll(done => {
            request.get(base + '/song/0Zbbxnx4SGGHoIow4PpISP', (error, response, body) => {
                data.error = error;
                data.response = response;
                data.body = body;
                done();
            });
        });
        it('Should return 200 response', () => {
            expect(data.response.statusCode).toEqual(200);
        });
        it('Should return something given a valid ID', () => {
            expect(data.body.length).toBeGreaterThan(2);
        });
        it('Should return correct song, given valid ID', () => {
            let song = JSON.parse(data.body);
            expect(song._id).toEqual(id);
        });
        it('Should return an object, given valid ID ', () => {
            expect(JSON.parse(data.body)).toEqual(jasmine.any(Object));
        });
        it('Should return an song with ID equal to the id-paramter if ID is valid', () => {
            expect(JSON.parse(data.body)._id).toEqual(id);
        });
        it('Should return correct parameters', () => {
                let song = JSON.parse(data.body);
                expect(song._id).toEqual(jasmine.any(String));
                expect(song.name).toEqual(jasmine.any(String));
                expect(song.album).toEqual(jasmine.any(String));
                expect(song.artists).toEqual(jasmine.any(Array));

            }
        );
        it('Should return empty body given invalid ID', done => {
            request.get(base + '/song/invalidID', (error, response, body) => {
                expect(JSON.parse(body)).toEqual({});
                done();
            })
        })
    });
    describe('GET songs/:ids', () => {
        let data = {};
        let ids = ['08nYf4Aihtg013sLE8sloU', "3jmBryxkb6KDgqBDHIj9MZ"];

        beforeAll((done) => {
            request.get(base + '/songs/' + ids.join(','), (error, response, body) => {
                data.error = error;
                data.response = response;
                data.body = body;
                done();
            });
        });
        it('Should return 200 for valid ID', () => {
            expect(data.response.statusCode).toEqual(200);
        });
        it('Should return something, given a valid IDs', () => {
            expect(data.body.length).toBeGreaterThan(0);
        });
        it('Should return a list, given valid IDs ', () => {
            expect(JSON.parse(data.body)).toEqual(jasmine.any(Array));
        });
        it('Should return a list of length equal to number of IDs searched for, given valid IDS', () => {
            expect(JSON.parse(data.body).length).toEqual(ids.length);
        });
        it('Should return correct songs given valid IDs', () => {
            expect(JSON.parse(data.body)[0]._id).toEqual(ids[0]);
            expect(JSON.parse(data.body)[1]._id).toEqual(ids[1]);
        });
        it('Should return a list with length equal to length of valid ids searched for, ' +
            'given a list containing both valid and invalid ids', (done) => {
            request.get(base + '/songs/' + 'invalidID1,' + ids.join(',') + ',invalidID2', (error, response, body) => {
                expect(JSON.parse(data.body).length).toEqual(ids.length);
                done();
            })
        });
        it('Should return correct parameters for each song', () => {
            let list = JSON.parse(data.body);

            for (let k = 1; k < list.length; k++) {
                expect(list[k]._id).toEqual(jasmine.any(String));
                expect(list[k].name).toEqual(jasmine.any(String));
                expect(list[k].album).toEqual(jasmine.any(String));
                expect(list[k].artists).toEqual(jasmine.any(Array));
            }
        })
    });
    describe('GET songs', () => {
        let data = {};
        beforeAll(done => {
            request.get(base + '/songs', (error, response, body) => {
                data.error = error;
                data.response = response;
                data.body = body;
                done();
            });
        });
        it('Should return 200 when finished fetching all songs', () => {
            expect(data.response.statusCode).toEqual(200);
        });
        it('Should return something', () => {
            expect(data.body.length).toBeGreaterThan(0);
        });
        it('Should return a list of songs', () => {
            let list = JSON.parse(data.body);
            expect(list).toEqual(jasmine.any(Array));

            for (let k = 0; k < list.length; k++) {
                expect(list[k]).toEqual(jasmine.any(Object));
            }
        });
        it('Should return correct parameters', () => {
            let list = JSON.parse(data.body);

            for (let k = 1; k < list.length; k++) {

                expect(list[k]._id).toEqual(jasmine.any(String));
                expect(list[k].name).toEqual(jasmine.any(String));
                expect(list[k].album).toEqual(jasmine.any(String));
                expect(list[k].artists).toEqual(jasmine.any(Array));
            }
        })
    });
    describe(' POST Create_User', () => {
        let data = {};
        let username = 'testerUsername';
        let password = 'password';
        beforeAll(done => {
                request.post(base + '/create_user', {
                    json: true,
                    body: {username: username, password: password}
                }, (error, response, body) => {
                    data.error = error;
                    data.response = response;
                    data.body = body;
                    done();
                })
            }
        );
        afterAll(done => {
            request.post(base + '/delete_user', {
                json: true,
                body: {username: username}
            }, (error, response, body) => {
                expect(response.statusCode).toEqual(200);
                done();
            })
        });

        it('Should return status 200', () => {
            expect(data.response.statusCode).toEqual(200)
        });
        it('Should be new user in the database with given username', (done) => {
            request.post(base + '/create_user', {
                json: true,
                body: {username: username, password: password}
            }, (error, response, body) => {
                expect(response.statusCode).toEqual(202);
                expect(body.message).toEqual('This user already exists. Please try again with another username!');
                done();
            })
        })

    });
    describe('POST /delete_user', () => {
        let username = 'testerUsername';
        let password = 'password';

        beforeAll(done => {
            request.post(base + '/create_user', {
                json: true,
                body: {username: username, password: password}
            }, (error, response, body) => {
                expect(response.statusCode).toEqual(200);
                done();
            })
        });
        it('Should return status 200', done => {
            request.post(base + '/delete_user', {
                json: true,
                body: {username: username}
            }, (error, response, body) => {
                expect(response.statusCode).toEqual(200);
                done();
            })
        });
        it('Should not allow deletion of users that do not exists', done => {
            request.post(base + '/delete_user', {
                json: true,
                body: {username: 'nonExistingUser'}
            }, (error, response, body) => {
                expect(response.statusCode).toEqual(202);
                done();
            })
        })
    })

});
