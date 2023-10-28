import Router from './router';
import Context from './context';

declare module 'avrasya' {
    export class Avrasya {
        constructor();
        port: number;
        env: string;
        router: Router;
        use(handler: (context: Context, next: () => void) => void): void;
        listen(port?: number | string): void;
    }
    export default Avrasya;
}
