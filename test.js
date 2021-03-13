const assert = require('chai').assert;
const app = require('../app');
const request = require('supertest');

describe('Get requests',() => {
    it('app should return Welcome to the API', (done) => {
        request(app).get('/api').expect(200).end( (err,res) => {
            assert(res.body.message, "Welcome to the API");
        });
        done();
    });
});

describe('Post(login) requests',() => {
    it('login should be successful with no username or password', (done) => {
        request(app).post('/api/login').send({username:"",password:{}}).expect(200,done);
    });
    it('login should be successful with username and a password', (done) => {
        request(app).post('/api/login').send({username:"ish",password:"12"}).expect(200,done);
    });
    it('login should be successful with a username but no password', (done) => {
        request(app).post('/api/login').send({username:"ish",password:""}).expect(200,done);
    });
    it('login should be successful with no username but a password', (done) => {
        request(app).post('/api/login').send({username:"",password:"12"}).expect(200,done);
    });
});

describe('Post(login) requests',() => {
    it('login should be successful with no username or password', (done) => {
        request(app).post('/api/login').send({username:"",password:{}}).expect(200,done);
    });
    it('login should be successful with username and a password', (done) => {
        request(app).post('/api/login').send({username:"ish",password:"12"}).expect(200,done);
    });
    it('login should be successful with a username but no password', (done) => {
        request(app).post('/api/login').send({username:"ish",password:""}).expect(200,done);
    });
    it('login should be successful with no username but a password', (done) => {
        request(app).post('/api/login').send({username:"",password:"12"}).expect(200,done);
    });
});

describe('Post(jsonpatching) requests',() => {
    var token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7fSwiaWF0IjoxNTQ5ODA4Nzg5fQ.HO3sd27kkFhq8AoF3w4wjBWre8ZbyP4FU0xHbVhthpw";
    var jsonFile = { "jsonObject" :{"foo": "bar", "baz": "qux"}, "jsonPatch" :[ {"op": "replace","path": "/baz", "value": "boo"}]};
    var result = { "Patched": {"foo": "bar","baz": "boo"} };
    it('unsuccessful patch without auth', (done) => {
        request(app).post('/api/jsonpatch').send(jsonFile).expect(403,done);
    });
    it('unsuccessful patch with incorrect auth', (done) => {
        request(app).post('/api/jsonpatch').set({Authorization: token+"23"}).send(jsonFile).expect(403,done);
    });
    it('successful patch with auth', (done) => {
        request(app).post('/api/jsonpatch').set({Authorization: token}).send(jsonFile).expect(200,done);
    });
});

describe('Post(thumbnail creation) requests',() => {
    var token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7fSwiaWF0IjoxNTQ5ODA4Nzg5fQ.HO3sd27kkFhq8AoF3w4wjBWre8ZbyP4FU0xHbVhthpw";
    var jsonFile = { "url" : "https://cdn.pixabay.com/photo/2017/02/24/00/13/png-2093542_960_720.png"};
    var jsonFile2 = { "url" : "https://cdn.pixabay.com/photo/2017/02/24/00/13/png-2093542_960_720.txt"};
    it('unsuccessful thumbnail creation without auth', (done) => {
        request(app).post('/api/image').send(jsonFile).expect(403,done);
    });
    it('unsuccessful thumbnail creation with incorrect auth', (done) => {
        request(app).post('/api/image').set({Authorization: token+"23"}).send(jsonFile).expect(403,done);
    });
    it('unsuccessful thumbnail creation with incorrect file format', (done) => {
        request(app).post('/api/image').set({Authorization: token }).send(jsonFile2).expect(403,done);
    });
    it('successful thumbnail creation with auth', (done) => {
        request(app).post('/api/image').set({Authorization: token}).send(jsonFile).expect(200,done);
    });
});