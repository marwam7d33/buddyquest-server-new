/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
   await knex("journals").del();

   await knex("journals").insert([
    {
      user_id: 1, // Referencing user1
      entry_date: "2024-11-01",
      entry: "Started exercising today!",
      mood: "Happy",
    },
    {
      user_id: 2, // Referencing user2
      entry_date: "2024-11-02",
      entry: "Meditated for 10 minutes.",
      mood: "Calm",
    },
  ]);
}
