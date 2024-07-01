exports.up = knex => knex.schema.createTable("refresh_token", table => {
  table.increments("id").unsigned(); // Define 'id' como 'unsigned integer'
  table.integer("expires_in").notNullable();
  table.text("refresh_token").notNullable();
  table.integer("user_id").unsigned().references("id").inTable("users"); // Define 'user_id' como 'unsigned integer' e adiciona referência à tabela 'users'
  table.timestamp("created_at").default(knex.fn.now());
});

exports.down = knex => knex.schema.dropTable("refresh_token");
