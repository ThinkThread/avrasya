import Router from "../src/router";
import { matcher } from "../src/router/route-utils";

describe("Route Utils", () => {
    it("should be defined matcher", () => {
        const router = new Router();
        router.get("/", (context) => {
            context.send("hello");
        })
        const match = matcher(router, "GET", "/");
        expect(match).toBeDefined();
    });

    it("should not be defined matcher if route is not defined", () => {
        const router = new Router();
        const match = matcher(router, "GET", "/");
        expect(match).toBeNull();
    })

    it("should not be defined matcher if method is not defined", () => {
        const router = new Router();
        router.get("/", (context) => {
            context.send("hello");
        })
        const match = matcher(router, "", "/");
        expect(match).toBeNull();
    })

    it("should not be defined matcher if url is not defined", () => {
        const router = new Router();
        router.get("/", (context) => {
            context.send("hello");
        })
        const match = matcher(router, "GET", "");
        expect(match).toBeNull();
    })

    it("should not be defined matcher if method and url is not defined", () => {
        const router = new Router();
        router.get("/", (context) => {
            context.send("hello");
        })
        const match = matcher(router, "", "");
        expect(match).toBeNull();
    })

    it("should be defined matcher if params is defined", () => {
        const router = new Router();
        router.get("/123", (context) => {
            context.send("hello");
        })
        const match = matcher(router, "GET", "/:id");
        expect(match).toBeDefined();
    })
})