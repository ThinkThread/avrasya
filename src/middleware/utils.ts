import Context from "../context";
import { Middleware } from "./types";

export function runMiddleware (context: Context, middlewares: Middleware[]) {
  let currentMiddleware = 0;

  function next() {
    if (currentMiddleware < middlewares.length) {
      currentMiddleware++;
      middlewares[currentMiddleware - 1](context, next);
    }
  }
  next();
}