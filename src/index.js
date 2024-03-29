const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const { PORT } = require("./config/server-config");
const apiRoutes = require("./routes/index");

const db = require("./models/index");

const createServer = () => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use("/authservice/api", apiRoutes);

  app.listen(PORT, async () => {
    console.log(`server listening on port ${PORT}`);
    if (process.env.DB_SYNC) {
      db.sequelize.sync({ alter: true });
    }
  });
};

createServer();
