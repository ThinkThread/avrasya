import Context from "../context";

export function runMiddleware (context: Context, middlewares: Function[]) {
  let currentMiddleware = 0;

  function next() {
    if (currentMiddleware < middlewares.length) {
      currentMiddleware++;
      middlewares[currentMiddleware - 1](context, next);
    }
  }
  next();
}