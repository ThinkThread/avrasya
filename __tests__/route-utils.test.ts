import Router from "../src/router";
import { matcher } from "../src/router/route-utils";

describe("Route Utils", () => {
    let router: Router;

    beforeEach(() => {
        router = new Router();
    });

    describe("matcher", () => {
        it("should be defined for existing routes", () => {
            router.get("/", (context) => context.send("hello"));
            const match = matcher(router, "GET", "/");
            expect(match).toBeDefined();
        });

        it("should not be defined if route is not added", () => {
            const match = matcher(router, "GET", "/");
            expect(match).toBeNull();
        });

        it("should not be defined for non-existent methods or urls", () => {
            router.get("/", (context) => context.send("hello"));

            let match = matcher(router, "", "/");
            expect(match).toBeNull();

            match = matcher(router, "GET", "");
            expect(match).toBeNull();

            match = matcher(router, "", "");
            expect(match).toBeNull();
        });

        it("should be defined for routes with params", () => {
            router.get("/123", (context) => context.send("hello"));
            const match = matcher(router, "GET", "/:id");
            expect(match).toBeDefined();
        });
    });
});
