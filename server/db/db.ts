import knex from "knex";
// import knexfile from "./knexfile.js";
const knexfile = require("./knexfile.js");

const db = knex(knexfile.development);
export default db;