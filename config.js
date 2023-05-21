require('dotenv').config();

const {
  JWT_SECRET,
  DB_ADRESS,
  NODE_ENV,
} = process.env;

module.exports = {
  JWT_SECRET: NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
  DB_ADRESS: NODE_ENV === 'production' ? DB_ADRESS : 'mongodb://127.0.0.1:27017/bitfilmsdb',
};
