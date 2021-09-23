const { healthCheck } = require('./controllers/healthCheck');
const userController = require('./controllers/users');
const { userSchema, userLoginSchema } = require('./schemas/users');
const { existUserDB } = require('./middlewares/users');
const { validateBySchema } = require('./middlewares/validateBySchema');

exports.init = app => {
  app.get('/health', healthCheck);
  app.post('/users', [validateBySchema(userSchema), existUserDB], userController.createUser);
  app.post('/users/sessions', [validateBySchema(userLoginSchema)], userController.loginUser);
};
