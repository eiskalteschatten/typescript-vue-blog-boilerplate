require('dotenv').config();

module.exports = {
  postgres: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    ssl: Boolean(process.env.DB_SSL),
  },
  redis: {
    url: process.env.REDIS_URL,
  },
  auth: {
    session: {
      secret: process.env.AUTH_SESSION_SECRET,
      salt: process.env.AUTH_SALT,
    },
  },
  jwt: {
    secret: process.env.JWT_SECRET || '',
    ttl: 3600, // seconds
    tempToken: {
      ttl: 172800, //seconds
      secret: process.env.JWT_TEMP_TOKEN_SECRET || '',
    },
    refreshToken: {
      ttl: 604800, // seconds
      secret: process.env.JWT_REFRESH_TOKEN_SECRET || '',
    },
  },
};
