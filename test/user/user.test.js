const request = require('supertest');

const app = require('../../app');

const user = {
  name: 'Miguelangel',
  lastName: 'Rendon',
  email: 'miguelangel33@wolox.co',
  password: '12345567'
};

describe('post /users create User', () => {
  test('The creation user is succesfull', async done => {
    const createUsser = await request(app)
      .post('/users')
      .send(user)
      .set('Accept', 'application/json');

    expect(createUsser.statusCode).toBe(201);
    expect(createUsser.body).toMatch('Miguelangel');
    done();
  });

  test('The email exists in the database', async done => {
    const createUser = await request(app)
      .post('/users')
      .send(user)
      .set('Accept', 'application/json');

    expect(createUser.statusCode).toBe(201);

    const createSameUser = await request(app)
      .post('/users')
      .send(user)
      .set('Accept', 'application/json');

    expect(createSameUser.statusCode).toBe(409);
    expect(createSameUser.text).toMatch(
      '{"message":"This email already exists","internal_code":"data_exist_error"}'
    );
    done();
  });

  test('The password not comply the required', async done => {
    const userErroPassword = {
      ...user,
      password: '1234-'
    };
    const createUser = await request(app)
      .post('/users')
      .send(userErroPassword)
      .set('Accept', 'application/json');

    expect(createUser.statusCode).toBe(422);
    expect(createUser.text).toMatch(
      '{"message":{"password":{"value":"1234-","msg":"Password should be at least 8 characters","param":"password","location":"body"}},"internal_code":"schema_error"}'
    );
    done();
  });

  test('The send body is empty', async done => {
    const createUser = await request(app)
      .post('/users')
      .send()
      .set('Accept', 'application/json');
    expect(createUser.statusCode).toBe(409);
    done();
  });
});
