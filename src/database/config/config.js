// eslint-disable-next-line no-undef
dotenv = require("dotenv");
// eslint-disable-next-line no-undef
dotenv.config();

const dialectOptions = {
  ssl: {
    host: process.env.INSTANCE_CONNECTION_NAME,
    ca: Buffer.from(process.env.POSTGRES_SSL_SERVER_CA || "", "base64"),
    key: Buffer.from(process.env.POSTGRES_SSL_CLIENT_KEY || "", "base64"),
    cert: Buffer.from(process.env.POSTGRES_SSL_CLIENT_CERT || "", "base64"),
    rejectUnauthorized: false,
    requestCert: true,
  },
  socketPath: process.env.DB_HOST,
};
const config = {
  development: {
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    host: process.env.DATABASE_HOST,
    dialect: "postgres",
    logging: false,
  },
  test: {
    username: "postgres",
    password: "password",
    database: "eca_mvp",
    host: "localhost",
    dialect: "postgres",
    logging: false,
  },
  production: {
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    host: process.env.DATABASE_HOST,
    dialect: "postgres",
    dialectOptions,
    logging: false,
  },
};

module.exports = config;
