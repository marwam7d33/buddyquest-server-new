/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  await knex("habits").del();

  await knex("habits").insert([
    {
      frequency: "Daily",
      name: "Exercise",
      progress: 0,
      start_date: "2024-11-01",
      user_id: 1, // Referencing user1
    },
    {
      frequency: "Daily",
      name: "Meditate",
      progress: 0,
      start_date: "2024-11-01",
      user_id: 2, // Referencing user2
    },
  ]);
}
