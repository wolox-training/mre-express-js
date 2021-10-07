const request = require('supertest');
const app = require('../../app');

const userCreate = {
  name: 'Miguelangel',
  lastName: 'Rendon',
  email: 'miguelangel33@wolox.co',
  password: '12345567'
};

const userLogin = {
  email: 'miguelangel33@wolox.co',
  password: '12345567'
};

describe('Get /users', () => {
  test('The get all users', async done => {
    const user = await request(app)
      .post('/users')
      .send(userCreate)
      .set('Accept', 'application/json');

    expect(user.statusCode).toBe(201);

    const loginUser = await request(app)
      .post('/users/sessions')
      .send(userLogin)
      .set('Accept', 'application/json');

    expect(loginUser.statusCode).toBe(200);

    const getUsers = await request(app)
      .get('/users')
      .query({ page: 1, limit: 3 })
      .set('Authorization', `Bearer ${loginUser.body}`)
      .set('Accept', 'application/json');

    expect(getUsers.statusCode).toBe(200);
    done();
  });
});

describe('Get /users', () => {
  test('Erro get all userd params ', async done => {
    const user = await request(app)
      .post('/users')
      .send(userCreate)
      .set('Accept', 'application/json');

    expect(user.statusCode).toBe(201);

    const loginUser = await request(app)
      .post('/users/sessions')
      .send(userLogin)
      .set('Accept', 'application/json');

    expect(loginUser.statusCode).toBe(200);

    const getUsers = await request(app)
      .get('/users')
      .set('Authorization', `Bearer ${loginUser.body}`)
      .set('Accept', 'application/json');
    expect(getUsers.statusCode).toBe(422);
    done();
  });
});
