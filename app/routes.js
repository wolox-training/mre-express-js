const { healthCheck } = require('./controllers/healthCheck');
const userController = require('./controllers/users');
const { userSchema } = require('./schemas/users');
const { validateBySchema } = require('./middlewares/users');

exports.init = app => {
  app.get('/health', healthCheck);
  app.post('/users', [validateBySchema(userSchema)], userController.createUser);
};
