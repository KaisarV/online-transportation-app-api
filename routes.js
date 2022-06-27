const { registerUser } = require('./controller/user-handler');

const routes = [
  {
    method: 'POST',
    path: '/users',
    handler: registerUser,
  },
];

module.exports = routes;
