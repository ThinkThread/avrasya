import { IncomingMessage, ServerResponse } from "http";
import ManneligContext from "../context";
import { generateMiddlewareIndex } from "./middleware-utils";

class Middleware {
    middlewares: { [method: string]: {} } = {

    };
    constructor() {
        this.middlewares = {}
    }

    add(handler: (context: ManneligContext) => void) {
        const middlewareIndex = generateMiddlewareIndex()
        this.middlewares[middlewareIndex] = function (req: IncomingMessage, res: ServerResponse) {
            var context = new ManneligContext(req, res, "");
            handler(context);
        }

    }
}

export default Middleware;