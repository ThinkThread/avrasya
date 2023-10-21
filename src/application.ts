import http from 'http';
import Router from './router';
import { matcher } from './router/route-utils';

class Avrasya {
  port = process.env.PORT ?? 3000
  env = process.env.NODE_ENV ?? 'development'
  router: Router;

  constructor() {
    this.router = new Router();
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