import ManneligContext from "../context";

export function runMiddleware (context: ManneligContext, middlewares: Function[]) {
  let currentMiddleware = 0;

  function next() {
    if (currentMiddleware < middlewares.length) {
      currentMiddleware++;
      middlewares[currentMiddleware - 1](context, next);
    }
  }
  next();
}