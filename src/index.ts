import http from 'http';
import fs from 'fs';
import path from 'path';
import Router from './router';
import { Middleware, MiddlewareManager } from './middleware';
import { matcher } from './router/route-utils';
import Context from './context';

export class Avrasya {
  port = process.env.PORT ?? 3000
  env = process.env.NODE_ENV ?? 'development'
  router: Router;
  private middlewareManager: MiddlewareManager;
  private routesDirectory: string;
  private server: http.Server;

  constructor() {
    this.server = http.createServer();
    this.router = new Router();
    this.middlewareManager = new MiddlewareManager();
    this.routesDirectory = path.resolve(process.cwd()) + '/dist/routes';
  }

  use(handler: Middleware) {
    this.middlewareManager.add(handler);
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
    this.server = http.createServer((req, res) => {
      const { method, url } = req;
      if (method && url && this.router) {
        const handler = matcher(this.router, method, url);
        if (handler) {
          const context = new Context(req, res, url);
          this.middlewareManager.run(context);
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
    this.server.listen(port, () => {
      console.log('Server listening on port ' + port);
    });
  }

  close() {
    this.server.close();
  }
}

export default Avrasya;