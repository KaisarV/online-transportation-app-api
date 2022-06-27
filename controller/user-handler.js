const db = require('../config/db_config');

const registerUser = (request, h) => {
  const {
    firstName, lastName, email, password, loan,
  } = request.payload;

  const sql = `INSERT INTO  users(firstname, lastname, email, password, loan) VALUES (${firstName}, '${lastName}', '${email}', '${password}', ${loan})`;

  let response = null;
  let resolvedFlag = true;

  const insertData = () => new Promise((resolve, reject) => {
    let error;
    db.query(sql, (err, result) => {
      if (err) {
        response = h.response({
          status: 'error',
          message: 'failed to register user, please try again later',
        });
        response.code = 500;
        error = err;
        resolvedFlag = false;
      } else {
        response = h.response({
          status: 'success',
          message: 'success register user',
        });
        response.code = 201;
      }
    });

    setTimeout(() => {
      if (resolvedFlag) {
        resolve('Resolve');
      } else {
        reject(error);
      }
    }, 2000);
  });

  return (
    insertData()
      .then(() => response)
      .catch((error) => {
        console.log(error);
        return response;
      })
  );
};

module.exports = { registerUser };
