import http from "http";
import fs from "fs";
import Context from "../src/context";
import { Socket } from "net";

jest.mock('http', () => {
    return {
        IncomingMessage: jest.fn(),
        ServerResponse: jest.fn(() => ({
            writeHead: jest.fn(),
            write: jest.fn(),
            end: jest.fn()
        })),
    };
});

jest.mock('fs', () => ({
    readFileSync: jest.fn(),
    createReadStream: jest.fn()
}));

const { IncomingMessage, ServerResponse } = http;
const mockIncomingMessage = new IncomingMessage(new Socket());
const mockServerResponse = new ServerResponse(mockIncomingMessage);

describe('Context', () => {
    it('should be defined', () => {
        mockIncomingMessage.url = '/';
        const context = new Context(mockIncomingMessage, mockServerResponse, '/');
        expect(context).toBeDefined();
        expect(context.req).toBeDefined();
        expect(context.res).toBeDefined();
    });

    it('should be defined with params', () => {
        mockIncomingMessage.url = '/1';
        const context = new Context(mockIncomingMessage, mockServerResponse, '/:id');
        expect(context).toBeDefined();
        expect(context.req).toBeDefined();
        expect(context.res).toBeDefined();
        expect(context.params).toBeDefined();
        expect(context.params.id).toBeDefined();
        expect(context.params.id).toBe('1');
    })

    it('should not be defined with params', () => {
        mockIncomingMessage.url = '/1';
        const context = new Context(mockIncomingMessage, mockServerResponse, '/');
        expect(context).toBeDefined();
        expect(context.req).toBeDefined();
        expect(context.res).toBeDefined();
        expect(context.params).toEqual({});
    })

    it('should not be defined url', () => {
        mockIncomingMessage.url = undefined;
        const context = new Context(mockIncomingMessage, mockServerResponse, '/');
        expect(context).toBeDefined();
        expect(context.req).toBeDefined();
        expect(context.res).toBeDefined();
        expect(context.params).toEqual({});
    })

    it('should not be defined pathname', () => {
        mockIncomingMessage.url = '';
        const context = new Context(mockIncomingMessage, mockServerResponse, '/');
        expect(context).toBeDefined();
        expect(context.req).toBeDefined();
        expect(context.res).toBeDefined();
        expect(context.params).toEqual({});
    })

    it('should be defined send method', () => {
        mockIncomingMessage.url = '/1';
        const context = new Context(mockIncomingMessage, mockServerResponse, '/:id');
        context.send({ id: 1 });
        expect(mockServerResponse.writeHead).toHaveBeenCalledWith(200, { 'Content-Type': 'application/json' });
        expect(mockServerResponse.write).toHaveBeenCalledWith(JSON.stringify({ id: 1 }));
        expect(mockServerResponse.end).toHaveBeenCalled();
    })

    it('should be defined redirect method', () => {
        mockIncomingMessage.url = '/1';
        const context = new Context(mockIncomingMessage, mockServerResponse, '/:id');
        context.redirect('/2');
        expect(mockServerResponse.writeHead).toHaveBeenCalledWith(302, { 'Location': '/2' });
        expect(mockServerResponse.end).toHaveBeenCalled();
    })

    it('should be defined json method', () => {
        mockIncomingMessage.url = '/1';
        const context = new Context(mockIncomingMessage, mockServerResponse, '/:id');
        context.json({ id: 1 });
        expect(mockServerResponse.writeHead).toHaveBeenCalledWith(200, { 'Content-Type': 'application/json' });
        expect(mockServerResponse.write).toHaveBeenCalledWith(JSON.stringify({ id: 1 }));
        expect(mockServerResponse.end).toHaveBeenCalled();
    })

    it('should be defined html method', () => {
        mockIncomingMessage.url = '/1';
        const context = new Context(mockIncomingMessage, mockServerResponse, '/:id');
        context.html('<h1>hello</h1>');
        expect(mockServerResponse.writeHead).toHaveBeenCalledWith(200, { 'Content-Type': 'text/html' });
        expect(mockServerResponse.write).toHaveBeenCalledWith('<h1>hello</h1>');
        expect(mockServerResponse.end).toHaveBeenCalled();
    })

    it('should be defined js method', () => {
        mockIncomingMessage.url = '/1';
        const context = new Context(mockIncomingMessage, mockServerResponse, '/:id');
        context.js('console.log("hello");');
        expect(mockServerResponse.writeHead).toHaveBeenCalledWith(200, { 'Content-Type': 'application/javascript' });
        expect(mockServerResponse.write).toHaveBeenCalledWith('console.log("hello");');
        expect(mockServerResponse.end).toHaveBeenCalled();
    })

    it('should be defined text method', () => {
        mockIncomingMessage.url = '/1';
        const context = new Context(mockIncomingMessage, mockServerResponse, '/:id');
        context.text('hello');
        expect(mockServerResponse.writeHead).toHaveBeenCalledWith(200, { 'Content-Type': 'text/plain' });
        expect(mockServerResponse.write).toHaveBeenCalledWith('hello');
        expect(mockServerResponse.end).toHaveBeenCalled();
    })

    it('should be defined css method', () => {
        mockIncomingMessage.url = '/1';
        const context = new Context(mockIncomingMessage, mockServerResponse, '/:id');
        context.css('body { background-color: red; }');
        expect(mockServerResponse.writeHead).toHaveBeenCalledWith(200, { 'Content-Type': 'text/css' });
        expect(mockServerResponse.write).toHaveBeenCalledWith('body { background-color: red; }');
        expect(mockServerResponse.end).toHaveBeenCalled();
    })

    it('should be defined file method', () => {
        mockIncomingMessage.url = '/1';
        const context = new Context(mockIncomingMessage, mockServerResponse, '/:id');
        context.file('index.html');
        expect(mockServerResponse.writeHead).toHaveBeenCalledWith(200, { 'Content-Type': 'application/octet-stream' });
        expect(mockServerResponse.write).toHaveBeenCalledWith(fs.readFileSync('index.html'));
        expect(mockServerResponse.end).toHaveBeenCalled();
    })

    it('should be defined fileStream method', () => {
        mockIncomingMessage.url = '/1';
        const context = new Context(mockIncomingMessage, mockServerResponse, '/:id');
        context.fileStream('index.html');
        expect(mockServerResponse.writeHead).toHaveBeenCalledWith(200, { 'Content-Type': 'application/octet-stream' });
        expect(mockServerResponse.write).toHaveBeenCalledWith(fs.createReadStream('index.html'));
        expect(mockServerResponse.end).toHaveBeenCalled();
    })
})