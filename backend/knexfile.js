import dotenv from 'dotenv';

dotenv.config();

const config = {
  development: {
    client: 'pg',
    connection: {
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT || 5432,
      user: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    },
    migrations: {
      directory: './migrations',
      extension: 'js',
    },
    seeds: {
      directory: './seeds',
      extension: 'js',
    },
  },
  production: {
    client: 'pg',
    connection: {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      ssl: true,
    },
    pool: {
      min: parseInt(process.env.DB_POOL_MIN || '5', 10),
      max: parseInt(process.env.DB_POOL_MAX || '20', 10),
    },
    migrations: {
      directory: './migrations',
      extension: 'js',
    },
    seeds: {
      directory: './seeds',
      extension: 'js',
    },
  },
};

export default config;
