import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import bunyan from "bunyan";

dotenv.config();

const app = express();
const log = bunyan.createLogger({
  name: "server"
});

const port = parseInt(process.env.PORT, 10) || 8080;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("*", (req, res) =>
  res.status(200).send({
    status: true,
    message: "Welcome to the beginning of shithole"
  })
);

app.listen(port, (error) => {
  if (error) {
    return {
      error: error.message
    };
  }
  log.info(`Server running on port ${port}.....`);
});
