const express = require("express");
const cors = require("cors");
const { createPool } = require("mysql");
const app = express();
require("dotenv").config();
app.use(cors());
app.use(express.json());

const db = createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

db.getConnection((err, connection) => {
  if (err) console.log(err);
  console.log("connection successfully")
})
app.get("/", (req, res) => {
  res.send("Hello World!");
});



app.get("/users", (req, res) => {
  const q = "SELECT * FROM users";
  db.query(q, (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.post("/users", (req, res) => {
  const q = "INSERT INTO users (`name`, `email`) VALUES (?)";
  const values = [
    req.body.name,
    req.body.email,
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.status(200).send({message: "User Created Successfully"});
  });
});
app.delete("/users/:id", (req, res) => {
  const userID = req.params.id;
  const q = "DELETE FROM users WHERE id = ?";
  db.query(q, [userID], (err, data) => {
    if (err) return res.json(err);
    return res.status(200).send({message: "Deleted Successfully"});
  });
});
app.put("/users/:id", (req, res) => {
  const userID = req.params.id;
  const q = "UPDATE users SET `name` = ?, `email` = ? WHERE id = ?";

  const values = [
    req.body.name,
    req.body.email,
  ]

  db.query(q, [...values, userID], (err, data) => {
    if (err) return res.json(err);
    return res.status(200).send({message: "Updated Successfully"});
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}!`);
});
