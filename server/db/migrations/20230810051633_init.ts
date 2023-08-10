// import { Knex } from "knex";
const Knex = require("knex");


exports.up = function(knex) {

  return knex.schema.createTable("Users", table => {
    table.increments("id");
    table.string("first_name").notNullable();
    table.string("last_name").notNullable();
    table.string("password").notNullable();
    table.string("gender").notNullable();
    table.string("email").notNullable().unique();
    table.string("country").notNullable();
    table.string("city").notNullable();
    table.integer("zip").notNullable();
    table.timestamps(true, true);
    table.specificType("interest", "text ARRAY");
    table.binary("picture");
  });
}


exports.down = function(knex) {
}

