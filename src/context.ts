import { IncomingMessage, ServerResponse } from "http";
import url from "url";
import fs from "fs";

class Context {
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

    // TODO: This is same as the json method. Refactor
    send(data: any) {
        this.res.writeHead(200, { 'Content-Type': 'application/json' });
        this.res.write(JSON.stringify(data));
        this.res.end();
    }

    redirect(url: string) {
        this.res.writeHead(302, { 'Location': url });
        this.res.end();
    }

    json(data: any) {
        this.res.writeHead(200, { 'Content-Type': 'application/json' });
        this.res.write(JSON.stringify(data));
        this.res.end();
    }

    html(data: any) {
        this.res.writeHead(200, { 'Content-Type': 'text/html' });
        this.res.write(data);
        this.res.end();
    }

    css(data: any) {
        this.res.writeHead(200, { 'Content-Type': 'text/css' });
        this.res.write(data);
        this.res.end();
    }

    js(data: any) {
        this.res.writeHead(200, { 'Content-Type': 'application/javascript' });
        this.res.write(data);
        this.res.end();
    }

    text(data: any) {
        this.res.writeHead(200, { 'Content-Type': 'text/plain' });
        this.res.write(data);
        this.res.end();
    }

    file(path: string) {
        this.res.writeHead(200, { 'Content-Type': 'application/octet-stream' });
        this.res.write(fs.readFileSync(path));
        this.res.end();
    }

    fileStream(path: string) {
        this.res.writeHead(200, { 'Content-Type': 'application/octet-stream' });
        this.res.write(fs.createReadStream(path));
        this.res.end();
    }
}
export default Context;