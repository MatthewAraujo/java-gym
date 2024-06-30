/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable("personal", (table) => {
        table.increments("id").primary();
        table.string("name").notNullable();
        table.string("email").notNullable().unique();
        table.string("phone").notNullable();
        table.string("avatar").notNullable();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable("personal");
};
