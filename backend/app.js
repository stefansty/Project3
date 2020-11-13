const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");


const HttpError = require("./models/http-error");

const personRoutes = require("./routes/person-routes");

const app = express();

app.use(bodyParser.json());


app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  next();
});


app.use("/api/person", personRoutes);

app.use((req, res, next) => {
  const error = new HttpError("Could not find this route.", 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "AN unknown error occured" });
});

const port = 5000 ;

mongoose
  .connect("mongodb+srv://stefan:stefan@cluster0.1qffc.mongodb.net/person?retryWrites=true&w=majority")
  .then(() => {
    app.listen(port);
  })
  .catch((err) => {
    console.log(err);
  });
