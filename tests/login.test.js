import supertest from 'supertest';
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';
import { valid, noPassword, noUsername } from './__mocks__';

chai.use(chaiHttp);
const api = supertest.agent(server);
const { expect } = chai;

describe('Log in endpoint', () => {
  it('should allow registered user to log in ', (done) => {
    api
      .post('/api/v1/user/login')
      .set('Connetion', 'keep alive')
      .set('Content-Type', 'application/json')
      .type('form')
      .send(valid)
      .end((err, res) => {
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
