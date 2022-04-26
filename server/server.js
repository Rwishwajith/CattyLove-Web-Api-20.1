const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const swagger = require("./swagger");
const fs = require('fs');

require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 4000;

const getActualRequestDurationInMilliseconds = start => {
  const NS_PER_SEC = 1e9; // convert to nanoseconds
  const NS_TO_MS = 1e6; // convert to milliseconds
  const diff = process.hrtime(start);
  return (diff[0] * NS_PER_SEC + diff[1]) / NS_TO_MS;
};

let logger = (req, res, next) => {
  let current_datetime = new Date();
  let formatted_date =
    current_datetime.getFullYear() +
    "-" +
    (current_datetime.getMonth() + 1) +
    "-" +
    current_datetime.getDate() +
    " " +
    current_datetime.getHours() +
    ":" +
    current_datetime.getMinutes() +
    ":" +
    current_datetime.getSeconds();
  let method = req.method;
  let url = req.url;
  let status = res.statusCode;
  const start = process.hrtime();
  const durationInMilliseconds = getActualRequestDurationInMilliseconds(start);
  let log = `[${formatted_date}] ${method}:${url} ${status} ${durationInMilliseconds.toLocaleString()} ms`;
  console.log(log);
  fs.appendFile("request_logs.txt", log + "\n", err => {
    if (err) {
      console.log(err);
    }
  });
  next();
};

app.use(logger);

app.use(cors());
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(require("./routes/user-routes"));
app.use(require("./routes/cat-routes"));
app.use(require("./routes/auth-routes"));
// auth router attaches /login, /logout, and /callback routes to the baseURL
swagger(app);

mongoose
  .connect(process.env.ATLAS_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(port, () => {
      // perform a database connection when server starts
      // dbo.connectToServer(function (err) {
      //     if (err) console.error(err);

      // });
      console.log(`Server is running on port: ${port}`);
    });
  })
  .catch((err) => {
    console.log("Error connecting to database", err);
  });
