/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  await knex("matchmaking").del();

  //   matchmaking records (habit_id, user_id, partner_id)
  await knex("matchmaking").insert([
    { habit_id: 1, user_id: 1, partner_id: 2 }, // Matching user1 (Exercise) with user2
    { habit_id: 2, user_id: 2, partner_id: 1 }, // Matching user2 (Meditate) with user1
  ]);
}











//TODO
//hardcoded //seed the sata for matchmaking and connect page to habit //user//foreignkey 