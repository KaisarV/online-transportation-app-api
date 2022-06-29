const db = require('../config/db_config');

const registerUser = (request, h) => {
  const {
    firstName, lastName, email, password, loan,
  } = request.payload;

  const sql = `INSERT INTO  users(firstname, lastname, email, password, loan) VALUES ('${firstName}', '${lastName}', '${email}', '${password}', ${loan})`;

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
        response.code = 400;
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

  return insertData()
    .then(() => response)
    .catch((error) => {
      console.log(error);
      return response;
    });
};

const getUser = (request, h) => {
  const sql = 'SELECT * FROM users';

  const listUser = [];
  let data;
  const resolvedFlag = true;
  let response;

  const getData = () => new Promise((resolve, reject) => {
    let error;
    db.query(sql, (err, result) => {
      if (err) throw err;
      result.forEach((user) => {
        data = {
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
        };

        listUser.push(data);
      });
    });
    setTimeout(() => {
      if (resolvedFlag) {
        response = h.response({
          status: 'Success',
          message: 'Success get data',
          data: listUser,
        });
        response.code = 201;
        resolve('Resolve');
      } else {
        reject(error);
      }
    }, 2000);
  });

  return getData()
    .then(() => response)
    .catch((error) => {
      console.log(error);
      return response;
    });
};

const deleteUser = (request, h) => {
  const { userId } = request.params;
  const sql = `DELETE FROM users WHERE id = ${userId}`;

  let resolvedFlag = true;
  let response;

  const deleteData = () => new Promise((resolve, reject) => {
    let error;
    db.query(sql, (err, result) => {
      if (err) {
        response = h.response({
          status: 'Error',
          message: 'Failed delete user',
        });
        response.code = 400;
        console.log(err);
        resolvedFlag = false;
      } else {
        response = h.response({
          status: 'Success',
          message: 'Success delete user',
        });
        response.code = 201;
      }
    });

    setTimeout(() => {
      if (resolvedFlag) {
        resolve(response);
      } else {
        reject(response);
      }
    }, 2000);
  });

  return deleteData()
    .then(() => response)
    .catch((error) => {
      console.log(error);
      return response;
    });
};

module.exports = { registerUser, getUser, deleteUser };
