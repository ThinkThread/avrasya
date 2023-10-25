import http from 'http';
import Router from './router';
import Middleware from './middleware';
import { matcher } from './router/route-utils';

class Avrasya {
  port = process.env.PORT ?? 3000
  env = process.env.NODE_ENV ?? 'development'
  router: Router;
  middleware: Middleware;

  constructor() {
    this.router = new Router();
    this.middleware = new Middleware();
  }

  listen(port?: number | string) {
    if (!port) {
      port = this.port;
    }
    const server = http.createServer((req, res) => {
      const { method, url } = req;
      if (method && url && this.router) {
        const handler = matcher(this.router, method, url);
        if (handler) {
          handler(req, res);
        } else {
          res.statusCode = 404;
          res.end();
        }

        // register middleware
        var middleswares = Object.keys(this.middleware.middlewares);
        for (var i = 0; i < middleswares.length; i++) {
          var middleware = this.middleware.middlewares[middleswares[i]] as Function;
          middleware(req, res);
        }
      } else {
        res.statusCode = 404;
        res.end();
      }
    });
    server.listen(port, () => {
      console.log('Server listening on port ' + port);
    });
  }
}

export default Avrasya;