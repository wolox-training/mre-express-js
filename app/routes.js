const { healthCheck } = require('./controllers/healthCheck');
const userController = require('./controllers/users');
const { userSchema } = require('./schemas/users');
const { existUserDB } = require('./middlewares/users');
const { validateBySchema } = require('./middlewares');

exports.init = app => {
  app.get('/health', healthCheck);
  app.post('/users', [validateBySchema(userSchema), existUserDB], userController.createUser);
};
