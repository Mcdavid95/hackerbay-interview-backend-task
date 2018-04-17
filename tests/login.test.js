import supertest from 'supertest';
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';
import {
  valid,
  noPassword,
  bookData,
  noAuthor,
  noUsername,
  thumbnailData,
  noDescription
} from './__mocks__';

chai.use(chaiHttp);
const api = supertest.agent(server);
const { expect } = chai;
let token;

describe('Log in endpoint', () => {
  it('should allow registered user to log in ', (done) => {
    api
      .post('/api/v1/user/login')
      .set('Connetion', 'keep alive')
      .set('Content-Type', 'application/json')
      .type('form')
      .send(valid)
      .end((err, res) => {
        token = res.body.token;
        expect(res.status).to.deep.equal(201);
        expect(res.body.message).to.deep.equal(`Succesfully logged in as ${valid.username}`);
        done();
      });
  });

  it('should not allow user with empty username field to log in ', (done) => {
    api
      .post('/api/v1/user/login')
      .set('Connetion', 'keep alive')
      .set('Content-Type', 'application/json')
      .type('form')
      .send(noUsername)
      .end((err, res) => {
        expect(res.status).to.deep.equal(401);
        expect(res.body.message).to.deep.equal('Username field must not be empty');
        done();
      });
  });

  it('should not allow user with empty password field to log in ', (done) => {
    api
      .post('/api/v1/user/login')
      .set('Connetion', 'keep alive')
      .set('Content-Type', 'application/json')
      .type('form')
      .send(noPassword)
      .end((err, res) => {
        expect(res.status).to.deep.equal(401);
        expect(res.body.message).to.deep.equal('Password field must not be empty');
        done();
      });
  });
});

describe('Apply jsonPatch', () => {
  it('should not allow access if jwt token is not set to x-access-token key in header', (done) => {
    api
      .post('/api/v1/user/book')
      .set('Connetion', 'keep alive')
      .set('Content-Type', 'application/json')
      .type('form')
      .send(thumbnailData)
      .end((err, res) => {
        expect(res.status).to.deep.equal(403);
        expect(res.body.message).to.deep.equal('You have to be loggedin first');
        done();
      });
  });

  it('should return an error if title field is undefined', (done) => {
    api
      .post('/api/v1/user/book')
      .set('Connetion', 'keep alive')
      .set('Content-Type', 'application/json')
      .set('x-access-token', token)
      .type('form')
      .send(thumbnailData)
      .end((err, res) => {
        expect(res.status).to.deep.equal(401);
        expect(res.body.message).to.deep.equal('Title field must not be empty');
        done();
      });
  });

  it('should return an error if description field is undefined', (done) => {
    api
      .post('/api/v1/user/book')
      .set('Connetion', 'keep alive')
      .set('Content-Type', 'application/json')
      .set('x-access-token', token)
      .type('form')
      .send(noDescription)
      .end((err, res) => {
        expect(res.status).to.deep.equal(401);
        expect(res.body.message).to.deep.equal('Description field must not be empty');
        done();
      });
  });

  it('should return an error if author field is undefined', (done) => {
    api
      .post('/api/v1/user/book')
      .set('Connetion', 'keep alive')
      .set('Content-Type', 'application/json')
      .set('x-access-token', token)
      .type('form')
      .send(noAuthor)
      .end((err, res) => {
        expect(res.status).to.deep.equal(401);
        expect(res.body.message).to.deep.equal('Author field must not be empty');
        done();
      });
  });

  it('should successfully add a book', (done) => {
    api
      .post('/api/v1/user/book')
      .set('Connetion', 'keep alive')
      .set('Content-Type', 'application/json')
      .set('x-access-token', token)
      .type('form')
      .send(bookData)
      .end((err, res) => {
        expect(res.status).to.deep.equal(201);
        expect(res.body.message).to.deep.equal(`Book with title:- ${bookData.title} succesfully created`);
        done();
      });
  });
});

describe('Thumbnail endpoint', () => {
  it('should not create thumbnail if urlImage, or fileName fields are undefined', (done) => {
    api
      .post('/api/v1/user/image')
      .set('Connetion', 'keep alive')
      .set('Content-Type', 'application/json')
      .set('x-access-token', token)
      .type('form')
      .send(noAuthor)
      .end((err, res) => {
        expect(res.status).to.deep.equal(401);
        expect(res.body.message).to.deep.equal('urlImage and fileName fields must not be empty');
        done();
      });
  });

  xit('should successfully create thumbnail', (done) => {
    api
      .post('/api/v1/user/image')
      .set('Connetion', 'keep alive')
      .set('Content-Type', 'application/json')
      .set('x-access-token', token)
      .type('form')
      .send(thumbnailData)
      .end((err, res) => {
        expect(res.status).to.deep.equal(201);
        expect(res.body.message).to.deep.equal('Thumbnail created successfully');
        done();
      });
  });
});
