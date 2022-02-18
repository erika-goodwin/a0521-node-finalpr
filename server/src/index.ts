import dotenv from "dotenv";
dotenv.config();

require("express-async-errors");
require("./utils/db");

// const express = require("express");
import express from "express";
import cors from "cors";

const app = express();

const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

//Route
const tableRoute = require("./routes/tableRoute");
const authRoute = require("./routes/authRoute");

//Middleware
// app.set("views", __dirname + "/client/src/components");
// app.set("view engine", "jsx");
// app.engine("jsx", require("express-react-views").createEngine());

app.use(express.json());
app.use(cors());
app.use(cookieParser(process.env.COOKIE_SECRET));
// app.use(express.static(path.join(__dirname, "../client/public")));
app.use(bodyParser.urlencoded({ extended: true }));

//Connection
app.use("/api/table", tableRoute);
app.use("/api/auth", authRoute);
// app.get("*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "../client/public", "index.html"));
// });
// app.use((error, req, res, next) => {
//   res.status(500).json({ error: error.message });
// });

//PORT
const PORT = process.env.PORT || 8001;
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

module.exports = app;
