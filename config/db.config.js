require('dotenv').config({ path: `.env.${process.env.NODE_ENV || 'dev'}` });
const { Sequelize } = require('sequelize');

// console.log("database host ========> ",process.env.DB_HOST);
// console.log("database pass ========> ",process.env.DB_PASSWORD);
// console.log("database user ========> ",process.env.DB_USERNAME);
// console.log("database db ========> ",process.env.DB_NAME);

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
      host : process.env.DB_HOST,
      dialect : process.env.DB_DIALECT,
      logging : false,
  }, {
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
}
)

const connect_db = async function (app) {
  try {
    await sequelize.authenticate();
    app.emit('ready');
    console.log('Connection has been established successfully.');
  } catch (e) {
    console.error('Unable to connect to the database:', e);
    throw (e);
  }
}

module.exports = {
  sequelize,
  connect_db,
};