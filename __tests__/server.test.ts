import Avrasya from '../src';

describe("Server", () => {
    it("avrasya server should listen", () => {
        process.env.NODE_ENV = "development";
        process.env.PORT = "3000";

        const avrasya = new Avrasya();
        avrasya.listen();

        expect(avrasya.port).toBe("3000");
        expect(avrasya.env).toBe("development");
        expect(avrasya.router).toBeDefined();

        avrasya.close();
    });

    it("avrasya server should not listen PORT", () => {
        process.env.PORT = "3001";

        const avrasya = new Avrasya();
        avrasya.listen();

        expect(avrasya.port).not.toBe("3000");

        avrasya.close();
    })

    it("avrasya server should not NODE_ENV", () => {
        process.env.NODE_ENV = "production";

        const avrasya = new Avrasya();
        avrasya.listen();

        expect(avrasya.env).not.toBe("development");

        avrasya.close();
    })
});
