import Context from "../context";
import { Middleware } from "./types";
import { runMiddleware } from "./utils";

export class MiddlewareManager {
    middlewares: Middleware[] = [];

    constructor() {
        this.middlewares = [];
    }

    add(middleware: Middleware) {
        this.middlewares.push(middleware);
    }

    run(context: Context) {
        runMiddleware(context, this.middlewares);
    }
}