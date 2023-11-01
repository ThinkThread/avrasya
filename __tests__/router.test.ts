import Avrasya from '../src';
import http from "http";
import { Socket } from "net";

jest.mock('http');

const { IncomingMessage, ServerResponse } = http;
const mockIncomingMessage = new IncomingMessage(new Socket());
const mockServerResponse = new ServerResponse(mockIncomingMessage);

describe("Router", () => {
    it("should be defined", () => {
        const avrasya = new Avrasya();
        expect(avrasya.router).toBeDefined();
    });

    it("should be defined GET method", () => {
        const avrasya = new Avrasya();
        avrasya.router.get("/", (context) => {
            context.send("hello");
        });
        expect(avrasya.router).toBeDefined();
    });

    it("should be defined GET method handler is defined", () => {
        const avrasya = new Avrasya();

        avrasya.router.get("/", (context) => {
            context.send("hello");
        })

        const handler = avrasya.router.routes['GET']['/'];

        handler.call(avrasya.router, mockIncomingMessage, mockServerResponse);

        expect(handler).toBeDefined();
        expect(handler).toBeInstanceOf(Function);
    })

    it("should be defined POST method", () => {
        const avrasya = new Avrasya();
        avrasya.router.post("/", (context) => {
            context.send("hello");
        });
        expect(avrasya.router).toBeDefined();
    })

    it("should be defined POST method handler is defined", () => {
        const avrasya = new Avrasya();

        avrasya.router.post("/", (context) => {
            context.send("hello");
        })

        const handler = avrasya.router.routes['POST']['/'];

        handler.call(avrasya.router, mockIncomingMessage, mockServerResponse);

        expect(handler).toBeDefined();
        expect(handler).toBeInstanceOf(Function);
    })

    it("should be defined PUT method", () => {
        const avrasya = new Avrasya();
        avrasya.router.put("/", (context) => {
            context.send("hello");
        });
        expect(avrasya.router).toBeDefined();
    })

    it("should be defined PUT method handler is defined", () => {
        const avrasya = new Avrasya();

        avrasya.router.put("/", (context) => {
            context.send("hello");
        })

        const handler = avrasya.router.routes['PUT']['/'];

        handler.call(avrasya.router, mockIncomingMessage, mockServerResponse);

        expect(handler).toBeDefined();
        expect(handler).toBeInstanceOf(Function);
    })

    it("should be defined DELETE method", () => {
        const avrasya = new Avrasya();
        avrasya.router.delete("/", (context) => {
            context.send("hello");
        });
        expect(avrasya.router).toBeDefined();
    })

    it("should be defined DELETE method handler is defined", () => {
        const avrasya = new Avrasya();

        avrasya.router.delete("/", (context) => {
            context.send("hello");
        })

        const handler = avrasya.router.routes['DELETE']['/'];

        handler.call(avrasya.router, mockIncomingMessage, mockServerResponse);

        expect(handler).toBeDefined();
        expect(handler).toBeInstanceOf(Function);
    })

    it("should be defined PATCH method", () => {
        const avrasya = new Avrasya();
        avrasya.router.patch("/", (context) => {
            context.send("hello");
        });
        expect(avrasya.router).toBeDefined();
    })

    it("should be defined PATCH method handler is defined", () => {
        const avrasya = new Avrasya();

        avrasya.router.patch("/", (context) => {
            context.send("hello");
        })

        const handler = avrasya.router.routes['PATCH']['/'];

        handler.call(avrasya.router, mockIncomingMessage, mockServerResponse);

        expect(handler).toBeDefined();
        expect(handler).toBeInstanceOf(Function);
    })

    it("should be defined HEAD method", () => {
        const avrasya = new Avrasya();
        avrasya.router.head("/", (context) => {
            context.send("hello");
        });
        expect(avrasya.router).toBeDefined();
    })

    it("should be defined HEAD method handler is defined", () => {
        const avrasya = new Avrasya();

        avrasya.router.head("/", (context) => {
            context.send("hello");
        })

        const handler = avrasya.router.routes['HEAD']['/'];

        handler.call(avrasya.router, mockIncomingMessage, mockServerResponse);

        expect(handler).toBeDefined();
        expect(handler).toBeInstanceOf(Function);
    })

    it("should be defined OPTIONS method", () => {
        const avrasya = new Avrasya();
        avrasya.router.options("/", (context) => {
            context.send("hello");
        });
        expect(avrasya.router).toBeDefined();
    })

    it("should be defined OPTIONS method handler is defined", () => {
        const avrasya = new Avrasya();

        avrasya.router.options("/", (context) => {
            context.send("hello");
        })

        const handler = avrasya.router.routes['OPTIONS']['/'];

        handler.call(avrasya.router, mockIncomingMessage, mockServerResponse);

        expect(handler).toBeDefined();
        expect(handler).toBeInstanceOf(Function);
    })

    it("should be defined CONNECT method", () => {
        const avrasya = new Avrasya();
        avrasya.router.connect("/", (context) => {
            context.send("hello");
        });
        expect(avrasya.router).toBeDefined();
    })

    it("should be defined CONNECT method handler is defined", () => {
        const avrasya = new Avrasya();

        avrasya.router.connect("/", (context) => {
            context.send("hello");
        })

        const handler = avrasya.router.routes['CONNECT']['/'];

        handler.call(avrasya.router, mockIncomingMessage, mockServerResponse);

        expect(handler).toBeDefined();
        expect(handler).toBeInstanceOf(Function);
    })
})