const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

//Static Folder
app.use(express.static(path.join(__dirname, "public")));

//Use .env file
require("dotenv").config();

//Connect to mongoDB database
const connectDB = require("./config/db");
connectDB();

//Set port from .env file
const port = process.env.PORT;

//Use middleware require for data handling
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//cors middleware
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:4000"],
    credentials: true,
  })
);

//Welcome message
app.get("/", (req, res) => {
  res.send({ message: "Welcome to my first API" });
});

//Get routes of ideas API
const ideasRouter = require("./routes/idea");
app.use("/api/ideas", ideasRouter);

//Server Listening
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
