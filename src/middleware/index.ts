class Middleware {
    middlewares: Function[] = [];

    constructor() {
        this.middlewares = [];
    }

    add (middleware: Function) {
        this.middlewares.push(middleware);
    }
}

export default Middleware;