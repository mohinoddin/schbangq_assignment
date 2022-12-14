const authRoute = require("./routes/auth");
const courseRoute = require("./routes/course");

const express = require("express");
const dbConnection = require("./utils/DBconnection");
require("dotenv").config();
const port =3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(require("cors")());

const routePrefix = "api";

app.use(`/${routePrefix}`, authRoute);
app.use(`/${routePrefix}/courses`, courseRoute);

app.listen(port, async () => {
  try {
    // console.log(process.env.MONGO_URI)
    await dbConnection(process.env.MONGO_URI);
    console.log("dbConnected at", port);
  } catch (error) {
    console.log("Db not connected");
  }
});

app.get("/", (req, res) => {
  res.status(200).send("Base route")
})