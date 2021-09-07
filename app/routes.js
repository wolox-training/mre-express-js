const { healthCheck } = require('./controllers/healthCheck');
const userController = require('./controllers/users');

exports.init = app => {
  app.get('/health', healthCheck);
  app.post('/users', userController.createUser);
};
