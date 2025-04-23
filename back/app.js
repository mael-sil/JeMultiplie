const express = require("express");
const session = require("express-session");
const cors = require("cors");

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(
  session({
    secret: "gfg-key",
    resave: false,
    saveUninitialized: true,
  })
);

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

app.get("/api/generate", (req, res) => {
  const a = getRandomInt(2, 10);
  const b = getRandomInt(2, 10);
  res.json({ a, b, result: a * b });
});

app.get("/api/score", (req, res) => {
  res.json({ mean: req.session.mean, accuracy: req.session.accuracy });
});

app.post("/api/response", (req, res) => {
  if (typeof req.session.opNbr === "undefined") {
    req.session.opNbr = 1;
  } else {
    req.session.opNbr += 1;
  }

  if (typeof req.session.opTrueNbr === "undefined") {
    req.session.opTrueNbr = 0;
  }

  if (req.body.result == true) {
    console.log("test");
    req.session.opTrueNbr += 1;
  }

  if (typeof req.session.totalTime === "undefined") {
    req.session.totalTime = req.body.time;
  } else {
    req.session.totalTime += req.body.time;
  }

  req.session.mean = req.session.totalTime / req.session.opNbr;

  req.session.accuracy = (100 * req.session.opTrueNbr) / req.session.opNbr;

  res.sendStatus(200);
});

// Start the server
app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
