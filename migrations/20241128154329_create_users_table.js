/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  await knex.schema.createTable("users", (table) => {
    table.increments("id").primary(); // Auto-incrementing ID
    table.string("username").notNullable(); // Username   required
    table.string("email").nullable(); // Email  optional
    table.string("password").notNullable(); // Password
    table.unique("email"); //
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  await knex.schema.dropTableIfExists("users");
}
