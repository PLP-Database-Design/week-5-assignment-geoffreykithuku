const express = require("express");
const app = express();
const mysql = require("mysql2");
const dotenv = require("dotenv");
const cors = require("cors");

app.use(express.json());
app.use(cors());
dotenv.config();

//connect to database
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// verify connection
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("Connected to database");

  // query to retrive all patients

  app.get("/patients", (req, res) => {
    db.query("SELECT * FROM patients", (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  });

  // query to retrive all providers

  app.get("/providers", (req, res) => {
    db.query("SELECT * FROM providers", (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  });

  // query to retrive all patients by first name

  app.get("/patients/:first_name", (req, res) => {
    db.query(
      "SELECT * FROM patients WHERE first_name = ?",
      [req.params.first_name],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      }
    );
  });

  // query to retrive all providers by specialty

  app.get("/providers/:specialty", (req, res) => {
    db.query(
      "SELECT * FROM providers WHERE provider_specialty = ?",
      [req.params.specialty],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      }
    );
  });

  //listen to port 3000
  app.listen(3000, () => {
    console.log("Server is running on port 3000");
  });
});
