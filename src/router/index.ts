import { IncomingMessage, ServerResponse } from "http";
import Context from "../context";

class Router {

    // TODO: refactor
    routes: { [method: string]: { [path: string]: Function } } = {
        GET: {},
        POST: {},
        PUT: {},
        DELETE: {},
        PATCH: {},
        HEAD: {},
        OPTIONS: {},
        CONNECT: {},
    };

    constructor() {
        this.routes = {
            GET: {},
            POST: {},
            PUT: {},
            DELETE: {},
            PATCH: {},
            HEAD: {},
            OPTIONS: {},
            CONNECT: {},
        }
    }
    get(path: string, handler: (context: Context) => void) {
        this.routes.GET[path] = function (req: IncomingMessage, res: ServerResponse) {
            var context = new Context(req, res, path);
            handler(context);
        }
    }   

    post(path: string, handler: (context: Context) => void) {
        this.routes.POST[path] = function (req: IncomingMessage, res: ServerResponse) {
            var context = new Context(req, res, path);
            let body = '';
            req.once('data', chunk => {
                body += chunk;
                context.body = JSON.parse(body);
                handler(context);
            })
        }
    }

    put (path: string, handler: (context: Context) => void) {
        this.routes.PUT[path] = function (req: IncomingMessage, res: ServerResponse) {
            var context = new Context(req, res, path);
            let body = '';
            req.once('data', chunk => {
                body += chunk;
                context.body = JSON.parse(body);
                handler(context);
            })
        }
    }

    delete (path: string, handler: (context: Context) => void) {
        this.routes.DELETE[path] = function (req: IncomingMessage, res: ServerResponse) {
            var context = new Context(req, res, path);
            handler(context);
        }
    }

    patch (path: string, handler: (context: Context) => void) {
        this.routes.PATCH[path] = function (req: IncomingMessage, res: ServerResponse) {
            var context = new Context(req, res, path);
            let body = '';
            req.once('data', chunk => {
                body += chunk;
                context.body = JSON.parse(body);
                handler(context);
            })
        }
    }

    head (path: string, handler: (context: Context) => void) {
        this.routes.HEAD[path] = function (req: IncomingMessage, res: ServerResponse) {
            var context = new Context(req, res, path);
            handler(context);
        }
    }

    options (path: string, handler: (context: Context) => void) {
        this.routes.OPTIONS[path] = function (req: IncomingMessage, res: ServerResponse) {
            var context = new Context(req, res, path);
            handler(context);
        }
    }

    connect (path: string, handler: (context: Context) => void) {
        this.routes.CONNECT[path] = function (req: IncomingMessage, res: ServerResponse) {
            var context = new Context(req, res, path);
            handler(context);
        }
    }

}

export default Router;