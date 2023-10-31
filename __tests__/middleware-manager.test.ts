import Context from "../src/context";
import http from "http";
import { Socket } from "net";
import { MiddlewareManager } from "../src/middleware";

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

const { IncomingMessage, ServerResponse } = http;
const mockIncomingMessage = new IncomingMessage(new Socket());
const mockServerResponse = new ServerResponse(mockIncomingMessage);

describe("Middleware Manager", () => {
    it("should be defined", () => {
        const manager = new MiddlewareManager();
        manager.add((context, next) => {
            context.send("1");
            next();
        })
        expect(manager).toBeDefined();
        expect(manager.middlewares).toBeDefined();
        expect(manager.middlewares.length).toBe(1);
    })

    it("should be defined run middleware", () => {
        const manager = new MiddlewareManager();
        manager.add((context, next) => {
            context.send("1");
            next();
        })
        
        const context = new Context(mockIncomingMessage, mockServerResponse, '/');
        manager.run(context);

        expect(context.res.writeHead).toHaveBeenCalledWith(200, { 'Content-Type': 'application/json' });
    })
})