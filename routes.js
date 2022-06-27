const { registerUser, getUser } = require('./controller/user-handler');

const routes = [
  {
    method: 'POST',
    path: '/users',
    handler: registerUser,
  },
  {
    method: 'GET',
    path: '/users',
    handler: getUser,
  },
];

module.exports = routes;
