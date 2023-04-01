const express = require("express");
const mongoose = require("mongoose");

const cors = require("cors");

const { PORT = 3001 } = process.env;

const app = express();

/*
mongoose.connect(
  'mongodb://localhost:27017/wtwr_db',
  () => {
    console.log('connected to DB');
  },
  (e) => console.log('DB error', e),
);
*/

// mongoose.connect("mongodb://localhost:27017/wtwr_db_lavis");
mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db_lavis");

const routes = require("./routes");
const { createUser, login } = require("./controllers/users");
const errorHandler = require("./middlewares/errors/ErrorHandler");
const { requestLogger, errorLogger } = require("./middlewares/logger");

const { errors } = require("celebrate");

app.use(cors());

app.use(express.json());

app.use(errorHandler);
app.use(errors());

app.use(requestLogger);
app.use(errorLogger);

app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("Server will crash now");
  }, 0);
});

app.post("/signup", createUser);
app.post("/signin", login);

app.use(routes);

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
  console.log("This is working");
});
