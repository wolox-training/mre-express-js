const request = require('supertest');

const app = require('../../app');

describe('Create User', () => {
  it('The creation user is succesfull', done => {
    request(app)
      .post('/users')
      .send({
        name: 'Miguelangel',
        lastName: 'Rendon',
        email: 'miguelangelRC@wolox.co',
        password: '12345'
      })
      .set('Accept', 'application/json')
      .expect(res => {
        res.body = 'Miguelangel';
      })
      .expect(201, 'miguelangel', done);
  });

  it('The password not comply the required', done => {
    request(app)
      .post('/users')
      .send({
        name: 'Miguelangel',
        lastName: 'Rendon',
        email: 'miguelangelRC@wolox.co',
        password: '12345'
      })
      .set('Accept', 'application/json')
      .expect(400, done);
  });
});
