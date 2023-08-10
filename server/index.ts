// const express = require("express");

import express from "express";
import router from "./router";

const app = express();
const cors = require("cors");


app.use(cors());

app.use(express.json());
app.use(router);

app.listen(8080, () => console.log("Listening at https://localhost:8080")
)
