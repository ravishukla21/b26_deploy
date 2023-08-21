const express = require("express");
const { connection } = require("./db");

const { userRouter } = require("./routes/user.routes");

const { noteRouter } = require("./routes/note.routes");
const cors = require("cors");
require("dotenv").config();
const app = express();
app.use(express.json());
app.use(cors());
app.use("/users", userRouter);
app.use("/notes", noteRouter);

app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("connected to the db");
    console.log("server is running at port 4500" + `${process.env.port}`);
  } catch (err) {
    console.log("something wrong", err);
  }
});
