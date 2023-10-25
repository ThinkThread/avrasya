import Router from './router';
import Middleware from './middleware';

declare module 'avrasya' {
    class Avrasya {
        constructor();
        port: number;
        env: string;
        router: Router;
        listen(port?: number | string): void;
        middleware: Middleware;
    }

    export default Avrasya;
}
