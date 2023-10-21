import Router from './router';

declare module 'avrasya' {
    class Avrasya {
        constructor();
        port: number;
        env: string;
        router: Router;
        listen(port?: number | string): void;
    }

    export default Avrasya;
}
