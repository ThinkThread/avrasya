import http from 'http';
import fs from 'fs';
import path from 'path';
import Router from './router';
import Middleware from './middleware';
import { matcher } from './router/route-utils';
import Context from './context';
import { runMiddleware } from './middleware/middleware-utils';

export class Avrasya {
  port = process.env.PORT ?? 3000
  env = process.env.NODE_ENV ?? 'development'
  router: Router;
  private middleware: Middleware;
  private routesDirectory: string;

  constructor() {
    this.router = new Router();
    this.middleware = new Middleware();
    this.routesDirectory = path.resolve(process.cwd()) + '/dist/routes';
  }

  use(handler: (context: Context, next: () => void) => void) {
    this.middleware.add(handler);
  }

  private checkRoutesDir() {
    if (fs.existsSync(this.routesDirectory)) {
      console.log('Loading routes ...');
      this.readFilesRecursively(this.routesDirectory);
    }
  }

  private readFilesRecursively(directory: string) {
    const files = fs.readdirSync(directory);
    files.forEach((file) => {
      const filePath = path.join(directory, file);
      const stats = fs.statSync(filePath);
      if (stats.isDirectory()) {
        this.readFilesRecursively(filePath);
      } else if (file.endsWith('.js')) {
        const route = require(filePath);
        if (route.default) {
          const pathWithoutDirectory = '/' + filePath.replace(this.routesDirectory, '').replace('/', '').replace('.js', '').replace('[', ':').replace(']', '');
          const method = filePath.replace(directory, '').replace('.js', '').replace('/', '').toUpperCase();
          const path = pathWithoutDirectory.replace('/' + method.toLowerCase(), '') || '/';
          console.log(path, method);
          if (method === 'GET') {
            this.router.get(path, route.default);
          } else if (method === 'POST') {
            this.router.post(path, route.default);
          } else if (method === 'PUT') {
            this.router.put(path, route.default);
          } else if (method === 'DELETE') {
            this.router.delete(path, route.default);
          } else {
            console.log(`Method ${method} is not supported.`);
          }
        }
      }
    });
  }

  listen(port?: number | string) {
    if (!port) {
      port = this.port;
    }
    this.checkRoutesDir();
    const server = http.createServer((req, res) => {
      const { method, url } = req;
      if (method && url && this.router) {
        const handler = matcher(this.router, method, url);
        if (handler) {
          const context = new Context(req, res, url);
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