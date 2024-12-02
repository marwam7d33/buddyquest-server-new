/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  await knex.schema.createTable("matchmaking", (table) => {
    table.increments("id").primary(); // Auto-incrementing ID
    table.integer("user_id").unsigned().notNullable(); // Foreign key to 'users'
    table.integer("partner_id").unsigned().notNullable(); // Another foreign key to 'users'
    table.integer("habit_id").unsigned().notNullable(); // Foreign key to 'habits'

    table
      .foreign("user_id")
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");
    table
      .foreign("partner_id")
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");
    table
      .foreign("habit_id")
      .references("id")
      .inTable("habits")
      .onDelete("CASCADE");
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  await knex.schema.dropTableIfExists("matchmaking");
}
