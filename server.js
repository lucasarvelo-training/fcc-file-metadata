"use strict";

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const multer = require("multer");
const upload = multer();

// require and use "multer"...

const app = express();

app.use(cors());
app.use("/public", express.static(process.cwd() + "/public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function(req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

app.get("/hello", function(req, res) {
  res.json({ greetings: "Hello, API" });
});

app.post("/api/fileanalyse", upload.single("upfile"), function(req, res, next) {
  if (!req.file) {
    const error = new Error("Please choose a file");
    error.httpStatusCode = 400;
    return next(error.message);
  }

  res.json({
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size
  });
  
});

app.listen(process.env.PORT || 3000, function() {
  console.log("Node.js listening ...");
});
