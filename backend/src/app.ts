import express from 'express';
import cors from 'cors';

import routes from './routes';

class App {
  public server :express.Application;

  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
  }

  middlewares() :void {
    const allowedOrigins = ['http://localhost:3000', 'http://localhost:8080'];
    const options: cors.CorsOptions = {
      origin: allowedOrigins
    };
  
    this.server.use(express.json());
    this.server.use(cors(options));
  }

  routes() :void {
    this.server.use(routes);
  }
}

export default new App().server;