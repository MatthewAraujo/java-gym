exports.up = knex => knex.schema.createTable("history", table => {
  table.increments("id").unsigned(); // Define 'id' como 'unsigned integer'
  table.integer("user_id").unsigned().references("id").inTable("users"); // Define 'user_id' como 'unsigned integer' e adiciona referência à tabela 'users'
  table.integer("exercise_id").unsigned().references("id").inTable("exercises"); // Define 'exercise_id' como 'unsigned integer' e adiciona referência à tabela 'exercises'
  table.timestamp("created_at").default(knex.fn.now());
});

exports.down = knex => knex.schema.dropTable("history");
