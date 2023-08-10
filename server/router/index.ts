// import UserController from "../controller/user";
// const express = require("express");

import express from "express";
const app = express();
// const cors = require("cors");

// var corsOptions = {
//   origin: 'http://localhost:3000',
//   optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
// }

// app.use(cors(corsOptions));

const UserController = require("../controller/user");

const router = express.Router();
router.post("/create", (req: any, res: any) => {req.body; UserController.createUser(req, res)});
router.get("/getAllUsers", (req: any, res: any) => UserController.getAllUsers(req, res));

export default router;

