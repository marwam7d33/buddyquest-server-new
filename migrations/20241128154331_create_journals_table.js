/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  await knex.schema.createTable("journals", (table) => {
    table.increments("id").primary(); // Auto-incrementing ID
    table.integer("user_id").unsigned().notNullable(); // Foreign key to 'users'
    table.date("entry_date").notNullable(); // Entry date
    table.text("entry").notNullable(); // Journal entry
    table.string("mood"); // Optional mood field

    table
      .foreign("user_id")
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  await knex.schema.dropTableIfExists("journals");
}
