const express = require("express");
require("dotenv").config();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
const expressJwt = require("express-jwt");
const logger = require("./middleware/logger.js");

const cardRouter = require("./routes/cardRouter.js");
const userRouter = require("./routes/userRouter.js");
const authRouter = require("./routes/authRouter.js");
const scoresRouter = require("./routes/scoresRouter.js")

const app = express();

// const db = "mongodb://mshiloh:setforset1995@ds133570.mlab.com:33570/set";
// const db = "mongodb+srv://mshiloh:setforset1995@set.q3nrh.mongodb.net/set?retryWrites=true&w=majority"

//connect to db
mongoose
  .connect(
    process.env.DB,
    { useUnifiedTopology: true })
  .then(() => {
    console.log("🦄  MongoDB is Connected! 🦄");
  })
  .catch(() => {
    console.log("🔥  MongoDB Connection Failed! 🔥");
  });

//config
const port = "5050";

//middleware
app.use(bodyParser.json());
app.use(logger);
app.use(express.static(path.join(__dirname, "client", "build")));

//routes below
app.use("/api", expressJwt({ secret: process.env.SECRET }));

app.use("/api/users", userRouter);
app.use("/api/cards", cardRouter);
app.use("/api/scores", scoresRouter);

app.use("/auth", authRouter);

// route for deployment
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

//server
app.listen(port, () => console.log(`🏃‍  Server running on localhost:${port} 🏃`));