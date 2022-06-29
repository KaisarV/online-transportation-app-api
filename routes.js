const { registerUser, getUser, deleteUser } = require('./controller/user-handler');

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
  {
    method: 'DELETE',
    path: '/user/{userId}',
    handler: deleteUser,
  },
];

module.exports = routes;
