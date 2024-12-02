/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  await knex.schema.createTable("habits", (table) => {
    table.increments("id").primary(); // Auto-incrementing ID
    table.integer("user_id").unsigned().notNullable(); // Foreign key to 'users'
    table.string("name").notNullable(); // Habit name
    table.string("frequency").notNullable(); // Frequency (e.g., Daily, Weekly)
    table.integer("progress").defaultTo(0); // Progress (e.g., 0%)
    table.date("start_date").notNullable(); // Start date
    table.date("end_date"); // Optional end date

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
  await knex.schema.dropTableIfExists("habits");
}
