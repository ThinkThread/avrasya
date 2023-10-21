import { IncomingMessage, ServerResponse } from "http";
import url from "url";

class ManneligContext {
    private path: string;
    req: IncomingMessage;
    res: ServerResponse;
    body: any;
    params: any;
    constructor(req: IncomingMessage, res: ServerResponse, path: string, ) {
        this.path = path;
        this.req = req;
        this.res = res;
        this.body = '';
        this.params = {};
        if (req.url && path.includes(':')) {
            this.extractParamsFromUrl(path);
        }
    }
    private extractParamsFromUrl(path: string) {
        if (!this.req.url) {
            return;
        }
        const urlParts = url.parse(this.req.url);
        const pathname = urlParts.pathname;

        if (!pathname) {
            return;
        }

        const pathSegments = pathname.split('/').filter(segment => segment !== '');

        const routeSegments = path.split('/').filter(segment => segment !== '');

        if (pathSegments.length === routeSegments.length) {
            routeSegments.forEach((segment, index) => {
                if (segment.startsWith(':')) {
                    const paramName = segment.slice(1);
                    this.params[paramName] = pathSegments[index];
                }
            });
        }
    }

    send(data: any) {
        this.res.writeHead(200, { 'Content-Type': 'application/json' });
        this.res.write(JSON.stringify(data));
        this.res.end();
    }
}
export default ManneligContext;