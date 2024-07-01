const knex = require("knex");
const config = require("../../knexfile");

const connection = knex(config.development);

async function runMigrationsAndSeeds() {
  try {
    console.log('Running migrations...');
    await connection.migrate.latest();
    console.log('Migrations completed.');

    console.log('Running seeds...');
    await connection.seed.run();
    console.log('Seeds completed.');
  } catch (error) {
    console.error('Error running migrations and seeds:', error);
    return { success: false, error }; // Retorna um objeto de erro
  } finally {
    await connection.destroy();
  }
  return { success: true }; // Retorna um objeto de sucesso se tudo correu bem
}

module.exports = runMigrationsAndSeeds;
