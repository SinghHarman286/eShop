require("dotenv").config();

const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const { json } = require("body-parser");
const usersDB = require("./db/Users");
const cookieSession = require("cookie-session"); // adds req.session to the req object

const app = express();
app.use(json());
app.use(cors());

const validateAuth = (req, res, next) => {
  const accessToken = req.headers["authorization"].split(" ")[1];
  console.log(accessToken);
  if (accessToken) {
    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
      if (err) {
        res.status(403);
      } else {
        next();
      }
    });
  } else {
    res.status(401);
  }
};

app.get("/posts", validateAuth, async (req, res) => {
  const users = await usersDB.getAll();
  res.status(200).send({ users: users });
});

app.post("/login", async (req, res) => {
  const { emailVal, passwordVal } = req.body;

  const user = await usersDB.getOneBy({ emailVal });

  if (!user) return res.send({ auth: false, message: "Email Not Found" });
  if (user.passwordVal !== passwordVal) return res.send({ auth: false, message: "Invalid Password" });

  const accessToken = jwt.sign({ id: user.id }, process.env.ACCESS_TOKEN_SECRET);

  res.send({ auth: true, accessToken });
});

app.post("/signup", async (req, res) => {
  const { emailVal, passwordVal, passwordConfirmVal } = req.body;
  const IsUser = await usersDB.getOneBy({ emailVal });

  if (IsUser) return res.send({ signup: false, message: "Email Already Exists" });

  if (passwordVal !== passwordConfirmVal) return res.send({ signup: false, message: "Passwords are not matching" });

  const newUserCreated = await usersDB.createNewRecord({
    emailVal,
    passwordVal,
  });

  res.send({ signup: true, message: "Account Created" });
});

app.listen(4000, () => {
  console.log("listening on port 4000");
});
