import "dotenv/config";

/**
 * @type { import("knex").Knex.Config }
 */
export default {
  client: "mysql2",
  connection: {
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  },
  pool: {
    min: 2, // Minimum number of connections
    max: 10, // Maximum number of connections
  },
};
