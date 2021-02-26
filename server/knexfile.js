// const { database, username, password } = require(__dirname +
//   "server/config/dbConfig");
const { knexSnakeCaseMappers } = require("objection");

module.exports = {
  development: {
    client: "pg",
    connection: {
      database: "planday_solution",
      username: "decka",
      password: "",
    },
  },

  // production: {
  //   client: 'mysql',
  //   connection: process.env.JAWSDB_URL,
  //   migrations: {
  //     directory: __dirname + '/migrations'
  //   },
  //   seeds: {
  //     directory: __dirname + '/seeds'
  //   }
  // },

  ...knexSnakeCaseMappers(),
};
