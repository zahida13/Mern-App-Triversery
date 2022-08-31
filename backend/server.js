const path = require("path");
const express = require("express");
const { colors } = require("colors");
const connectDB = require("./config/data");
const dotenv = require("dotenv").config();
const { errHandler } = require("./middleWear/errMiddleware");
const PORT = process.env.PORT || 5000;

connectDB();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/goals/", require("./routes/goalRoutes"));
app.use("/api/user", require("./routes/userRoutes"));

// SERVER FRONTEND

if (process.env.NODE_ENVIROMENT === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));
  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "../", "frontend", "build", "index.html")
    );
  });
} else {
  app.get("/", (req, res) => res.send("Please Set To Production"));
}
app.use(errHandler);
app.listen(PORT, console.log("working port", PORT));
