/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
   await knex("users").del();

   await knex("users").insert([
    {
      id: 1,
      username: "user1",
      email: "user1@example.com", // Optional email field
      password: "password1", // Plain-text password
    },
    {
      id: 2,
      username: "user2",
      email: null, // optional //Null email field
      password: "password2", // Plain-text password
    },
  ]);
}
