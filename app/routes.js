const { healthCheck } = require('./controllers/healthCheck');
const userController = require('./controllers/users');
const { userSchema, userLoginSchema, getUser } = require('./schemas/users');
const { existUserDB } = require('./middlewares/users');
const { validateBySchema } = require('./middlewares/validateBySchema');
const { authValidator } = require('./middlewares/auth');

exports.init = app => {
  app.get('/health', healthCheck);
  app.get('/users', [validateBySchema(getUser)], authValidator, userController.getUsers);
  app.post('/users', [validateBySchema(userSchema), existUserDB], userController.createUser);
  app.post('/users/sessions', [validateBySchema(userLoginSchema)], userController.loginUser);
};
