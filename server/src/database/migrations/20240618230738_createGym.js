/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("gym", (table) => {
        table.increments("gym_id").primary();
        table.string("gym_name").notNullable();
        table.string("address").notNullable();
        table.string("city").notNullable();
        table.string("operating_hours").notNullable();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable("gym");
};
