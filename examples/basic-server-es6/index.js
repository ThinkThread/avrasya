import avrasya from "avrasya";

const server = new avrasya.default();

server.router.get("/", (ctx) => {
    ctx.send("Wellcome to my real world");
});

server.use((ctx) => {
    console.log("middleware");
    console.log(ctx.req.url + " " + ctx.req.method);
})

server.listen(1923);