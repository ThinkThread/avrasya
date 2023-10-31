import Context from "../src/context";
import { runMiddleware } from "../src/middleware/utils";
import http from "http";
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

const { IncomingMessage, ServerResponse } = http;
const mockIncomingMessage = new IncomingMessage(new Socket());
const mockServerResponse = new ServerResponse(mockIncomingMessage);

describe("Middleware Utils", () => {
    it("should be defined run middleware", () => {
        
        const middlewares = [];
        middlewares.push((context: Context, next: () => void) => {
            context.send("1");
            next();
        })

        middlewares.push((context: Context, next: () => void) => {
            context.send("2");
            next();
        })
        runMiddleware(new Context(mockIncomingMessage, mockServerResponse, "/"), middlewares);

        expect(mockServerResponse.writeHead).toHaveBeenCalledWith(200, { 'Content-Type': 'application/json' });
    });
})