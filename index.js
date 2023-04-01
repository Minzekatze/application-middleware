import express from "express";
import validator from "validator";

const app = express();
const port = process.env.PORT || 3000;

const errorHandler = (err, req, res, next) => {
  console.log(err);
  return res.status(403).json({ error: err.message });
};

const secure = (req, res, next) => {
  const token = req.query.token;
  if (!token) {
    next("missing token");
  } else if (!validator.isLength(token, { min: 3 })) {
    next("token invalid");
  } else {
    next();
  }
};
app.use(express.json());
app.use("*", secure);

// app.get("/verify/:token");

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Cute app listening on port ${port}`);
});
