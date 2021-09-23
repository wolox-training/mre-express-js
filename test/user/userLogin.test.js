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

describe('post /users/sessions', () => {
  test('The Login user is succesfull', async done => {
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
    expect(loginUser.body.email).toMatch('miguelangel33@wolox.co');
    done();
  });

  test('The user email is not have tu company succesfull', async done => {
    const userLoginNotEmail = {
      email: 'miguelangel3@wolox.cl',
      ...userLogin
    };
    const loginUser = await request(app)
      .post('/users/sessions')
      .send(userLoginNotEmail)
      .set('Accept', 'application/json');

    expect(loginUser.statusCode).toBe(400);
    expect(loginUser.text).toMatch(
      '{"message":"Error due to incorrect access or password failure","internal_code":"data_not_found_error"}'
    );
    done();
  });

  test('The user password  is not have tu macth', async done => {
    const user = await request(app)
      .post('/users')
      .send(userCreate)
      .set('Accept', 'application/json');

    expect(user.statusCode).toBe(201);
    const userLoginNotPassword = {
      ...userLogin,
      password: '12321432'
    };
    const loginUser = await request(app)
      .post('/users/sessions')
      .send(userLoginNotPassword)
      .set('Accept', 'application/json');

    expect(loginUser.statusCode).toBe(400);
    expect(loginUser.text).toMatch(
      '{"message":"Error due to incorrect access or password failure","internal_code":"data_not_found_error"}'
    );
    done();
  });
});
