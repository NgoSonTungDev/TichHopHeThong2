"use strict";
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const Shareholder =  require('./routes/Shareholder')

const app = express();
dotenv.config();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("he llo guy");
});

app.use("/api/shareholder", Shareholder);

app.listen(8888, () => {
  console.log("app listening on url http://localhost:8888" );
});
