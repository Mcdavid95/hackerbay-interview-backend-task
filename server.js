import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import bunyan from 'bunyan';
import routes from './route';

dotenv.config();

const server = express();
const log = bunyan.createLogger({
  name: 'server'
});

const port = parseInt(process.env.PORT, 10) || 8080;

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use('/api/v1', routes);

server.get('*', (req, res) =>
  res.status(200).send({
    status: true,
    message: 'Welcome to the beginning of shithole'
  }));

server.listen(port, (error) => {
  if (error) {
    return {
      error: error.message
    };
  }
  log.info(`Server running on port ${port}.....`);
});

export default server;
