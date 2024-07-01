const path = require("path");

module.exports = {
  development: {
    client: "mysql2",
    connection: {
      host: 'db',
      port: 3306,
      user: 'root',
      password: 'java',
      database: 'java_gym',
    },
    migrations: {
      directory: path.resolve(__dirname, "src", "database", "migrations")
    },
    seeds: {
      directory: path.resolve(__dirname, "src", "database", "seeds")
    },
    useNullAsDefault: true
  }
};
