import http from 'http';
import Router from './router';
import Middleware from './middleware';
import { matcher } from './router/route-utils';
import ManneligContext from './context';
import { runMiddleware } from './middleware/middleware-utils';

export class Avrasya {
  port = process.env.PORT ?? 3000
  env = process.env.NODE_ENV ?? 'development'
  router: Router;
  private middleware: Middleware;

  constructor() {
    this.router = new Router();
    this.middleware = new Middleware();
  }

  use(handler: (context: ManneligContext, next: () => void) => void) {
    this.middleware.add(handler);
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
          const context = new ManneligContext(req, res, url);
          runMiddleware(context, this.middleware.middlewares);
          handler(req, res);
        } else {
          res.statusCode = 404;
          res.end();
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